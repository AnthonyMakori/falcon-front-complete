import { useEffect, useState } from "react";
import Uppy, { UppyFile } from "@uppy/core";
import { Dashboard } from "@uppy/react";
import XHRUpload from "@uppy/xhr-upload";
import { v4 as uuidv4 } from "uuid";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";


interface MovieUploaderProps {
  onClose: () => void;
}

export default function MovieUploader({ onClose }: MovieUploaderProps) {
  const [uploadId] = useState(uuidv4());
  const [originalName, setOriginalName] = useState("");
  const [videoPath, setVideoPath] = useState("");
  const [uploadComplete, setUploadComplete] = useState(false);

  // Metadata
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("KES");
  const [category, setCategory] = useState("");
  const [dateReleased, setDateReleased] = useState("");
  const [poster, setPoster] = useState<File | null>(null);

  const [uppyInstance, setUppyInstance] = useState<Uppy | null>(null);

  useEffect(() => {
    const uppy = new Uppy({
      restrictions: {
        maxNumberOfFiles: 1,
        allowedFileTypes: ['video/*']
      },
      autoProceed: true
    });
    setUppyInstance(uppy);

    interface Chunk {
        offset: number;
        size: number;
        data: Blob;
    }

    interface RequestData {
        uploadId: string;
        chunkIndex: number;
        originalName: string;
        chunk: Chunk;
    }

    uppy.use(XHRUpload, {
        endpoint: "/api/upload-chunk",
        method: "post",
        fieldName: "chunk",
        bundle: false,
        formData: true,
        headers: {
            'upload-id': uploadId,
        },
    });

    uppy.on("complete", async (result) => {
      const name = result.successful && result.successful.length > 0 ? result.successful[0].name : "";
      setOriginalName(name ?? "");

      if (name) {
        const response = await fetch("/api/assemble-chunks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uploadId, originalName: name }),
        });

        const data = await response.json();
        setVideoPath(data.file_path);
        setUploadComplete(true);
      }
    });

    return () => uppy.destroy();
  }, []);

  const handleSaveMovie = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("currency", currency);
    formData.append("category", category);
    formData.append("date_released", dateReleased);
    if (poster) {
      formData.append("poster", poster);
    }
    formData.append("video_path", videoPath);

    const res = await fetch("/api/save-movie", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert("Movie saved!");
    console.log("Saved movie:", data);
    onClose();
  };

  return (
    <div>
      {!uploadComplete ? (
        uppyInstance && (
          <Dashboard uppy={uppyInstance} note="Select movie file (max ~10GB)" height={300} />
        )
      ) : (
        <div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              placeholder="Movie Title"
              className="border p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-2"
            >
              <option value="">Select Category</option>
              <option value="Action">Action</option>
              <option value="Drama">Drama</option>
              <option value="Comedy">Comedy</option>
              {/* Add more as needed */}
            </select>

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-2 border p-2"
            ></textarea>

            <input
              type="number"
              placeholder="Price"
              className="border p-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="border p-2"
            >
              <option value="KES">KES</option>
              <option value="USD">USD</option>
            </select>

            <input
              type="date"
              className="border p-2"
              value={dateReleased}
              onChange={(e) => setDateReleased(e.target.value)}
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setPoster(e.target.files[0]);
                } else {
                  setPoster(null);
                }
              }}
              className="border p-2"
            />
          </div>

          <button
            onClick={handleSaveMovie}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Movie
          </button>
        </div>
      )}
    </div>
  );
}
