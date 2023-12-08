import { CourtData, Courts } from "./../types.d";
import useSWR from "swr";
import axios, { AxiosRequestConfig } from "axios";
import { ApiResponse, Court } from "../types";
import { useAuth } from "./useAuth"; // Adjust the import based on your actual path
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API;

interface FetcherOptions extends AxiosRequestConfig {
  token: string;
  // You can add any additional options you need
}

const fetcher = async (url: string, { token, ...options }: FetcherOptions) => {
  try {
    const response = await axios.get<ApiResponse<Courts>>(url, {
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

export const useCourts = () => {
  const { token } = useAuth(); // Assuming useAuth returns the token

  const courtsUrl = `${API_BASE_URL}${import.meta.env.VITE_COURT}`; // Adjust the URL based on your actual structure

  const {
    data: courts,
    error,
    mutate,
    isLoading,
  } = useSWR(
    courtsUrl,
    (url: string) => fetcher(url, { token: token as string }) // Pass token as a parameter
  );

  const createCourt = async (newCourt: CourtData) => {
    try {
      const response = await axios.post<ApiResponse<Court>>(
        courtsUrl,
        newCourt,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Tribunal creado exitosamente");
        mutate(); // Trigger a re-fetch of the courts data

        return;
      }

      throw new Error("Failed to create court");
    } catch (error) {
      throw new Error("Failed to create court");
    }
  };

  const updateCourt = async (id: string, updatedCourt: Omit<Court, "id">) => {
    try {
      const response = await axios.put<ApiResponse<Court>>(
        `${courtsUrl}/${id}`,
        updatedCourt,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      mutate(); // Trigger a re-fetch of the courts data
      return response.data;
    } catch (error) {
      throw new Error("Failed to update court");
    }
  };

  const deleteCourt = async (id: string) => {
    try {
      const response = await axios.delete<ApiResponse<null>>(
        `${courtsUrl}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      mutate(); // Trigger a re-fetch of the courts data
      return response.data;
    } catch (error) {
      throw new Error("Failed to delete court");
    }
  };

  const getCourtById = (id: string) => {
    const court = courts?.find((c) => c.id === id);
    return court || null;
  };

  return {
    courts: courts || [],
    isLoading: isLoading && !courts && !error,
    isError: !!error,
    error,
    createCourt,
    updateCourt,
    deleteCourt,
    getCourtById,
  };
};
