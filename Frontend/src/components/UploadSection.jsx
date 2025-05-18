import React, { useState } from "react";

const UploadSection = ({ onInputChange, onModeChange }) => {
  const [mode, setMode] = useState("file");
  const [file, setFile] = useState(null);

  function handleModeChange(newMode) {
    setMode(newMode);
    onModeChange(newMode);
    onInputChange(null); // Reset input when mode changes
  }
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex gap-4">
        <button
          className={`px-4 py-2 rounded cursor-pointer ${
            mode === "file"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => handleModeChange("file")}
        >
          File
        </button>
        <button
          className={`px-4 py-2 rounded cursor-pointer ${
            mode === "link"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => handleModeChange("link")}
        >
          Link
        </button>
      </div>

      {mode === "file" ? (
        <input
          type="file"
          onChange={(e) => onInputChange(e.target.files[0])}
          className="border p-2 rounded"
        />
      ) : (
        <input
          type="text"
          placeholder="Enter a URL..."
          onChange={(e) => onInputChange(e.target.value)}
          className="border p-2 rounded w-full text-gray-200"
        />
      )}
      {mode === "file" && file && (
        <div className="text-sm text-gray-600 mt-2">
          Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
        </div>
      )}
    </div>
  );
};

export default UploadSection;
