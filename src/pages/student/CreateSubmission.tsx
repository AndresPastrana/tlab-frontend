import axios from "axios";
import React from "react";

const FileUploadComponent: React.FC = () => {
  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // const jsonData = Object.fromEntries(formData.entries());
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
            Title:
            <input className="input" type="text" name="title" />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea className="textarea" name="description" />
          </label>
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default FileUploadComponent;
