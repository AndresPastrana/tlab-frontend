import NavbarHorizontal from "../components/shared/NavbarHorizontal";
import NavbarVertical from "../components/shared/NavbarVertical";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    //TODO: Protect the admin routes here
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/*Navbar */}
        <NavbarHorizontal />
        {/* Page content here */}
        <>
          <Outlet />
        </>
      </div>
      <NavbarVertical />
    </div>
  );
};

export default AdminLayout;
