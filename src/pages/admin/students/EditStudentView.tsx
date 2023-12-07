import Breadcrumbs from "../../../components/shared/Breadcrumbs";
import { CrumbItem } from "../../../types";
import { EditStudentsForm } from "../../../components/admin/students/EditStudentsForm";

const CreateProfesorsView = () => {
  const items: CrumbItem[] = [
    { label: "Home", href: "/admin" },
    { label: "Personas", href: "/admin/personas" },
    { label: "Estudiantes", href: "/admin/personas/students" },
    { label: "Editar Estudiante" },
  ];
  return (
    <div>
      <Breadcrumbs items={items} />
      <EditStudentsForm />
    </div>
  );
};
export default CreateProfesorsView;
