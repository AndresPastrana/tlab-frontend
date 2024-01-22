import Breadcrumbs from "../../../components/shared/Breadcrumbs";
import Proyects from "../../../components/shared/projects/Proyects";
import { CrumbItem } from "../../../types";

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
    </div>
  );
};

export default ProyectsView;
