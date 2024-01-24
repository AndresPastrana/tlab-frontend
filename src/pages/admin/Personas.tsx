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
      <Breadcrumbs items={items} />
      <div className="flex flex-col gap-3 md:flex-row">
        <Cards />
      </div>
    </div>
  );
};

export default PagePersonas;
