"use client"
import { uploadImageToExaDrive } from '@/utils/UploadImageToExadrive';
import React, { useState, ChangeEvent, FormEvent } from 'react';

const FileUploader: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            const resp = await uploadImageToExaDrive(selectedFile, "/test/12")
            console.log("Response in file uploader", resp)
        }
    };


    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (file) {
            console.log('File selected:', file.name);
        } else {
            console.log('No file selected');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                />
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
