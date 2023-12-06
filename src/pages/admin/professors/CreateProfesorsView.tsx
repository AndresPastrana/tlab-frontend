import Breadcrumbs from "../../../components/shared/Breadcrumbs";
import { CrumbItem } from "../../../types";
import { CreateProfessorForm } from "../../../components/admin/profesores/CreateProfessorForm";

const CreateProfesorsView = () => {
  const items: CrumbItem[] = [
    { label: "Home", href: "/admin" },
    { label: "Personas", href: "/admin/personas" },
    { label: "Profesores", href: "/admin/personas/profesors" },
    { label: "Crear Profesor" },
  ];
  return (
    <div>
      <Breadcrumbs items={items} />
      <CreateProfessorForm />
    </div>
  );
};
export default CreateProfesorsView;
