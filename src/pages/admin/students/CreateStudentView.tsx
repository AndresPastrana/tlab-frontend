import { FormCreateStudent } from "../../../components/admin/students/FormCreateStudent";
import Breadcrumbs from "../../../components/shared/Breadcrumbs";
import { CrumbItem } from "../../../types";

const CreateStudentView = () => {
  const items: CrumbItem[] = [
    { label: "Home", href: "/admin" },
    { label: "Personas", href: "/admin/personas" },
    { label: "Estudiantes", href: "/admin/personas/students" },
    { label: "Crear Estudiante" },
  ];
  return (
    <div>
      <Breadcrumbs items={items} />
      <FormCreateStudent />
    </div>
  );
};

export default CreateStudentView;
