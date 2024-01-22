import { ApiResponse } from "./../types.d";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import {
  months,
  presentationDocumentExtensions,
  textDocumentExtensions,
} from "../const";
import { useAuth } from "../hooks/useAuth";

export const getServerUrl = () => {
  const hostname = window.location.origin;
  return hostname;
};

export function isTextDocumentExtension(extension: string) {
  return textDocumentExtensions.includes(extension);
}

export function isPresentationDocumentExtension(extension: string) {
  return presentationDocumentExtensions.includes(extension);
}

/**
 * Capitalizes the first letter of each word in a string.
 * @param {string} input - The input string.
 * @returns {string} - The string with the first letter of each word capitalized.
 */
export function capitalizeFirstLetterOfEachWord(input: string): string {
  // Check if the input is a valid string
  if (!input || typeof input !== "string") {
    return input;
  }

  // Split the string into an array of words
  return (
    input
      .split(" ")
      // Map over each word and capitalize the first letter
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      // Join the words back into a string
      .join(" ")
  );
}

/**
 * Calculate the absolute value represented by the percentage with respect to the total.
 * @param {number} total - The total value.
 * @param {number} percentage - The percentage to calculate in terms of the total.
 * @param {number} decimalPlaces - The number of decimal places to round the result to.
 * @returns {number} - The absolute value represented by the percentage with respect to the total.
 */
export function calculateAbsoluteValueWithDecimals(
  total: number,
  percentage: number,
  decimalPlaces: number = 1
): number {
  if (total <= 0 || percentage < 0 || percentage > 100 || decimalPlaces < 0) {
    throw new Error("Invalid input values");
  }

  const result = (percentage / 100) * total;

  // Round the result to the specified number of decimal places
  return Number(result.toFixed(decimalPlaces));
}

export function getSpanishMonthName(monthNumber: number) {
  // Check if the monthNumber is valid (between 1 and 12)
  if (monthNumber >= 1 && monthNumber <= 12) {
    return months[monthNumber - 1]; // Arrays are zero-indexed
  } else {
    return "Invalid month number";
  }
}

export function AxiosRequestWithBearerToken(axios: AxiosInstance) {
  const { token } = useAuth();

  if (!token) {
    throw new Error("No access token");
  }

  // Add the token to the Authorization header as a Bearer token
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return axios;
}

interface FetcherOptions {
  token: string;
}

export const fetcher = async <T>(
  url: string,
  options: FetcherOptions & AxiosRequestConfig
): Promise<T> => {
  try {
    const { token, ...rest } = options;
    const response = await axios.get<ApiResponse<T>>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      ...rest,
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

export function formatDate(inputDate: string): string {
  // Parse the input date string into a Date object
  const dateObject = new Date(inputDate);

  // Extract year, month, and day components
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(dateObject.getDate()).padStart(2, "0");

  // Create the formatted date string
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}
