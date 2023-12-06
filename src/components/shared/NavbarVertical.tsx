import NavigationLinks from "./NavigationLinks";
const OvrelayLayer = () => {
  return (
    <label
      htmlFor="my-drawer-3"
      aria-label="close sidebar"
      className="drawer-overlay"
    ></label>
  );
};

const Sidemenu = () => {
  return (
    <ul className="menu p-4 w-80 min-h-full bg-base-200">
      {/* Sidebar content here */}
      <NavigationLinks />
    </ul>
  );
};

const NavbarVertical = () => {
  return (
    <div className="drawer-side">
      <OvrelayLayer />
      <Sidemenu />
    </div>
  );
};

export default NavbarVertical;
