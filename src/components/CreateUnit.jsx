import { useState } from "react";
import { supabase } from "../supabase";

export default function CreateUnit({ semester, subject, category, onSuccess }) {
  const [unitName, setUnitName] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    if (!unitName || !pdfFile) {
      alert("Unit name and PDF are required");
      return;
    }

    setLoading(true);

    try {
      const fileName = `${Date.now()}-${pdfFile.name}`;

      // Upload PDF
      const { error: uploadError } = await supabase.storage
        .from("pdfs")
        .upload(fileName, pdfFile);

      if (uploadError) {
        console.error("Upload error:", uploadError);
        alert(uploadError.message);
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
        const imageName = `${Date.now()}-${imageFile.name}`;

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
        },
      ]);

      if (insertError) {
        console.error("Insert error:", insertError);
        alert("Database insert failed");
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

  return (
    <div className="glass" style={{ padding: "30px", marginBottom: "40px" }}>
      <h3 style={{ marginBottom: "20px" }}>Create New Unit</h3>

      <div style={{ marginBottom: "15px" }}>
        <label>Unit Name</label>
        <input
          type="text"
          placeholder="Enter Unit Name"
          value={unitName}
          onChange={(e) => setUnitName(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Upload PDF (Required)</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdfFile(e.target.files[0])}
          style={{ marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Upload Image (Optional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          style={{ marginTop: "5px" }}
        />
      </div>

      <button
        className="btn-primary"
        onClick={handlePublish}
        disabled={loading}
      >
        {loading ? "Publishing..." : "Publish Unit"}
      </button>
    </div>
  );
}
