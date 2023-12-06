import axios from "axios";
import { ApiResponse, DecodedToken } from "../types";
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = import.meta.env.VITE_API;
const LOGIN_ENDPOINT = import.meta.env.VITE_AUTH; // Adjust the endpoint accordingly

interface LoginCredentials {
  username: string;
  password: string;
}

export class AuthService {
  static async login({ username, password }: LoginCredentials) {
    try {
      const response = await axios.post<ApiResponse<{ token: string }>>(
        `${API_BASE_URL}${LOGIN_ENDPOINT}`,
        {
          username,
          password,
        }
      );

      if (response.data.success) {
        const token = response.data.data.token;
        const decodedToken: DecodedToken = jwtDecode(token);

        return { token, user: decodedToken };
      } else {
        throw new Error("Login failed. Invalid response format.");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Login failed. Unable to connect to the server.");
    }
  }
}
