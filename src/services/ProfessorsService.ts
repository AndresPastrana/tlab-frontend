import axios from "axios";

import { ApiResponse, PopulatedCourt, Profesor } from "../types";

const url = `${import.meta.env.VITE_API}${import.meta.env.VITE_PROFESORES}`;

const getCourtByProfessorId = async (token: string) => {
  try {
    // Make a request to the endpoint
    const response = await axios.get<
      ApiResponse<{ professor: Profesor; court: PopulatedCourt }>
    >(`${url}/info`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      return response.data.data;
    }

    throw new Error(`API Error: ${response.data.msg}`);
  } catch (error) {
    // Handle errors, you might want to log them or throw a custom error
    console.error("Error in getCourtByProfessorId:", error);
    throw error;
  }
};

const getProfessorStats = async (token: string) => {
  try {
    // Make a request to the endpoint
    const response = await axios.get<
      ApiResponse<{ totalProyectos: number; proyectosAprobados: number }>
    >(
      `${url}/stats`, // Assuming 'url' is defined somewhere in your code
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      return response.data.data;
    }

    throw new Error(`API Error: ${response.data.msg}`);
  } catch (error) {
    // Handle errors, you might want to log them or throw a custom error
    console.error("Error in getProfessorStats:", error);
    throw error;
  }
};
export const ProfessorService = {
  getCourtByProfessorId,
  getProfessorStats,
};
