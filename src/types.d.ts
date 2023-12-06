// Define a generic API response type
import { RangoAcademico, Sex } from "@/const";
import { JwtPayload } from "jwt-decode";
import { UserRole } from "./const";
export interface ApiResponse<T> {
  success: boolean;
  msg: string;
  data: T;
  error: ErrorResponse | null;
}

// Define the ErrorResponse type
export interface ErrorResponse {
  name: string;
  message: string;
}

// Define the specific data type for the login endpoint

export interface LogedUser {
  role: UserRole;
  userId: string;
  username: string;
}

// Define a type for the decoded token
export interface DecodedToken extends JwtPayload {
  role: UserRole;
  userId: string;
  username: string;
  exp: number;
  iat: number;
}

export type LoginFormErrors = {
  username: null | string;
  password: null | string;
  other: null | string;
};

export type CrumbItem = {
  label: string;
  href?: string;
};
export type CrumbsItems = {
  items: CrumbItem[];
};

export interface Person {
  id: string;
  user_id: string;
  ci: string;
  lastname: string;
  name: string;
  address: string;
  age: number;
  email: string;
  phone: string;
  sex: Sex;
  ancient: boolean;
}

export interface Profesor extends Person {
  academic_rank: RangoAcademico;
}

export type ProfesorTable = Array<Profesor>;
