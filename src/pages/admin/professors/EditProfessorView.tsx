import Breadcrumbs from "../../../components/shared/Breadcrumbs";
import { CrumbItem } from "../../../types";
import { EditProfesorForm } from "../../../components/admin/profesores/EditProfesorForm";

const CreateProfesorsView = () => {
  const items: CrumbItem[] = [
    { label: "Home", href: "/admin" },
    { label: "Personas", href: "/admin/personas" },
    { label: "Profesores", href: "/admin/personas/profesors" },
    { label: "Editar Profesor" },
  ];
  return (
    <div>
      <Breadcrumbs items={items} />
      <EditProfesorForm />
    </div>
  );
};
export default CreateProfesorsView;
