import Breadcrumbs from "../../components/shared/Breadcrumbs";
import Cards from "../../components/shared/Cards";
import { CrumbItem } from "../../types";

const PagePersonas = () => {
  const items: CrumbItem[] = [
    { label: "Home", href: "/admin" },
    { label: "Personas" },
  ];
  return (
    <div>
      <h2 className="text-center mt-8 mb-4 text-neutral-500">Personas</h2>
      <Breadcrumbs items={items} />
      <div className="flex flex-col gap-3">
        <Cards />
      </div>
    </div>
  );
};

export default PagePersonas;
