import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export const runScan = async (
  target,
  scanType = "quick"
) => {
  try {

    const response = await axios.get(
      `${API_BASE_URL}/scan/run`,
      {
        params: {
          target,
          scan_type: scanType
        }
      }
    );

    return response.data;

  } catch (error) {

    console.error(
      "Scan failed:",
      error
    );

    throw error;
  }
};