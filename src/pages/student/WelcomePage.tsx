import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const WelcomePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col justify-center items-center p-8">
      <h1 className="text-4xl font-semibold mb-4">¡Hola, {user?.username}!</h1>
      <div className="text-xl font-semibold text-green-700 mb-8">
        <span className="text-gray-800 mr-2">Bienvenido a </span>
        <span className="text-green-900">Tesis Lab</span>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <Link
          to="/student/proyecto"
          className="btn btn-link text-green-800 transition duration-300 shadow-xl"
        >
          Ver Proyecto
        </Link>
        <Link
          to="/student/evaluaciones"
          className="btn btn-link text-green-800 transition duration-300 shadow-xl"
        >
          Gestionar Evaluaciones
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
