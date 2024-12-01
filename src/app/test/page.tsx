"use client";

import { uploadImageToExaDrive } from "@/utils/UploadImageToExadrive";
import React, { useState, ChangeEvent, FormEvent } from "react";

const FileUploader: React.FC<{ userHashAddress: string }> = ({ userHashAddress }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      try {
        const response = await uploadImageToExaDrive(selectedFile, userHashAddress);
        console.log("Upload Response:", response);
      } catch (error) {
        console.error("Error during upload:", error);
      }
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (file) {
      console.log("File selected:", file.name);
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {file && (
        <div>
          <p>Selected File: {file.name}</p>
          <p>File Size: {(file.size / 1024).toFixed(2)} KB</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
