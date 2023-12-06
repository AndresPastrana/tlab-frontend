import Breadcrumbs from "../../../components/shared/Breadcrumbs";
import SearchBar from "../../../components/shared/SearchBar";
import { CrumbItem } from "../../../types";
import { Create } from "../../../components/admin/profesores/FormsButtons";
import TableProfesors from "../../../components/admin/profesores/ProfesorTable";

const ProfesorView = () => {
  const items: CrumbItem[] = [
    { label: "Home", href: "/admin" },
    { label: "Personas", href: "/admin/personas" },
    { label: "Profesores" },
  ];
  return (
    <>
      <h1>Profesores</h1>
      <Breadcrumbs items={items} />
      <div className="flex gap-4 mt-8">
        <SearchBar placeholder="escribe para buscar a un profesor" />
        <Create
          href="/admin/personas/profesors/create"
          text="Crear nuevo profesor"
        />
      </div>
      <div>
        <TableProfesors />
      </div>
    </>
  );
};

export default ProfesorView;
