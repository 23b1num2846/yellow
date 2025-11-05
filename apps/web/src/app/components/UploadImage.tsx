"use client";
import Image from "next/image";
import { useState } from "react";

export default function UploadImage() {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    const res = await fetch("http://localhost:5050/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setUrl(data.url);
    setLoading(false);
  }

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Upload to S3</h2>
      <input type="file" onChange={handleUpload} />
      {loading && <p>Uploading...</p>}
      {url && (
        <div className="mt-4">
          <p className="text-sm text-gray-500">Uploaded:</p>
          <Image src={url} alt="Uploaded" className="h-40 rounded-lg mt-2" />
        </div>
      )}
    </div>
  );
}
