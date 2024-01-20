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
export type StudentHistory = {
  evaluaciones: Array<{
    type: EvalType;
    updatedAt: Date;
    score: number | null;
    file: string | null;
  }>;
};

export interface Profesor extends Person {
  academic_rank: RangoAcademico;
}

export type ProfesorTable = Array<Profesor>;

export interface Student extends Person {
  language_certificate: boolean;
}

export enum CourtRole {
  Presidente = "presidente",
  Secretario = "secretario",
  Vocal = "vocal",
  Oponente = "oponente",
}

interface CourtMember {
  profesor: {
    id: string;
    name: string;
    lastname: string;
  };
  role: CourtRole;
  _id: string;
}

export interface Court {
  id: string;
  name: string;
  members: CourtMember[];
}
export type Courts = Court[];

export type CourtData = {
  name: string;
  members: {
    role: CourtRole;
    profesor: string;
  }[];
};

type PopulatedCourtMember = {
  profesor: {
    id: string;
    name: string;
    lastname: string;
  };
  role: CourtRole;
  _id: string;
};

export type PopulatedCourt = Omit<CourtType, "members"> & {
  members: PopulatedCourtMember[];
};

interface PersonBasicInfo {
  id: string;
  name: string;
  lastname: string;
}

type Tutors = PersonBasicInfo[];
type Student = PersonBasicInfo;

export interface Approval {
  isApprove: boolean;
  recommendations: string[];
  approvedBy: Schema.Types.ObjectId | null;
  date: Date | null;
}
interface TesisProjectResponse {
  id: string;
  tutors: Array<Schema.Types.ObjectId>;
  student: Schema.Types.ObjectId;
  topic: string;
  general_target: string;
  scientific_problem: string;
  functional_requirements: string[];
  status: TesisProjectStatus;
  approval: Approval | null;
  ancient: boolean;
}

export type PopulatedTesisResponse = Omit<
  TesisProjectResponse,
  "tutors" | "student"
> & {
  student: Student;
  tutors: Tutors;
};

export type CreateProjectData = Pick<
  TesisProjectResponse,
  "topic" | "general_target" | "scientific_problem"
> & { student?: string; tutors?: string[] };

export interface Evaluation {
  id: string;
  type: EvalType;
  status: EvalStatus;
  endDate: Date;
  description: string;
}

export enum EvalStatus {
  Open = "open",
  Close = "close",
}

export enum EvalType {
  CorteEvaluativo = "corte_evaluativo",
  Predefensa = "predefensa",
}

export interface Submission {
  id: string;
  evaluation_id: Schema.Types.ObjectId; // Reference to the evaluation it belongs to
  student_id: Schema.Types.ObjectId; // Reference to the student (foreign key)
  file: string;
  score: number;
  recoms: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Defense {
  _id: string;
  doc_url: string;
  pres_url: string;

  // Fields for search
  metadata: {
    general_target: string;
    functional_requirements: string[];
    scientific_problem: string;
    topic: string;
    tutors: string[];
    student: string;
    court: { fullname: string; role: CourtRole }[];
    key_words: string[]; // Added field
  };
  eval: number;
  recomns: string;
  date: Date;
}
