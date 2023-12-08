import CourtsGrid from "../../../components/admin/courts/CourtGrid";
import Breadcrumbs from "../../../components/shared/Breadcrumbs";
import { CrumbItem } from "../../../types";

const CourtsView = () => {
  const items: CrumbItem[] = [
    { label: "Home", href: "/admin" },
    { label: "Tribunales" },
  ];
  return (
    <div>
      <Breadcrumbs items={items} />
      <CourtsGrid />
    </div>
  );
};

export default CourtsView;
