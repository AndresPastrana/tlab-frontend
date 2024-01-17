import useSWR from "swr";
import axios, { AxiosRequestConfig } from "axios";
import { ApiResponse, PopulatedTesisResponse } from "../types"; // Adjust the import based on your actual path
import { useAuth } from "./useAuth"; // Adjust the import based on your actual path
import { UserRole } from "../const";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API;

interface FetcherOptions extends AxiosRequestConfig {
  token: string;
  // You can add any additional options you need
}

const fetcher = async (url: string, { token, ...options }: FetcherOptions) => {
  try {
    const response = await axios.get<
      ApiResponse<PopulatedTesisResponse[] | PopulatedTesisResponse>
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

/**
 * Fetches project information based on the specified parameters.
 * @param {boolean} active - Indicates whether to fetch active projects or not.
 * @param {UserRole} memberType - The role of the member (Student or Profesor).
 * @returns {Object} An object containing project information, loading state, and error information.
 */
export const useProjectInfo = (active: boolean = true) => {
  const { token, user } = useAuth(); // Assuming useAuth returns the token
  const memberType =
    user?.role === UserRole.Student ? UserRole.Student : UserRole.Profesor;
  // Construct the URL with query parameters
  const url = `${API_BASE_URL}${
    import.meta.env.VITE_PROJECT
  }/byMember?active=${active}&memberType=${memberType}&memberId=${
    user?.userId
  }`;

  const {
    data: projects,
    error,
    mutate,
  } = useSWR(
    url,
    (url: string) => fetcher(url, { token: token as string }) // Pass token as a parameter
  );

  const updateFrequirements = async (
    proyectID: string,
    functionalRequirements: string[]
  ) => {
    // /update-functional/657790368b734da26c6a6234

    try {
      const url = `${API_BASE_URL}${
        import.meta.env.VITE_PROJECT
      }/update-functional/${proyectID}`;

      const resp = await axios.put<ApiResponse<PopulatedTesisResponse>>(
        url,
        {
          functionalRequirements,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (resp.data.success) {
        return mutate();
      }

      throw new Error(resp.data.msg);
    } catch (error) {
      throw new Error("Error actualizando lsop requerientos de su proyecto");
    }
  };

  const aproveProject = async (id: string, recoms: string) => {
    try {
      const url = `${API_BASE_URL}${
        import.meta.env.VITE_PROJECT
      }/approve/${id}`;

      const resp = await axios.put<ApiResponse<unknown>>(
        url,
        { recoms },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.data.success) {
        mutate();
        toast.success("Proyecto aprovado exitosamente");
      } else {
        toast.success("Error aprovando el proyecto");
      }

      console.log(resp);

      return;

      //  const resp = axios.put(url)
    } catch (error) {
      console.log(error);
    }
  };
  return {
    projects: projects || [],
    updateFrequirements,
    aproveProject,
    isLoading: !projects && !error,
    isError: !!error,
    error,
  };
};
