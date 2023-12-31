// DefenseSearchComponent.tsx

import React, { useState } from "react";
import { Create } from "../../../components/admin/profesores/FormsButtons";
import { useDebouncedCallback } from "use-debounce";
import DefenseService from "../../../services/DefenseService";
import { CrumbItem, Defense } from "../../../types";
import { Link } from "react-router-dom";
import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";
import { capitalizeFirstLetterOfEachWord } from "../../../utils/others";
import { cretateActaDefensaPDF } from "../../../utils/helpers";
import Breadcrumbs from "../../shared/Breadcrumbs";

interface ResultItemProps {
  result: Defense;
}
const BtnActaDefensa: React.FC<ResultItemProps> = ({ result }) => {
  const createActa = async () => {
    try {
      // Create and get a pdf Blob with thw acta de defen
      const pdfBlob = await cretateActaDefensaPDF(result);

      // // Create a download link and trigger the download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(pdfBlob as Blob);
      link.download = "acta-defensa.pdf";
      link.click();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button
        role="button"
        onClick={createActa}
        className="flex items-center btn btn-ghost hover:bg-gray-100 text-green-600 hover:text-green-800"
      >
        <span className="mr-2">Acta de Defensa </span>
        <ArrowDownCircleIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

const ResultItem: React.FC<ResultItemProps> = ({ result }) => (
  <div className="border-b border-gray-300 pb-2 mb-2 flex flex-col gap-4 my-10 transition-all delay-2000 ease-in-out">
    <p className="text-green-800 text-lg font-semibold mb-5">
      Topic: {result.metadata.topic}
    </p>
    <p className="text-gray-800">
      <span className="font-semibold">General Target:</span>{" "}
      {result.metadata.general_target}
    </p>
    <p className="text-gray-800">
      <span className="font-semibold mr-2">Scientific Problem:</span>{" "}
      {result.metadata.scientific_problem}
    </p>
    <p className="text-gray-800">
      <span className="font-semibold mr-2">Student:</span>{" "}
      {capitalizeFirstLetterOfEachWord(result.metadata.student)}
    </p>
    <div>
      <span className="font-semibold mr-2">Tutores del Proyecto: </span>{" "}
      {result.metadata.tutors.map((tutor, index) => {
        return (
          <span>{`${capitalizeFirstLetterOfEachWord(tutor)} ${
            index < result.metadata.tutors.length - 1 ? ",  " : ""
          }`}</span>
        );
      })}
    </div>
    <div className="text-gray-800">
      <span className="font-semibold">Tribunal:</span>{" "}
      {result.metadata.court.map((courtMember) => {
        return (
          <div className="my-1">
            <span className="underline underline-offset-4 mr-3">
              {capitalizeFirstLetterOfEachWord(courtMember.role)}
            </span>
            <span>
              {" "}
              {capitalizeFirstLetterOfEachWord(courtMember.fullname)}
            </span>
          </div>
        );
      })}
    </div>
    <div className="flex gap-3 mt-3 justify-end">
      <BtnActaDefensa result={result} />
      <div>
        <Link
          className="flex items-center btn btn-ghost hover:bg-gray-100 text-green-600 hover:text-green-800"
          to={result.doc_url}
        >
          <span className="mr-2">Documento </span>
          <ArrowDownCircleIcon className="w-4 h-4" />
        </Link>
      </div>
      <div>
        <Link
          className="flex items-center btn btn-ghost hover:bg-gray-100 text-green-600 hover:text-green-800"
          to={result.pres_url}
        >
          <span className="mr-2">Presentacion </span>
          <ArrowDownCircleIcon className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </div>
);

const DefenseSearchComponent: React.FC = () => {
  const items: CrumbItem[] = [
    { label: "Home", href: "/admin" },
    { label: "Defensas" },
  ];
  const [searchResults, setSearchResults] = useState<Defense[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    // delay
    // await new Promise((res, _rej) => setTimeout(res, 4000));
    try {
      const { value } = e.target;
      if (value === "") {
        return setSearchResults([]);
      }
      const results = (await DefenseService.searchDefenses(value, {})) || [];
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching defenses:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useDebouncedCallback(handleSearch, 400);

  return (
    <div className="max-w-screen-xl mt-4 mx-auto w-full">
      <Breadcrumbs items={items} />
      <div className="flex items-center w-full gap-3">
        <input
          type="text"
          placeholder="Search defenses..."
          onChange={debouncedSearch}
          className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-green-500"
        />
        <Create href="/admin/defense/create" text="Crear Defensa" />
      </div>

      {loading && (
        <div className="flex justify-center mt-20">
          <span className="w-10 h-10 loading loading-spinner text-green-500"></span>
        </div>
      )}

      {!loading && searchResults.length === 0 && (
        <p className="mt-4 text-gray-600 font-medium">No results found.</p>
      )}

      {!loading && searchResults.length > 0 && (
        <div className="mt-4">
          {searchResults.map((defense) => (
            <ResultItem result={defense} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DefenseSearchComponent;
