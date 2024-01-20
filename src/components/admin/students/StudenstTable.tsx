import { CheckIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useStudents } from "../../../hooks/useStudents";

import { Delete, Edit, Historial } from "./FormsButtons";
import { Student } from "../../../types";
import PeopleTableSkeleton from "../../shared/skeleton/PeopleTable";
import { Link, useLocation } from "react-router-dom";
import { useFilteredItems } from "../../../hooks/useFilteredItem";

const LanguageBadge = ({ isCertified }: { isCertified: boolean }) => {
  return (
    <>
      {isCertified ? (
        <div className="badge badge-success gap-2 py-4 px-3 rounded-3xl bg-green-50 border-green-800 text-green-800">
          Ingles Certificado
          <CheckIcon className="w-4 h-4" />
        </div>
      ) : (
        <div className="badge badge-error gap-2 py-4 px-3 rounded-3xl bg-red-50 border-red-800 text-red-800">
          Ingles no Cretificado
          <ExclamationCircleIcon className="w-4 h-4" />
        </div>
      )}
    </>
  );
};
const EditLgBtn = ({ href }: { href: string }) => {
  return (
    <Link to={href} className="snap-center">
      <button className="m-1 btn bg-transparent border-none p-2 shadow-none bg-gray-600">
        <PencilSquareIcon className="w-5 h-5 :w-4 md:h-4" />
      </button>
    </Link>
  );
};

const EmptyStudentsMessage = () => {
  return (
    <div className="flex font-normal  text-sm sm:text-base items-center justify-center h-48 my-20">
      <p className="text-gray-600 text-center">
        No existen estudiantes activos actualmente, haga click{" "}
        <Link
          className="text-green-800 border-b pb-1"
          to={"/admin/personas/students/create"}
        >
          aqui
        </Link>{" "}
        para agregar uno nuevo
      </p>
    </div>
  );
};

// Large Screen Table
export const TableLg = ({ students }: { students: Student[] }) => {
  return (
    <div className="mt-5 p-4 bg-gray-100 rounded-md hidden lg:block ">
      <table className="w-full">
        <thead className="">
          <tr className="[&>th]:py-8 [&>th]:px-2 [&>th]:text-left [&>th]:font-semibold text-gray-700 ">
            {/* <th className="">ID</th> */}
            <th className="">CI</th>
            <th className="">Nombre(s)</th>
            <th className="">Apellido(s)</th>
            <th className="">Direccion</th>
            <th className="">Correo</th>
            <th className="">Telefono</th>
            <th className="">Edad</th>
            <th className="">Age</th>
            <th className="">Rango Academico</th>
            <th className="">Aciones</th>
          </tr>
        </thead>
        <tbody className="rounded-md">
          {students.map((student) => (
            <tr
              key={student.id}
              className="bg-white rounded-lg border-solid border-b-[1px] border-gray-100"
            >
              {/* <td className="p-2">{professor.id}</td> */}
              <td className="py-6 px-2">{student.ci}</td>
              <td className="py-6 px-2">{student.name}</td>
              <td className="py-6 px-2">{student.lastname}</td>
              <td className="py-6 px-2">{student.address}</td>
              <td className="py-6 px-2">{student.email}</td>
              <td className="py-6 px-2">{student.phone}</td>
              <td className="py-6 px-2">{student.sex}</td>
              <td className="py-6 px-2">{student.age}</td>
              <td className="py-6 px-2">
                <LanguageBadge isCertified={student.language_certificate} />
              </td>
              <td className="">
                <div className=" border-l flex flex-col w-fit p-2 ml-auto max-h-20 overflow-y-scroll focus:scroll-p-0 rounded-xl gap-1 scroll-smooth snap-y ">
                  <EditLgBtn
                    href={`/admin/personas/students/edit/${student.id}`}
                  />
                  <EditLgBtn
                    href={`/admin/personas/students/edit/${student.id}`}
                  />
                  <EditLgBtn
                    href={`/admin/personas/students/edit/${student.id}`}
                  />{" "}
                  <EditLgBtn
                    href={`/admin/personas/students/edit/${student.id}`}
                  />{" "}
                  <EditLgBtn
                    href={`/admin/personas/students/edit/${student.id}`}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/* Medium and Small Screens table */
export const TableSm = ({ students }: { students: Student[] }) => {
  const { deleteStudent } = useStudents();
  return (
    <div className="lg:hidden w-full mt-5 p-4 bg-gray-100 rounded-md">
      {students.map((student) => (
        <div
          key={student.id}
          className="bg-white rounded-lg border-solid border-b-[1px] border-gray-100 mb-4 p-4"
        >
          <div className="flex flex-col">
            <div className="flex justify-between">
              <div className="flex flex-col basis-1/2 gap-1">
                <p className="text-lg font-medium">
                  {student.name} {student.lastname}
                </p>
                <p className="text-gray-500">{student.email}</p>
              </div>
              <div className="flex flex-col basis-1/2 justify-center">
                <p className="text-right">{student.ci}</p>
              </div>
            </div>
            <div className="divider my-3"></div>
            <div className="flex justify-between">
              <span className="flex flex-col justify-center">
                <p className="font-medium">
                  <LanguageBadge isCertified={student.language_certificate} />
                </p>
              </span>

              <span className="flex flex-row items-center gap-1">
                <Edit href={`/admin/personas/students/edit/${student.id}`} />
                <Historial
                  href={`/admin/personas/students/${student.id}/historial`}
                />
                {/* <Edit
                  href={`/dashboard/personas/profesores/edit/${professor.id}`}
                /> */}
                <Delete handleDeletebyHook={() => deleteStudent(student.id)} />
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
const TableStudents = () => {
  const { students, isLoading, error } = useStudents();
  const location = useLocation();

  const currentParams = new URLSearchParams(location.search);
  const searchParam = currentParams.get("query") || "";
  const filterParams: (keyof Student)[] = ["name", "lastname", "email"];

  const filteredStudents = useFilteredItems(
    students,
    searchParam,
    filterParams
  );

  return (
    <>
      {isLoading && <PeopleTableSkeleton />}
      {error && <p>{JSON.stringify(error)}</p>}
      {!error && !isLoading && filteredStudents.length === 0 && (
        <EmptyStudentsMessage />
      )}
      {!isLoading && !error && filteredStudents.length > 0 && (
        <>
          <TableLg students={filteredStudents} />
          <TableSm students={filteredStudents} />
        </>
      )}
    </>
  );
};

export default TableStudents;
