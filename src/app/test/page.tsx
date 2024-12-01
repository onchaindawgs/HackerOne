"use client"
import { uploadImageToExaDrive } from '@/utils/UploadImageToExadrive';
import { uploadJSONToExaDrive } from '@/utils/UploadJSONToExadrive';
import { getHacker } from '@/view-functions/getHacker';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

const FileUploader: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        // uploadJSONToExaDrive({testkey1: "value1", testkey2: "value2"}, "/userData/walletAddress")
        getHacker("0x5718447834fb632f3da178c086796d6e310c13274bdc726a6f87b2deef7d8a80")
    },[])

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            const resp = await uploadImageToExaDrive(selectedFile, "/profilePhoto/walletaddress")
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
