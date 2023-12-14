import useSWR from "swr";
import axios, { AxiosRequestConfig } from "axios";
import { ApiResponse, Evaluation } from "../types";
import { useAuth } from "./useAuth"; // Adjust the import based on your actual path

const API_BASE_URL = `${import.meta.env.VITE_API}${
  import.meta.env.VITE_EVALUACIONES
}`;

interface FetcherOptions extends AxiosRequestConfig {
  token: string;
  // You can add any additional options you need
}

const fetcher = async (url: string, { token, ...options }: FetcherOptions) => {
  try {
    const response = await axios.get<ApiResponse<Evaluation[]>>(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.msg);
    }
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const useEvaluations = () => {
  const { token } = useAuth(); // Assuming useAuth returns the user token

  // Adjust the URL based on your actual structure

  const {
    data: evaluations,
    error,
    mutate,
    isLoading,
  } = useSWR(
    API_BASE_URL,
    (url: string) => fetcher(url, { token: token as string }) // Pass user token as a parameter
  );

  const createEvaluation = async (newEvaluation: Partial<Evaluation>) => {
    try {
      const response = await axios.post<ApiResponse<Evaluation>>(
        API_BASE_URL,
        newEvaluation,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        // Handle success as needed
        mutate(); // Trigger a re-fetch of the evaluations data
        return response.data.data;
      }

      throw new Error("Failed to create evaluation");
    } catch (error) {
      throw new Error("Failed to create evaluation");
    }
  };

  const editEvaluation = async (
    updatedEvaluation: Partial<Evaluation>,
    id: string
  ) => {
    try {
      const response = await axios.put<ApiResponse<Evaluation>>(
        `${API_BASE_URL}/${id}`,
        updatedEvaluation,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        // Handle success as needed
        mutate(); // Trigger a re-fetch of the evaluations data
      }

      throw new Error("Failed to update evaluation");
    } catch (error) {
      throw new Error("Failed to update evaluation");
    }
  };

  return {
    evaluations: evaluations || [],
    isLoading: isLoading && !evaluations && !error,
    isError: !!error,
    error,
    createEvaluation,
    editEvaluation,
  };
};
