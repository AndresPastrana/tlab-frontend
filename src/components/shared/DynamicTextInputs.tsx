import { PlusIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

interface DynamicTextInputsProps {
  initialInputs?: string[];
  onInputsChange: (inputs: string[]) => void;
  onSubmit?: (inputs: string[]) => Promise<void>;
  showBtn?: boolean;
}

const DynamicTextInputs: React.FC<DynamicTextInputsProps> = ({
  initialInputs = [],
  onInputsChange,
  onSubmit,
  showBtn,
}) => {
  const [inputs, setInputs] = useState<string[]>(initialInputs);

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
    onInputsChange(newInputs);
  };

  const handleAddInput = () => {
    const newInputs = [...inputs, ""];
    setInputs(newInputs);
    onInputsChange(newInputs);
  };

  const handleRemoveInput = (index: number) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
    onInputsChange(newInputs);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (onSubmit) {
      return onSubmit(inputs);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {inputs.map((input, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              value={input}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="mr-2 p-2 border border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={() => handleRemoveInput(index)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <div className="flex gap-2">
          {!showBtn && (
            <button className="btn" type="submit">
              Guardar Requerimientos funcionales
            </button>
          )}

          <button
            type="button"
            onClick={handleAddInput}
            className="btn btn-circle btn-ghost hover:border hover:border-green-800 hover:bg-green-100 hover:text-green-800"
          >
            <PlusIcon className="w-5  h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default DynamicTextInputs;
