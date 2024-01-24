import useSWR from "swr";
import axios, { AxiosRequestConfig } from "axios";
import { ApiResponse, Profesor, ProfesorTable } from "../types";
import { useAuth } from "./useAuth"; // Adjust the import based on your actual path

const API_BASE_URL = import.meta.env.VITE_API;

interface FetcherOptions extends AxiosRequestConfig {
  token: string;
  // You can add any additional options you need
}

const fetcher = async (url: string, { token, ...options }: FetcherOptions) => {
  try {
    const response = await axios.get<ApiResponse<ProfesorTable>>(url, {
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
    console.log(error);

    throw new Error("Failed to fetch data");
  }
};

export const useProfessors = () => {
  const { token } = useAuth(); // Assuming useAuth returns the token

  const professorsUrl = `${API_BASE_URL}${import.meta.env.VITE_PROFESORES}`;

  const {
    data: professors,
    error,
    mutate,
  } = useSWR(
    professorsUrl,
    (url: string) => fetcher(url, { token: token as string }) // Pass token as a parameter
  );

  const createProfessor = async (
    newProfessor: Omit<
      Profesor,
      "ancient" | "id" | "user_id" | "age" | "academic_rank"
    > & {
      academic_rank: string;
    }
  ) => {
    try {
      const response = await axios.post<ApiResponse<Profesor>>(
        professorsUrl,
        newProfessor,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      mutate();
      return response.data;
    } catch (error) {
      throw new Error("Failed to create professor");
    }
  };

  const updateProfessor = async (
    id: string,
    updatedProfessor: Omit<
      Profesor,
      "id" | "ancient" | "age" | "academic_rank"
    > & {
      academic_rank: string;
    }
  ) => {
    try {
      const response = await axios.put<ApiResponse<Profesor>>(
        `${professorsUrl}/${id}`,
        updatedProfessor,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      mutate(); // Trigger a re-fetch of the professors data
      return response.data;
    } catch (error) {
      throw new Error("Failed to update professor");
    }
  };

  const deleteProfessor = async (id: string) => {
    try {
      const response = await axios.delete<ApiResponse<null>>(
        `${professorsUrl}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      mutate(); // Trigger a re-fetch of the professors data
      return response.data;
    } catch (error) {
      throw new Error("Failed to delete professor");
    }
  };

  const getProfessorById = (id: string) => {
    const professor = professors?.find((prof) => prof.id === id);
    return professor || null;
  };

  return {
    professors: professors || [],
    isLoading: !professors && !error,
    isError: !!error,
    error,
    createProfessor,
    updateProfessor,
    deleteProfessor,
    getProfessorById,
  };
};
