import NavbarHorizontal from "../components/shared/NavbarHorizontal";
import NavbarVertical from "../components/shared/NavbarVertical";
import { Outlet } from "react-router-dom";
import NavigationLinks from "../components/shared/NavigationLinks";
import {
  HomeModernIcon,
  UserIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ClipboardDocumentIcon,
  DocumentMagnifyingGlassIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";

const links = [
  {
    href: "/admin",
    label: "Home",
    Icon: HomeModernIcon,
  },

  {
    href: "/admin/evaluaciones",
    label: "Evaluaciones",
    Icon: ClipboardDocumentIcon,
  },

  {
    href: "/admin/courts",
    label: "Tribunales",
    Icon: UserGroupIcon,
  },

  {
    href: "/admin/proyectos",
    label: "Proyectos",
    Icon: DocumentTextIcon,
  },
  {
    href: "/admin/defense/",
    label: "Defensas",
    Icon: ShieldCheckIcon,
  },
  {
    href: "/admin/personas",
    label: "Personas",
    Icon: UserIcon,
  },
];

const AdminLayout = () => {
  return (
    //TODO: Protect the admin routes here
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/*Navbar */}
        <NavbarHorizontal>
          <NavigationLinks links={links} />
        </NavbarHorizontal>
        {/* Page content here */}
        <>
          <Outlet />
        </>
      </div>
      <NavbarVertical>
        <NavigationLinks links={links} />
      </NavbarVertical>
    </div>
  );
};

export default AdminLayout;
