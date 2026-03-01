import { useState } from "react";
import { supabase } from "../supabase";

export default function AdminUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    const filePath = `pdfs/${Date.now()}-${file.name}`;

    // Upload to Storage
    const { error: uploadError } = await supabase.storage
      .from("pdfs")
      .upload(filePath, file);

    if (uploadError) {
      alert("Upload failed");
      setLoading(false);
      return;
    }

    // Get public URL
    const { data } = supabase.storage
      .from("pdfs")
      .getPublicUrl(filePath);

    // Save to database
    await supabase.from("materials").insert([
      {
        semester: "1",
        subject: "Applied Chemistry",
        category: "Notes",
        title: file.name,
        file_url: data.publicUrl,
      },
    ]);

    alert("Uploaded Successfully 🚀");
    setLoading(false);
  };

  return (
    <div className="glass" style={{ padding: "30px", marginBottom: "40px" }}>
      <h3>Admin Upload PDF</h3>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        className="btn-primary"
        onClick={handleUpload}
        disabled={loading}
        style={{ marginTop: "15px" }}
      >
        {loading ? "Uploading..." : "Upload PDF"}
      </button>
    </div>
  );
}