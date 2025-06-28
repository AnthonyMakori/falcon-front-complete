import React, { useEffect, useState } from "react";
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import { Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import axios from "axios";

const MovieUploader = () => {
  const [formData, setFormData] = useState<{
    title: string;
    category: string;
    description: string;
    price: string;
    currency: string;
    dateReleased: string;
    poster: File | null;
  }>({
    title: "",
    category: "",
    description: "",
    price: "",
    currency: "USD",
    dateReleased: "",
    poster: null
  });

  const [uuid, setUuid] = useState(() => crypto.randomUUID());
  const [originalName, setOriginalName] = useState("");
  const [totalChunks, setTotalChunks] = useState(0);

  const uppy = new Uppy({
    restrictions: { maxNumberOfFiles: 1, allowedFileTypes: ['video/*'] },
    autoProceed: true
  });

  useEffect(() => {
    uppy.use(XHRUpload, {
      endpoint: "/api/upload-chunk",
      method: "post",
      fieldName: "chunk",
      headers: (file) => ({
        'X-Upload-Id': uuid,
        'X-Chunk-Number': String(file.meta.chunkIndex ?? 0)
      }),
    });

    uppy.on('file-added', (file) => {
      const chunkSize = 50 * 1024 * 1024;
      const size = file.size ?? 0;
      const chunks = Math.ceil(size / chunkSize);
      setTotalChunks(chunks);
      setOriginalName(file.name ?? "");
    });

    return () => uppy.destroy();
  }, []);

interface MovieFormData {
    title: string;
    category: string;
    description: string;
    price: string;
    currency: string;
    dateReleased: string;
    poster: File | null;
}

interface FormChangeEvent extends React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {}

const handleFormChange = (e: FormChangeEvent) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData((prev: MovieFormData) => ({
        ...prev,
        [name]: files ? files[0] : value
    }));
};

  const handleSubmit = async () => {
    const payload = new FormData();
    payload.append("uuid", uuid);
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    payload.append("price", formData.price);
    payload.append("category", formData.category);
    payload.append("currency", formData.currency);
    payload.append("date_released", formData.dateReleased);
    if (formData.poster) {
      payload.append("poster", formData.poster);
    }
    payload.append("total_chunks", totalChunks.toString());
    payload.append("original_name", originalName);

    const res = await axios.post("/api/finalize-upload", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Upload Complete");
    console.log(res.data);
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload Movie</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input type="text" name="title" placeholder="Title" onChange={handleFormChange} className="border p-2" />
        <input type="text" name="category" placeholder="Category" onChange={handleFormChange} className="border p-2" />
        <textarea name="description" placeholder="Description" onChange={handleFormChange} className="col-span-2 border p-2" />
        <input type="number" name="price" placeholder="Price" onChange={handleFormChange} className="border p-2" />
        <select name="currency" onChange={handleFormChange} className="border p-2">
          <option value="USD">USD</option>
          <option value="KES">KES</option>
        </select>
        <input type="date" name="dateReleased" onChange={handleFormChange} className="border p-2" />
        <input type="file" name="poster" onChange={handleFormChange} className="col-span-2 border p-2" />
      </div>

      <Dashboard uppy={uppy} proudlyDisplayPoweredByUppy={false} />
      
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleSubmit}
      >
        Finalize Upload
      </button>
    </div>
  );
};

export default MovieUploader;
