import { AcademicRank } from "./../types.d";
// useAcademicRank.js

import useSWR from "swr";
import axios, { AxiosRequestConfig } from "axios";
import { useAuth } from "./useAuth";
import { ApiResponse } from "../types";

const API_BASE_URL = import.meta.env.VITE_API;

interface FetcherOptions extends AxiosRequestConfig {
  token: string;
  // You can add any additional options you need
}

const fetcher = async (url: string, { token, ...options }: FetcherOptions) => {
  try {
    const response = await axios.get<ApiResponse<AcademicRank[]>>(url, {
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

const createAxiosInstanceWithAuth = (token: string) => {
  const instance = axios.create();

  instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return instance;
};

const useAcademicRank = () => {
  const { token } = useAuth();
  const aranksUrl = `${API_BASE_URL}/academic-ranks`;

  const axiosInstance = createAxiosInstanceWithAuth(token as string);

  const {
    data: academicRanks,
    error,
    mutate,
    isLoading,
  } = useSWR(
    aranksUrl,
    (url: string) => fetcher(url, { token: token as string }) // Pass token as a parameter
  );

  const createAcademicRank = async (rank: string) => {
    try {
      const response = await axiosInstance.post<ApiResponse<AcademicRank>>(
        aranksUrl,
        {
          rank,
        }
      );

      if (response.data.success) {
        mutate();
      }

      throw new Error("Error creating academic rank");
    } catch (error) {
      console.error("Error creating academic rank:", error);
      throw new Error("Error creating academic rank");
    }
  };

  //   const updateAcademicRank = async (id: string, rank) => {
  //     try {
  //       const response = await axiosInstance.put(
  //         `${API_URL}/academic-ranks/${id}`,
  //         { rank }
  //       );
  //       mutateAcademicRanks(); // Trigger revalidation
  //       return response.data;
  //     } catch (error) {
  //       console.error(
  //         "Error updating academic rank:",
  //         error.response?.data || error.message
  //       );
  //       throw new Error("Error updating academic rank");
  //     }
  //   };

  const deleteAcademicRank = async (id: string) => {
    try {
      const response = await axiosInstance.delete<ApiResponse<null>>(
        `${aranksUrl}/${id}`
      );
      if (response.data.success || !response.data) {
        mutate();
      }

      throw new Error("Error creating academic rank");
    } catch (error) {
      console.error("Error deleting academic rank:", error);
      throw new Error("Error deleting academic rank");
    }
  };

  return {
    academicRanks,
    createAcademicRank,
    deleteAcademicRank,
    error,
    isLoading,
    mutate,
  };
};

export default useAcademicRank;
