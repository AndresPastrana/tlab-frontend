import useSWR from "swr";
import axios, { AxiosRequestConfig } from "axios";
import { ApiResponse, Evaluation, Submission } from "../types";
import { useAuth } from "./useAuth"; // Adjust the import based on your actual path
import { toast } from "sonner";

const API_BASE_URL = `${import.meta.env.VITE_API}${
  import.meta.env.VITE_EVALUACIONES
}`;

interface FetcherOptions extends AxiosRequestConfig {
  token: string;
  // You can add any additional options you need
}

const fetcher = async (url: string, { token, ...options }: FetcherOptions) => {
  try {
    const response = await axios.get<
      ApiResponse<{ evaluation: Evaluation; submission: Submission }[]>
    >(url, {
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

export const useStudentsEvaluations = () => {
  const { token, user } = useAuth();

  const evalSubUrl = `${API_BASE_URL}/submissions/${user?.userId}`;

  const {
    data: evaluationsWithSubmissions,
    error,
    isLoading,
    mutate,
  } = useSWR(
    evalSubUrl,
    (url: string) => fetcher(url, { token: token as string }) // Pass user token as a parameter
  );
  const addSubmission = async (data: FormData) => {
    try {
      const resp = await axios.post<ApiResponse<any>>(url, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resp.data.success) {
        return mutate();
      }
      toast.error("Error al crear envio");
      console.log(error);

      return { ok: true };
    } catch (error) {
      console.log(error);
    }
  };

  return {
    evaluationsWithSubmissions: evaluationsWithSubmissions || [],
    isLoading: isLoading && !evaluationsWithSubmissions && !error,
    isError: !!error,
    error,
    addSubmission,
  };
};
