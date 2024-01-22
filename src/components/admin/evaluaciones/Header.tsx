import { EvalFilters } from "./EvalFilters";

export const Header = () => {
  return (
    <div className=" flex items-center justify-between mt-5 bg-gray-100 px-3 py-5 rounded-md mb-3">
      <h1 className="text-gray-700 font-medium pb-2 border-b w-fit mb-3 text-lg border-gray-400">
        Evaluaciones
      </h1>
      <EvalFilters />
    </div>
  );
};
