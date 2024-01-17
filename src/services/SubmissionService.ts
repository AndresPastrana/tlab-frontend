import axios, { AxiosRequestConfig } from "axios";

import { ApiResponse, Submission } from "../types";

const urlBase = `${import.meta.env.VITE_API}${
  import.meta.env.VITE_EVALUACIONES
}`;

const editSubmision = async (
  id: string,
  data: FormData,
  options?: AxiosRequestConfig
) => {
  try {
    const resp = await axios.put<ApiResponse<Partial<Submission>>>(
      `${urlBase}/submissions/${id}`,
      data,
      { ...options }
    );

    if (resp.data.success) {
      return resp.data.data;
    } else {
      throw new Error("Error editing the evaluation");
    }
  } catch (error) {
    console.log("Error editing the evaluation");
    console.log(error);

    throw new Error("Error editing the evaluation");
  }
};

const SubmissionService = { editSubmision };

export default SubmissionService;
