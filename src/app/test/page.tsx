"use client";
import { ExtractUserDataFrom } from "@/utils/ExtractUserData";

import { uploadImageToExaDrive } from "@/utils/UploadImageToExadrive";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

const FileUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    // uploadJSONToExaDrive({testkey1: "value1", testkey2: "value2"}, "/userData/walletAddress")
    // getHacker("0x5718447834fb632f3da178c086796d6e310c13274bdc726a6f87b2deef7d8a80");
    // GenerateDevScore({ "personalInfo": { "fullName": "Agul", "email": "atul@gmail.com", "phone": "+918958318394", "profilePicture": "https://hackerone.exadrivecdn.com/profilePhoto/walletAddress/0x298e51b0b1e15e9d8ed37f5d6d27fa8a2a1286bd786a9b6d7941031225757061/Hackerone.png" }, "professionalDetails": { "githubProfile": "https://github.com/atulbhatt-system32", "twitterHandle": "", "telegramUsername": "", "personalWebsite": "" }, "skills": { "primarySkills": "react", "yearsOfExperience": 0, "learningGoals": "" }, "preferences": { "preferredRole": "fe", "availability": "Yes", "preferredWorkStyle": "Small Team" } })
    ExtractUserDataFrom(
      "https://hackerone.exadrivecdn.com/userData/walletAddress/0x298e51b0b1e15e9d8ed37f5d6d27fa8a2a1286bd786a9b6d7941031225757061/data.json",
    );
  }, []);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      await uploadImageToExaDrive(selectedFile, "12");
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
