// DefenseSearchComponent.tsx

import React, { useEffect, useState } from "react";
import { Create } from "../../../components/admin/profesores/FormsButtons";
import { useDebouncedCallback } from "use-debounce";
import DefenseService from "../../../services/DefenseService";
import { CrumbItem, Defense } from "../../../types";
import { Link, useLocation } from "react-router-dom";
import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";
import {
  capitalizeFirstLetterOfEachWord,
  formatDate,
} from "../../../utils/others";
import { cretateActaDefensaPDF } from "../../../utils/helpers";
import Breadcrumbs from "../../shared/Breadcrumbs";
import { ShareIcon } from "@heroicons/react/20/solid";
import { toast } from "sonner";

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

const ResultItem: React.FC<ResultItemProps> = ({ result }) => {
  const hanldleShare = async () => {
    const url = `http://localhost:23274/api/files/shared/${result._id}`;
    await navigator.clipboard.writeText(url);
    toast.success("Enlace copiado correctamente");
  };
  return (
    <div className="border-b border-gray-300 pb-2 mb-2 flex flex-col gap-2 my-10 transition-all delay-2000 ease-in-out">
      <p className="text-green-800 text-lg font-semibold mb-5">
        Titulo: {result.metadata.topic}
      </p>
      <p className="text-gray-800">
        <span className="font-semibold">Objetivo General :</span>{" "}
        {result.metadata.general_target}
      </p>
      <p className="text-gray-800">
        <span className="font-semibold mr-2">Problema Cientifico:</span>{" "}
        {result.metadata.scientific_problem}
      </p>
      <div className="flex flex-col sm:flex-row  gap-2 sm:gap-8 ">
        <p className="text-gray-800">
          <span className="font-semibold mr-2">Estudiante que defiende:</span>{" "}
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
      </div>
      <div>
        <p className=" flex items-center">
          <span className="font-semibold">Tipo de Software</span>
          <span className="badge">{result.app_type}</span>
        </p>
        <p className=" flex items-center">
          <span className="font-semibold mr-2">Opinion del tutor:</span>
          <Link to={result.tutor_opinion} className="link">
            {result.tutor_opinion}
          </Link>
        </p>
        <p className=" flex items-center">
          <span className="font-semibold mr-2">Informe del Oponente:</span>
          <Link to={result.oponent_report} className="link">
            {result.oponent_report}
          </Link>
        </p>
      </div>

      <div className="text-gray-800">
        <span className="font-semibold">Tribunal:</span>{" "}
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-start">
          {result.metadata.court.map((courtMember) => {
            return (
              <div className="my-1 mr-5">
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
      </div>
      <div>
        <div className="flex items-center gap-4">
          <div>
            <span className="font-semibold">Nota</span> {result.eval}
          </div>
          <div>
            <span className="font-semibold">Fecha de la Defensa</span>{" "}
            {formatDate(result.date.toLocaleString())}
          </div>
        </div>
        <div>
          <span className="font-semibold">Fecha de la Defensa</span>
          {formatDate(result.date.toLocaleString())}
        </div>
      </div>

      <div className="flex gap-3 mt-3 justify-center md:justify-end">
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
        <div>
          <div
            onClick={hanldleShare}
            className="flex items-center btn btn-ghost hover:bg-gray-100 text-green-600 hover:text-green-800"
          >
            <span className="mr-2">Compartir </span>
            <ShareIcon className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

const DefenseSearchComponent: React.FC = () => {
  const items: CrumbItem[] = [
    { label: "Home", href: "/admin" },
    { label: "Defensas" },
  ];
  const [searchResults, setSearchResults] = useState<Defense[]>([]);
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    try {
      const { value } = e.target;

      if (value === "") {
        window.history.pushState(null, "", `${pathname}`);

        return setSearchResults([]);
      }

      window.history.pushState(null, "", `/admin/defense?query=${value}`);

      const results = (await DefenseService.searchDefenses(value, {})) || [];
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching defenses:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useDebouncedCallback(handleSearch, 400);

  // Run a search in the firts
  useEffect(() => {
    const firstParam = new URLSearchParams(location.search).get("query") || "";
    const fetchResults = async () => {
      DefenseService.searchDefenses(firstParam, {})
        .then((results) => setSearchResults(results))
        .catch(() => {
          console.log("Error loading first defenses");
        });
    };

    fetchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-screen-xl mt-4 mx-auto w-full min-h-[80vh]">
      <div className="flex justify-between items-center">
        <Breadcrumbs items={items} />
        <p className="">
          Resultados{" "}
          <span className="badge badge-neutral ml-10">
            {searchResults.length}
          </span>
        </p>
      </div>
      <div className="flex items-center w-full gap-3">
        <input
          type="text"
          placeholder="Escribe para buscar una defensa de tesis ..."
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
        <p className="mt-4 text-gray-600 font-medium">
          Ningun resultado coincide con su busqueda.
        </p>
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
