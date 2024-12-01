import axios from "axios";

export async function uploadImageToExaDrive(file: File, virtualDirectoryPath: string): Promise<any> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("virtualDirectoryPath", virtualDirectoryPath);

    const response = await axios.post("/api/uploadToExaDrive", formData);
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}
