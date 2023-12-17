import axios from "axios";
import React from "react";
import { useAuth } from "../../hooks/useAuth";

const FileUploadComponent: React.FC = () => {
  const { token } = useAuth();
  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const jsonData = Object.fromEntries(formData.entries());
    console.log(jsonData);

    try {
      const resp = await axios.post(
        "http://localhost:23274/api/defense",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
            Doc:
            <input className="file-input" type="file" name="docFile" />
          </label>
        </div>
        <div>
          <label>
            Presentacion :
            <input className="file-input" type="file" name="presFile" />
          </label>
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default FileUploadComponent;
