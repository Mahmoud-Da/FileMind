import { useState, useRef, type ChangeEvent } from "react";
import axios from "axios";
import { Upload, FileText, CheckCircle, Loader2 } from "lucide-react";

type FileUploaderProps = {
  conversationId: string;
  onUploadComplete: () => void;
};

const FileUploader = ({
  conversationId,
  onUploadComplete,
}: FileUploaderProps) => {
  const [status, setStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [fileName, setFileName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setStatus("uploading");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("conversationId", conversationId);

    try {
      await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus("success");
      onUploadComplete();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="mb-6 p-4 rounded-2xl border border-gray-200 bg-white/50 backdrop-blur-sm shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-full ${status === "success" ? "bg-green-100 text-green-600" : "bg-blue-50 text-blue-600"}`}
          >
            {status === "uploading" ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : status === "success" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <FileText className="w-5 h-5" />
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              Knowledge Base
            </h3>
            <p className="text-xs text-gray-500">
              {status === "success"
                ? `Active: ${fileName}`
                : "Upload a .txt file to give the AI context"}
            </p>
          </div>
        </div>

        <button
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
        >
          <Upload className="w-3 h-3" />
          {status === "success" ? "Change File" : "Upload File"}
        </button>

        <input
          type="file"
          accept=".txt"
          ref={inputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default FileUploader;
