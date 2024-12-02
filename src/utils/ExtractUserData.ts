import axios from "axios";

export const ExtractUserDataFrom = async (jsonURL: string) => {
  try {
    // Validate the URL
    if (!jsonURL) {
      throw new Error("Invalid URL provided.");
    }

    // Fetch the JSON data from the URL
    const response = await axios.get(jsonURL);

    // Ensure a valid response was received
    if (response.status !== 200 || !response.data) {
      throw new Error(`Failed to fetch data. Status code: ${response.status}`);
    }

    // Extract the JSON data
    const jsonData = response.data;
    console.log("json Data", jsonData);
    // Return the JSON object
    return jsonData;
  } catch (error) {
    console.error("Error fetching or processing JSON data:", error);
    throw error;
  }
};
