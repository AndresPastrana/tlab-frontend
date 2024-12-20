import React from "react";
import useSWR from "swr";
import { useAuth } from "../../hooks/useAuth";
import { fetcher } from "../../utils/others";
import { BuildingLibraryIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

interface ProjectStats {
  totalProjects: number;
  defendedProjects: number;
  activeProjects: {
    total: number;
    approved: number;
    pending: number;
  };
}

const LoadingSkeleton: React.FC = () => (
  <div className="skeleton p-4 space-y-2">
    <div className="skeleton h-6 w-1/2"></div>
    <div className="skeleton h-6 w-1/3"></div>
    <div className="skeleton h-6 w-3/4"></div>
    <div className="skeleton h-6 w-2/3"></div>
    <div className="skeleton h-6 w-1/4"></div>
  </div>
);

const TesisProjectStatsComponent: React.FC = () => {
  const { token } = useAuth();
  const tk = token as string;

  const url = `${import.meta.env.VITE_API}${
    import.meta.env.VITE_PROJECT
  }/stats`;
  const { data, error, isLoading } = useSWR<ProjectStats>(
    "/api/project-stats",
    () => fetcher<ProjectStats>(url, { token: tk }),
    {
      revalidateOnFocus: false,
    }
  );

  if (error && !isLoading && !data) {
    return <div className="text-red-500">Error loading project stats</div>;
  }

  if (isLoading && !error && !data) {
    return <LoadingSkeleton />;
  }

  if (data && !isLoading && !error) {
    const { totalProjects, defendedProjects, activeProjects } = data;
    return (
      //TODO: Dashboard Section<>
      <>
        <div className="min-h-[70vh]">
          <h1 className="title">Dashboard</h1>
          <div className="card p-5 bg-base-100 shadow-xl flex flex-col gap-5">
            {/* TODO: Dashboard section titule */}
            <h1 className="text-2xl font-bold">
              Tesis de la facultad de Informatica
            </h1>

            {/* Cards Container */}
            <div className="flex flex-col justify-around md:flex-row gap-2">
              {/* TODO:  Card 1*/}
              <div className="stat w-full  sm:w-46   lg:w-3/12   p-4  bg-gray-50 rounded-lg border border-gray-100 ">
                <div className="stat-figure text-primary">
                  <BuildingLibraryIcon className="w-8 h8 text-gray-700" />
                </div>
                <div className="stat-title">Total de Tesis de la Facultad</div>
                <div className="stat-value  text-green-700">
                  {totalProjects}
                </div>
                <div className="stat-desc">Actualizado hoy</div>
              </div>

              {/* TODO:Card 2 */}
              <div className="stat w-full   sm:w-46  lg:w-5/12   p-4  bg-gray-50 rounded-lg border border-gray-100 ">
                <div className="stat-title">Tesis Activas</div>
                <div className="stat-value text-yellow-200">
                  {activeProjects.total}
                </div>

                <ul>
                  <li className="">Aprovadas: {activeProjects.approved}</li>
                  <li>Pendientes: {activeProjects.pending}</li>
                </ul>
              </div>
              {/* TODO:Card 3 */}

              <div className="stat w-full sm:w-46 lg:w-3/12 p-4  bg-gray-50 rounded-lg border border-gray-100 ">
                <Link to={"/admin/defense?query=all"}>
                  <div className="stat-title">Defensas Realizadas</div>
                  <div className="stat-value  text-blue-800">
                    {defendedProjects}
                  </div>
                  <div className="stat-desc"></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default TesisProjectStatsComponent;
