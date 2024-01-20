import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/shared/Breadcrumbs";
import Proyects from "../../../components/shared/projects/Proyects";
import { CrumbItem } from "../../../types";
import { ReusableButton } from "../evaluaciones/Evaluaciones";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";

const ProyectsView = () => {
  const items: CrumbItem[] = [
    { label: "Home", href: "/admin" },
    { label: "Proyectos" },
  ];
  return (
    <div className="min-h-[80vh]">
      <Breadcrumbs items={items} />
      {/* List all proyects */}
      <Proyects />
      <Link to="/admin/proyectos/create">
        <ReusableButton
          buttonText="Crear nuevo proyecto"
          onClick={() => {}}
          Icon={<ArrowUpRightIcon className="text-gray-50 w-4 h-4" />}
        />
      </Link>
    </div>
  );
};

export default ProyectsView;
