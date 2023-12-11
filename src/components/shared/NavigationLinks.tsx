import React from "react";
import { Link } from "react-router-dom";

import { DocumentTextIcon } from "@heroicons/react/24/solid";
interface NavigationLink {
  href: string;
  label: string;
  Icon: typeof DocumentTextIcon;
}

interface NavigationLinksProps {
  links: NavigationLink[];
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({ links }) => {
  return (
    <>
      {links.map((link) => {
        const { href, label, Icon } = link;

        return (
          <Link
            target={`${href === "/repository/search" ? "_blank" : "_self"}`}
            to={href}
            className="flex py-3 px-2 rounded-lg gap-2 hover:bg-neutral-200 lg:px-4 lg:py-2 lg:hover:text-accent-focus"
            key={`link-${href}`}
          >
            <Icon className="w-5 -h-5" />
            <p>{label}</p>
          </Link>
        );
      })}
    </>
  );
};

export default NavigationLinks;
