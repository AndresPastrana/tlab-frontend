import axios from "axios";
import React from "react";
import { useAuth } from "../../hooks/useAuth";

const FileUploadComponent: React.FC = () => {
  const { user } = useAuth();
  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const jsonData = Object.fromEntries(formData.entries());
    console.log(jsonData);

    try {
      const resp = await axios.post(
        "http://localhost:23274/api/evaluaciones/submissions",
        formData,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTcxMDcxY2MyM2Q3MjJkYmQxODJkYjIiLCJ1c2VybmFtZSI6InVzZXJpbmZvdXByIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzAyNDkwMDg1LCJleHAiOjE3MDI1NzY0ODV9.Y35OOi7Gz9EXfbRybPzTQWeE_-GRSmjxpcM9hDQQL7o`,
          },
        }
      );
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <p>{user?.userId}</p>
      <h2>File Upload Component</h2>
      <form encType="multipart/form-data" onSubmit={handleUpload}>
        <div>
          <label>
            File:
            <input className="file-input" type="file" name="form_file" />
          </label>
        </div>
        <div>
          <label>
            Evaluacion:
            <input
              className="input"
              type="text"
              name="evaluation_id"
              value="6579c9253888e45ea4280a13"
            />
          </label>
        </div>
        <div>
          <label>
            Estudinate:
            <input className="input" name="student_id" value={user?.userId} />
          </label>
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default FileUploadComponent;
