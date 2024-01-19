import { useLocation } from "react-router-dom";
import { useProfessors } from "../../../hooks/useProfessors";
import { Profesor, ProfesorTable } from "../../../types";
import { Edit } from "./FormsButtons";
import useFilteredItems from "../../../hooks/useFilteredItem";

// Large Screen Table
export const TableLg = ({ profesors }: { profesors: ProfesorTable }) => {
  return (
    <div className="mt-5 p-4 bg-gray-100 rounded-md hidden lg:block ">
      <table className="w-full">
        <thead className="">
          <tr className="[&>th]:py-8 [&>th]:px-2 [&>th]:text-left [&>th]:font-semibold text-gray-700 ">
            {/* <th className="">ID</th> */}
            <th className="">CI</th>
            <th className="">Name</th>
            <th className="">Lastname</th>
            <th className="">Address</th>
            <th className="">Email</th>
            <th className="">Phone</th>
            <th className="">Sex</th>
            <th className="">Age</th>
            <th className="">Academic Rank</th>
          </tr>
        </thead>
        <tbody className="rounded-md">
          {profesors.map((professor) => (
            <tr
              key={professor.id}
              className="bg-white rounded-lg border-solid border-b-[1px] border-gray-100"
            >
              {/* <td className="p-2">{professor.id}</td> */}
              <td className="py-6 px-2">{professor.ci}</td>
              <td className="py-6 px-2">{professor.name}</td>
              <td className="py-6 px-2">{professor.lastname}</td>
              <td className="py-6 px-2">{professor.address}</td>
              <td className="py-6 px-2">{professor.email}</td>
              <td className="py-6 px-2">{professor.phone}</td>
              <td className="py-6 px-2">{professor.sex}</td>
              <td className="py-6 px-2">{professor.age}</td>
              <td className="py-6 px-2">{professor.academic_rank}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/* Medium and Small Screens table */
export const TableSm = ({ profesors }: { profesors: ProfesorTable }) => {
  return (
    <div className="lg:hidden w-full mt-5 p-4 bg-gray-100 rounded-md">
      {profesors.map((professor) => (
        <div
          key={professor.id}
          className="bg-white rounded-lg border-solid border-b-[1px] border-gray-100 mb-4 p-4"
        >
          <div className="flex flex-col">
            <div className="flex justify-between">
              <div className="flex flex-col basis-1/2 gap-1">
                <p className="text-lg font-medium">
                  {professor.name} {professor.lastname}
                </p>
                <p className="text-gray-500">{professor.email}</p>
              </div>
              <div className="flex flex-col basis-1/2 justify-center">
                <p className="text-right">{professor.ci}</p>
              </div>
            </div>
            <div className="divider my-3"></div>
            <div className="flex justify-between">
              <span className="flex flex-col justify-center">
                <p className="font-medium">{professor.academic_rank}</p>
              </span>

              <span className="flex flex-row items-center gap-1">
                <Edit href={`/admin/personas/profesors/edit/${professor.id}`} />
                {/* <Edit
                  href={`/dashboard/personas/profesores/edit/${professor.id}`}
                /> */}
                {/* <Delete id={professor.id} /> */}
                {/* <p>Edit</p>
                    <p>Remove</p> */}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Profesors Table
const TableProfesors = () => {
  const { professors, isLoading, isError, error } = useProfessors();
  const location = useLocation();

  const currentParams = new URLSearchParams(location.search);
  const searchParam = currentParams.get("query") || "";
  const filterParams: (keyof Profesor)[] = ["name", "lastname", "email"];

  const filteredProfessors = useFilteredItems(
    professors,
    searchParam,
    filterParams
  );
  return (
    <>
      {isLoading && <p>Loading</p>}
      {isError && <p>{JSON.stringify(error)}</p>}

      {!isLoading && !isError && (
        <>
          <TableLg profesors={filteredProfessors || []} />
          <TableSm profesors={filteredProfessors || []} />
        </>
      )}
    </>
  );
};

export default TableProfesors;
