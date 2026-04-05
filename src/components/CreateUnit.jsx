import { useState } from "react";
import { supabase } from "../supabase";
import Swal from "sweetalert2";
import imageCompression from "browser-image-compression";
import { sanitizeFileName } from "../utils/security";

export default function CreateUnit({ semester, subject, category, onSuccess }) {
  const [unitName, setUnitName] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noteType, setNoteType] = useState("teacher");
  const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

  const handlePublish = async () => {
    if (!unitName || !pdfFile) {
      alert("Unit name and PDF are required");
      return;
    }
    // Check if unit name already exists
    const { data: existingUnit } = await supabase
      .from("materials")
      .select("id")
      .eq("semester", semester)
      .eq("subject", subject)
      .eq("category", category)
      .eq("unit_name", unitName)
      .single();

    if (existingUnit) {
      Swal.fire({
        icon: "warning",
        title: "Unit Already Exists",
        text: "A unit with this name already exists for this subject. Please choose a different unit name.",
      });
      return;
    }
    if (pdfFile && pdfFile.size > MAX_FILE_SIZE) {
      Swal.fire({
        icon: "warning",
        title: "File too large",
        text: "This PDF is larger than the allowed upload limit. Please compress the file using an online PDF compressor and upload it again.",
      });
      return;
    }
    if (pdfFile && pdfFile.type !== "application/pdf") {
      Swal.fire({
        icon: "warning",
        title: "Invalid PDF file",
        text: "Please upload a valid PDF document.",
      });
      return;
    }
    if (imageFile && imageFile.size > MAX_FILE_SIZE) {
      Swal.fire({
        icon: "warning",
        title: "Image too large",
        text: "The selected image is too large. Please compress the image and try again.",
      });
      return;
    }
    if (imageFile && !imageFile.type.startsWith("image/")) {
      Swal.fire({
        icon: "warning",
        title: "Invalid image file",
        text: "Please upload a valid image file.",
      });
      return;
    }

    setLoading(true);

    try {
      const fileName = `${Date.now()}-${sanitizeFileName(pdfFile.name)}`;

      // Upload PDF
      const { error: uploadError } = await supabase.storage
        .from("pdfs")
        .upload(fileName, pdfFile);

      if (uploadError) {
        console.error("Upload error:", uploadError);

        if (uploadError.message?.toLowerCase().includes("row-level security")) {
          Swal.fire({
            icon: "error",
            title: "Upload blocked by permissions",
            text: "Your account is missing the required Supabase profiles role or storage policy access.",
          });
        } else if (uploadError.message?.toLowerCase().includes("too large")) {
          Swal.fire({
            icon: "warning",
            title: "File size limit exceeded",
            text: "The file is too large for upload. Please compress the file using an online compression tool and upload it again.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Upload failed",
            text: uploadError.message,
          });
        }

        setLoading(false);
        return;
      }

      // Get Public URL
      const { data: publicUrlData } = supabase.storage
        .from("pdfs")
        .getPublicUrl(fileName);

      const fileUrl = publicUrlData.publicUrl;

      console.log("Generated URL:", fileUrl);

      let imageUrl = null;

      if (imageFile) {
        const imageName = `${Date.now()}-${sanitizeFileName(imageFile.name)}`;

        const { error: imageError } = await supabase.storage
          .from("pdfs")
          .upload(imageName, imageFile);

        if (!imageError) {
          const { data: imagePublic } = supabase.storage
            .from("pdfs")
            .getPublicUrl(imageName);

          imageUrl = imagePublic.publicUrl;
        }
      }

      // Insert into DB
      const { error: insertError } = await supabase.from("materials").insert([
        {
          semester,
          subject,
          category,
          unit_name: unitName,
          file_url: fileUrl,
          image_url: imageUrl,
          note_type: noteType,
        },
      ]);

      if (insertError) {
        console.error("Insert error:", insertError);
        if (insertError.message?.toLowerCase().includes("row-level security")) {
          Swal.fire({
            icon: "error",
            title: "Publish blocked by permissions",
            text: "Your account is logged in, but the database role or RLS policy is not allowing this action.",
          });
        } else {
          alert("Database insert failed");
        }
        setLoading(false);
        return;
      }

      setUnitName("");
      setPdfFile(null);
      setImageFile(null);
      onSuccess();
    } catch (err) {
      console.error("Unexpected error:", err);
    }

    setLoading(false);
  };
  const handleImageUpload = async (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1200,
      useWebWorker: true,
      fileType: "image/webp",
    };

    const compressedFile = await imageCompression(file, options);

    return compressedFile;
  };

  const uploadImage = async (file) => {

  const webpFile = await handleImageUpload(file);

  const fileName = `${Date.now()}.webp`;

  const { data, error } = await supabase.storage
    .from("notes-images")
    .upload(fileName, webpFile);

};

  return (
    <div
      className="glass"
      style={{
        padding: "35px",
        marginBottom: "40px",
        maxWidth: "600px",
        marginInline: "auto",
        borderRadius: "16px",
      }}
    >
      {/* HEADER */}

      <h2
        style={{
          marginBottom: "25px",
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        Create New Unit
      </h2>

      {/* NOTE TYPE */}

      <div style={{ marginBottom: "20px" }}>
        <label
          style={{ fontWeight: "600", display: "block", marginBottom: "6px" }}
        >
          Type of Notes
        </label>

        <select
          value={noteType}
          onChange={(e) => setNoteType(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "transparent",
          }}
        >
          <option value="teacher">Teacher Notes</option>
          <option value="extra">Extra Notes</option>
        </select>
      </div>

      {/* UNIT NAME */}

      <div style={{ marginBottom: "20px" }}>
        <label
          style={{ fontWeight: "600", display: "block", marginBottom: "6px" }}
        >
          Unit Name
        </label>

        <input
          type="text"
          placeholder="Enter Unit Name"
          value={unitName}
          onChange={(e) => setUnitName(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "transparent",
          }}
        />
      </div>

      {/* PDF UPLOAD */}

      <div style={{ marginBottom: "20px" }}>
        <label
          style={{ fontWeight: "600", display: "block", marginBottom: "6px" }}
        >
          Upload PDF (Required)
        </label>

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdfFile(e.target.files[0])}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "6px",
          }}
        />

        <p style={{ fontSize: "12px", opacity: 0.7, marginTop: "4px" }}>
          Maximum file size: 20MB
        </p>
      </div>

      {/* IMAGE UPLOAD */}

      <div style={{ marginBottom: "25px" }}>
        <label
          style={{ fontWeight: "600", display: "block", marginBottom: "6px" }}
        >
          Upload Image (Optional)
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "6px",
          }}
        />
      </div>

      {/* BUTTON */}

      <button
        className="btn-primary"
        onClick={handlePublish}
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px",
          fontWeight: "600",
          fontSize: "15px",
        }}
      >
        {loading ? "Publishing..." : "Publish Unit"}
      </button>
    </div>
  );
}
