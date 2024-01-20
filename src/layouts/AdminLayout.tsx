import NavbarHorizontal from "../components/shared/NavbarHorizontal";
import NavbarVertical from "../components/shared/NavbarVertical";
import { Outlet } from "react-router-dom";
import NavigationLinks from "../components/shared/NavigationLinks";
import Nav from "../nav";

const AdminLayout = () => {
  return (
    //TODO: Protect the admin routes here
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/*Navbar */}
        <NavbarHorizontal>
          <NavigationLinks links={Nav.adminOptions} />
        </NavbarHorizontal>
        {/* Page content here */}
        <>
          <Outlet />
        </>
      </div>
      <NavbarVertical>
        <NavigationLinks links={Nav.adminOptions} />
      </NavbarVertical>
    </div>
  );
};

export default AdminLayout;
