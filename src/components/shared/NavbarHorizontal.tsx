import { ReactNode } from "react";
import UserAvatar from "./UserAvatar";

const DrawerButton = () => {
  return (
    <div className="flex-none lg:hidden">
      <label
        htmlFor="my-drawer-3"
        aria-label="open sidebar"
        className="btn  btn-ghost btn-circle hover:bg-neutral-100 justify-start"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </label>
    </div>
  );
};

const MenuBanner = () => {
  return (
    <div className="flex-1 text-xl font-medium text-green-700">
      <span className="text-2xl md:text-3xl lg:text-4xl font-extrabold">
        Tesis
      </span>
      <span className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-blue-500">
        Lab
      </span>
    </div>
  );
};
const NavbarHorizontal = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full navbar bg-base-100 p-0 m-0">
      {/* Drawer Button */}
      <DrawerButton />
      <MenuBanner />
      <div className="flex-none hidden lg:block">
        <ul className="menu menu-horizontal flex items-center">
          {/* Navbar menu content here */}
          {children}
          {/* <NavigationLinks /> */}
          <UserAvatar />
        </ul>
      </div>
    </div>
  );
};

export default NavbarHorizontal;
