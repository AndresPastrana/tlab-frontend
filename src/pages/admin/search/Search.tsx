import Breadcrumbs from "../../../components/shared/Breadcrumbs";
import { CrumbItem } from "../../../types";

const Search = () => {
  const items: CrumbItem[] = [
    { label: "Home", href: "/admin" },
    { label: "Search" },
  ];
  return (
    <div>
      <Breadcrumbs items={items} />
    </div>
  );
};

export default Search;
