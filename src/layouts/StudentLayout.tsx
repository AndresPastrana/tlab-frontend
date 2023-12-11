import NavbarHorizontal from "../components/shared/NavbarHorizontal";
import { Outlet } from "react-router-dom";
import NavbarVertical from "../components/shared/NavbarVertical";
import NavigationLinks from "../components/shared/NavigationLinks";
import { HomeModernIcon } from "@heroicons/react/24/solid";

const links = [
  {
    href: "/student",
    label: "Home",
    Icon: HomeModernIcon,
  },
];

const StudentLayout = () => {
  //TODO: Protect the admin routes here

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

export default StudentLayout;
