import axios, { AxiosRequestConfig } from "axios";
import { ApiResponse, Defense } from "../types";
// import { ApiResponse } from "../types";

const API_BASE_URL = `${import.meta.env.VITE_API}${
  import.meta.env.VITE_DEFENSE
}`;
const createDefense = async (
  defenseData: FormData,
  options: AxiosRequestConfig
) => {
  try {
    const response = await axios.post<ApiResponse<boolean>>(
      `${API_BASE_URL}/`,
      defenseData,
      {
        ...options,
      }
    );

    if (response.data.success) {
      // Optionally, you can return additional data from the response if needed
      return true;
    } else {
      throw new Error(response.data.msg || "Failed to create defense");
    }
  } catch (error) {
    console.error("Error creating defense:", error);
    throw new Error("Failed to create defense");
  }
};
const searchDefenses = async (
  searchTerm: string,
  options: AxiosRequestConfig
) => {
  try {
    const response = await axios.get<ApiResponse<Defense[]>>(
      `${API_BASE_URL}/search?query=${searchTerm}`,
      {
        ...options,
      }
    );

    if (response.data.success) {
      // Optionally, you can return additional data from the response if needed
      return response.data.data;
    } else {
      throw new Error(response.data.msg || "Failed to search defenses");
    }
  } catch (error) {
    console.error("Error searching defenses:", error);
    throw new Error("Failed to search defenses");
  }
};
const DefenseService = {
  createDefense,
  searchDefenses,
};

export default DefenseService;
