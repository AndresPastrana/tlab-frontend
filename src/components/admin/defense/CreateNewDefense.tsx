import React, { useState } from "react";
import DynamicTextInputs from "../../shared/DynamicTextInputs";

export const DefenseCreationComponent: React.FC = () => {
  //   const { token } = useAuth();
  const [keyWords, setKeyWords] = useState<string[]>([]);

  const handleKeyWordsChange = (newKeyWords: string[]) => {
    setKeyWords(newKeyWords);
  };

  const handleKeyWordsSubmit = async (newKeyWords: string[]) => {
    // You can perform any asynchronous operation here, e.g., send to server
    console.log("Submitting key_words:", newKeyWords);
  };

  const handleCreateDefense = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formdata = new FormData(event.currentTarget);

    const data = Object.fromEntries(formdata);
    console.log(data);
  };

  return (
    <div>
      <h2>Crear Nueva Defensa</h2>
      <form
        encType="multipart/form-data "
        className="flex flex-col gap-3"
        onSubmit={handleCreateDefense}
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <div className="flex flex-col gap-2  basis-10/12  sm:basis-full w-full">
            <label>Recomendaciones:</label>
            <textarea
              placeholder="Recomendaciones para el acta de defensa..."
              name="recoms"
              className=" textarea input-bordered textarea-sm w-full "
            />
          </div>
          <div className="flex flex-row sm:flex-col w-full justify-start gap-3 mt-3 items-center ">
            <label>Evaluacion:</label>
            <input
              type="number"
              required
              min={3}
              max={5}
              name="evaluation"
              className="input input-bordered max-w-[100px]"
            />
          </div>
        </div>

        <div className="flex flex-col max-h-[200px] overflow-y-scroll max-w-md ">
          <p>Key words</p>
          <DynamicTextInputs
            initialInputs={keyWords}
            onInputsChange={handleKeyWordsChange}
            onSubmit={handleKeyWordsSubmit}
            showBtn={true}
          />
        </div>

        <div className="flex flex-col">
          <label>Documento de la defensa:</label>
          <input
            required
            className="file-input w-full max-w-xs file-input-bordered"
            type="file"
            name="docFile"
          />
        </div>
        <div className="flex flex-col">
          <label>Presentacion de la defensa:</label>
          <input
            required
            className="file-input w-full max-w-xs file-input-bordered"
            type="file"
            name="presFile"
          />
        </div>

        <button className="btn my-5" type="submit">
          Guardar Defensa
        </button>
      </form>
    </div>
  );
};

export default DefenseCreationComponent;
