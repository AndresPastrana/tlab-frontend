import { ReactNode } from "react";

const OvrelayLayer = () => {
  return (
    <label
      htmlFor="my-drawer-3"
      aria-label="close sidebar"
      className="drawer-overlay"
    ></label>
  );
};

const Sidemenu = ({ children }: { children: ReactNode }) => {
  return (
    <ul className="menu p-4 w-80 min-h-full bg-base-200">
      {/* Sidebar content here */}
      {children}
    </ul>
  );
};

const NavbarVertical = ({ children }: { children: ReactNode }) => {
  return (
    <div className="drawer-side">
      <OvrelayLayer />
      <Sidemenu>{children}</Sidemenu>
    </div>
  );
};

export default NavbarVertical;
