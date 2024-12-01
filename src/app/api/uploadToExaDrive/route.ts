import { NextRequest, NextResponse } from "next/server";
import { ExaDrive } from "exadrive-sdk";
import crypto from "crypto";

const exaDrive = new ExaDrive(process.env.EXADRIVE_APP_ID!, process.env.EXADRIVE_API_KEY!);

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file = data.get("file") as File;
  const virtualDirectoryPath = data.get("virtualDirectoryPath") as string;

  try {
    if (!file || !virtualDirectoryPath) {
      return NextResponse.json({ message: "No file or directory path provided" }, { status: 400 });
    }

    // Convert file to a buffer
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    // Generate SHA-256 hash of the file
    const fileHash = crypto.createHash("sha256").update(fileBuffer).digest("hex");

    console.log("File Hash:", fileHash);

    // Extract file details
    const originalFileName = file.name;
    const mimeType = file.type;

    // Upload the file using ExaDrive
    const uploadResponse = await exaDrive.uploadFileWithBuffer(
      fileBuffer,
      originalFileName,
      mimeType,
      virtualDirectoryPath
    );

    const trxData = uploadResponse.data;
    console.log("Upload Response:", trxData);

    return NextResponse.json({
      message: "File uploaded successfully",
      fileHash,
      trxData,
    });
  } catch (error: any) {
    console.error("Error uploading file to ExaDrive:", error);
    return NextResponse.json({ error: "Failed to upload file to ExaDrive", details: error.message }, { status: 500 });
  }
}
