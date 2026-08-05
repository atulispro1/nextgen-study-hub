import { useMemo, useRef, useState } from "react";
import { supabase } from "../supabase";
import Swal from "sweetalert2";
import {
  buildSafeFileName,
  validateUploadFile,
} from "../utils/security";

export default function CreateUnit({
  semester,
  subject,
  category,
  onSuccess,
  title = "Create New Unit",
  typeLabel = "Type of Notes",
  noteTypeOptions,
  unitLabel = "Unit Name",
  unitPlaceholder = "Enter Unit Name",
  pdfLabel = "Upload PDF (Required)",
  imageLabel = "Upload Image (Optional)",
  submitLabel = "Publish Unit",
}) {
  const [unitName, setUnitName] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noteType, setNoteType] = useState("teacher");
  const MAX_PDF_SIZE = 20 * 1024 * 1024; // 20MB
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

  // Refs to the file inputs so their DOM value can be cleared after a
  // successful upload — otherwise selecting the same file again fires no
  // change event and the form cannot be reused without a page refresh.
  const pdfInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const resolvedNoteTypeOptions = useMemo(
    () =>
      noteTypeOptions || [
        { value: "teacher", label: "Teacher Notes" },
        { value: "extra", label: "Extra Notes" },
      ],
    [noteTypeOptions],
  );

  const handlePublish = async () => {
    // Guard against double-clicks while a publish is already in progress.
    if (loading) return;

    if (!unitName || !pdfFile) {
      Swal.fire({
        icon: "warning",
        title: "Missing details",
        text: "Unit name and PDF are required.",
      });
      return;
    }

    // Lock the button before the duplicate check so two rapid clicks cannot
    // both pass the check and create duplicate rows.
    setLoading(true);

    // Check if unit name already exists
    const { data: existingUnit, error: checkError } = await supabase
      .from("materials")
      .select("id")
      .eq("semester", semester)
      .eq("subject", subject)
      .eq("category", category)
      .eq("unit_name", unitName)
      .maybeSingle();

    if (checkError) {
      Swal.fire({
        icon: "error",
        title: "Check failed",
        text: checkError.message,
      });
      setLoading(false);
      return;
    }

    if (existingUnit) {
      Swal.fire({
        icon: "warning",
        title: "Unit Already Exists",
        text: "A unit with this name already exists for this subject. Please choose a different unit name.",
      });
      setLoading(false);
      return;
    }
    const pdfCheck = validateUploadFile(pdfFile, "pdf", MAX_PDF_SIZE);
    if (!pdfCheck.ok) {
      const message =
        pdfCheck.reason === "file-too-large"
          ? "This PDF is larger than the allowed upload limit. Please compress the file using an online PDF compressor and upload it again."
          : "Please upload a valid PDF document (.pdf, max 20MB).";
      Swal.fire({
        icon: "warning",
        title:
          pdfCheck.reason === "file-too-large" ? "File too large" : "Invalid PDF file",
        text: message,
      });
      setLoading(false);
      return;
    }

    const imageCheck = imageFile
      ? validateUploadFile(imageFile, "image", MAX_IMAGE_SIZE)
      : { ok: true };
    if (!imageCheck.ok) {
      const message =
        imageCheck.reason === "file-too-large"
          ? "The selected image is too large (max 5MB). Please compress the image and try again."
          : "Please upload a valid image file (.jpg, .png, .webp or .gif).";
      Swal.fire({
        icon: "warning",
        title:
          imageCheck.reason === "file-too-large" ? "Image too large" : "Invalid image file",
        text: message,
      });
      setLoading(false);
      return;
    }

    try {
      const fileName = buildSafeFileName(pdfFile, "pdf");

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

      let imageUrl = null;

      if (imageFile) {
        const imageName = buildSafeFileName(imageFile, "image");

        // Cover images live in the dedicated "notes-images" bucket (PDFs stay
        // in "pdfs"). See SUPABASE_NOTES_IMAGES_SETUP.sql at the repo root
        // for the bucket + storage policies needed on the Supabase side.
        const { error: imageError } = await supabase.storage
          .from("notes-images")
          .upload(imageName, imageFile);

        if (!imageError) {
          const { data: imagePublic } = supabase.storage
            .from("notes-images")
            .getPublicUrl(imageName);

          imageUrl = imagePublic.publicUrl;
        } else {
          // The unit still publishes with its PDF — only the cover is lost.
          console.error("Cover image upload failed:", imageError);
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
          Swal.fire({
            icon: "error",
            title: "Insert failed",
            text: "Database insert failed. Please try again.",
          });
        }
        setLoading(false);
        return;
      }

      setUnitName("");
      setPdfFile(null);
      setImageFile(null);

      // Clear the file input DOM values so the same file can be selected and
      // uploaded again without refreshing the page.
      if (pdfInputRef.current) {
        pdfInputRef.current.value = "";
      }
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }

      onSuccess();
    } catch (err) {
      console.error("Unexpected error:", err);
    }

    setLoading(false);
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
        {title}
        </h2>

      {/* NOTE TYPE */}

      <div style={{ marginBottom: "20px" }}>
        <label
          style={{ fontWeight: "600", display: "block", marginBottom: "6px" }}
        >
          {typeLabel}
        </label>

        <select
          value={noteType}
          onChange={(e) => setNoteType(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          {resolvedNoteTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* UNIT NAME */}

      <div style={{ marginBottom: "20px" }}>
        <label
          style={{ fontWeight: "600", display: "block", marginBottom: "6px" }}
        >
          {unitLabel}
        </label>

        <input
          type="text"
          placeholder={unitPlaceholder}
          value={unitName}
          onChange={(e) => setUnitName(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
          }}
        />
      </div>

      {/* PDF UPLOAD */}

      <div style={{ marginBottom: "20px" }}>
        <label
          style={{ fontWeight: "600", display: "block", marginBottom: "6px" }}
        >
          {pdfLabel}
        </label>

        <input
          ref={pdfInputRef}
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
          {imageLabel}
        </label>

        <input
          ref={imageInputRef}
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
        {loading ? "Publishing..." : submitLabel}
      </button>
    </div>
  );
}
