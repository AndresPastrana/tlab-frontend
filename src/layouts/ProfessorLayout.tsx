import NavbarHorizontal from "../components/shared/NavbarHorizontal";
import { Outlet, useLocation } from "react-router-dom";
import NavbarVertical from "../components/shared/NavbarVertical";
import NavigationLinks from "../components/shared/NavigationLinks";
import { DocumentTextIcon, HomeModernIcon } from "@heroicons/react/24/solid";

const links = [
  {
    href: "/profesors",
    label: "Home",
    Icon: HomeModernIcon,
  },
  {
    href: "/profesors/proyectos",
    label: "Proyecto",
    Icon: DocumentTextIcon,
  },
];

const ProfessorLayout = () => {
  //TODO: Protect the admin routes here
  const { pathname } = useLocation();

  return (
    //TODO: Protect the admin routes here
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/*Navbar */}
        {pathname !== "/student" && (
          <NavbarHorizontal>
            <NavigationLinks links={links} />
          </NavbarHorizontal>
        )}

        {/* Page content here */}
        <>
          <Outlet />
        </>
      </div>
      {pathname !== "/student" && (
        <NavbarVertical>
          <NavigationLinks links={links} />
        </NavbarVertical>
      )}
    </div>
  );
};

export default ProfessorLayout;
