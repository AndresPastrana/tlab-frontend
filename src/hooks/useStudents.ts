import useSWR from "swr";
import axios, { AxiosError } from "axios";
import { Student, ApiResponse, ErrorResponse } from "../types";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = `${import.meta.env.VITE_API}${
  import.meta.env.VITE_STUDENTS
}`;
console.log(API_BASE_URL);

interface FetcherOptions {
  token: string;
  active: boolean;
}

const fetcher = async (url: string, options: FetcherOptions) => {
  try {
    const response = await axios.get<ApiResponse<Student[]>>(url, {
      headers: {
        Authorization: `Bearer ${options.token}`,
      },
      params: {
        active: options.active,
      },
    });
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.msg);
    }
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse<ErrorResponse>>;
    if (axiosError.response) {
      throw new Error(axiosError.response.data.msg);
    } else if (axiosError.request) {
      throw new Error("No response received from the server");
    } else {
      throw new Error("Request failed");
    }
  }
};

export const useStudents = (active: boolean = false) => {
  const { token } = useAuth();
  const tk = token as string;
  const { data, error, mutate, isLoading } = useSWR(API_BASE_URL, () =>
    fetcher(API_BASE_URL, { token: tk, active })
  );

  const getStudentById = (id: string) => {
    return data?.find((student) => student.id === id) || null;
  };

  const createStudent = async (
    studentData: Omit<Student, "id" | "ancient" | "age" | "user_id">
  ) => {
    try {
      const response = await axios.post<ApiResponse<Student>>(
        API_BASE_URL,
        studentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        mutate(); // Trigger a re-fetch of the data
        return response.data.data;
      } else {
        throw new Error(response.data.msg);
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse<ErrorResponse>>;
      if (axiosError.response) {
        throw new Error(axiosError.response.data.msg);
      } else {
        throw new Error("Failed to create student");
      }
    }
  };

  const updateStudent = async (id: string, studentData: Student) => {
    try {
      const response = await axios.put<ApiResponse<Student>>(
        `${API_BASE_URL}/${id}`,
        studentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        mutate(); // Trigger a re-fetch of the data
        return response.data.data;
      } else {
        throw new Error(response.data.msg);
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse<ErrorResponse>>;
      if (axiosError.response) {
        throw new Error(axiosError.response.data.msg);
      } else {
        throw new Error("Failed to update student");
      }
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      const response = await axios.delete<ApiResponse<null>>(
        `${API_BASE_URL}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        mutate(); // Trigger a re-fetch of the data
      } else {
        throw new Error(response.data.msg);
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse<ErrorResponse>>;
      if (axiosError.response) {
        throw new Error(axiosError.response.data.msg);
      } else {
        throw new Error("Failed to delete student");
      }
    }
  };

  return {
    students: data || [],
    error,
    isLoading,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
  };
};
