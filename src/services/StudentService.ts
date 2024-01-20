import axios from "axios";
import { ApiResponse, StudentHistory } from "../types";

class StudentHistoryService {
  private static readonly apiUrl: string = `${import.meta.env.VITE_API}${
    import.meta.env.VITE_STUDENTS
  }`;

  static async getStudentHistory(studentId: string) {
    try {
      const response = await axios.get<ApiResponse<StudentHistory>>(
        `${this.apiUrl}/history/${studentId}`
      );

      if (response.data.success) {
        return response.data.data;
      }
      throw new Error("Error fetching student history");
    } catch (error) {
      console.log(error);

      throw new Error("Error fetching student history");
    }
  }
}

export default StudentHistoryService;
