import {
  HomeModernIcon,
  // CalendarDaysIcon,
  // BookOpenIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

const NavigationLinks = () => {
  const links = [
    {
      href: "/admin",
      label: "Home",
      Icon: HomeModernIcon,
    },

    {
      href: "/admin/personas",
      label: "Personas",
      Icon: UserGroupIcon,
    },
  ];

  return (
    <>
      {links.map((link) => {
        const { href, label, Icon } = link;

        return (
          <Link
            target={`${href === "/repository/search" ? "_blank" : "_self"}`}
            to={href}
            className="flex py-3 px-2 rounded-lg  gap-2  hover:bg-neutral-200 lg:px-4 lg:py-2 lg:hover:text-accent-focus"
            key={`link-${href}`}
          >
            <Icon className="w-5 h-5" />
            <p>{label}</p>
          </Link>
        );
      })}
    </>
  );
};

export default NavigationLinks;
