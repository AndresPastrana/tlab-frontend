import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { ProfessorService } from "../../services/ProfessorsService";
import { PopulatedCourt, Profesor } from "../../types";

interface ProfessorStats {
  totalProyectos: number;
  proyectosAprobados: number;
}

const LoadingSpinner: React.FC = () => (
  <div className="loading-spinner">Loading...</div>
);

const ErrorDisplay: React.FC<{ error: string }> = ({ error }) => (
  <p className="text-red-500">Error: {error}</p>
);

const ProfessorStatsCard: React.FC = () => {
  const [stats, setStats] = useState<ProfessorStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchProfessorStats = async () => {
      try {
        const data = await ProfessorService.getProfessorStats(token as string);
        setStats(data);
      } catch (error) {
        setError(`Unable to fetch professor stats: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessorStats();
  }, [token]);

  return (
    <div className="dashboard-card bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Professor Stats</h3>
      {loading && <LoadingSpinner />}
      {error && <ErrorDisplay error={error} />}
      {stats && (
        <div>
          <p className="text-gray-700">
            Total Projects: {stats.totalProyectos}
          </p>
          <p className="text-gray-700">
            Approved Projects: {stats.proyectosAprobados}
          </p>
        </div>
      )}
    </div>
  );
};

const ProfesorInfo: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [professorInfo, setProfessorInfo] = useState<null | Profesor>(null);
  const [courtInfo, setCourtInfo] = useState<null | PopulatedCourt>(null);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ProfessorService.getCourtByProfessorId(
          token as string
        );
        setProfessorInfo(data.professor);
        setCourtInfo(data.court);
      } catch (error) {
        setError(`Unable to fetch court data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="dashboard-card bg-white p-4 rounded-lg shadow-md">
      {loading && <LoadingSpinner />}
      {!loading && professorInfo && courtInfo && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Professor Information</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold mb-4">
                Información de {professorInfo.name}
              </h1>
              <p className="text-gray-700">
                <strong>ID:</strong> {professorInfo.id}
              </p>
              <p className="text-gray-700">
                <strong>CI:</strong> {professorInfo.ci}
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">
                Información del Tribunal
              </h2>
              <p className="text-gray-700">
                <strong>Nombre del Tribunal:</strong> {courtInfo.name}
              </p>

              <h3 className="text-lg font-bold mt-4 mb-2">
                Miembros del Tribunal
              </h3>
              {courtInfo.members.map(({ _id, role, profesor }) => (
                <div key={_id} className="mb-2">
                  <p className="text-gray-700">
                    <strong>Rol:</strong> {role}
                  </p>
                  <p className="text-gray-700">
                    <strong>ID del Miembro:</strong> {profesor.id}
                  </p>
                  <p className="text-gray-700">
                    <strong>Nombre del Miembro:</strong> {profesor.name}{" "}
                    {profesor.lastname}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {error && <ErrorDisplay error={error} />}
    </div>
  );
};

const Home: React.FC = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
    <ProfesorInfo />
    <ProfessorStatsCard />
  </div>
);

export default Home;
