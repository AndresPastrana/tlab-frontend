import { Create } from "../../../components/admin/profesores/FormsButtons";
import TableStudents from "../../../components/admin/students/StudenstTable";
import Breadcrumbs from "../../../components/shared/Breadcrumbs";
import SearchBar from "../../../components/shared/SearchBar";
import { CrumbItem } from "../../../types";

const StudentsView = () => {
  const items: CrumbItem[] = [
    { label: "Home", href: "/admin" },
    { label: "Personas", href: "/admin/personas" },
    { label: "Estudiantes" },
  ];
  return (
    <>
      <div className="mt-10 min-h-[80vh]">
        <Breadcrumbs items={items} />
        <div className="flex gap-4 mt-10 mb-5">
          <SearchBar placeholder="escribe para buscar a un estudiante" />
          <Create
            href="/admin/personas/students/create"
            text="Crear nuevo estudiante"
          />
        </div>
        <div>
          <TableStudents />
        </div>
      </div>
    </>
  );
};

export default StudentsView;
