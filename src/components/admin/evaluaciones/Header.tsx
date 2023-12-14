import { EvalFilters } from "./EvalFilters";

export const Header = () => {
  return (
    <div className=" flex items-center justify-between mt-12">
      <h1 className="text-xl font-bold">Evalucaiones </h1>
      <EvalFilters />
    </div>
  );
};
