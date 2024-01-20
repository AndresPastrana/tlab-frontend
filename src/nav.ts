import {
  HomeModernIcon,
  ClipboardDocumentIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

const adminOptions = [
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

const Nav = {
  adminOptions,
};

export default Nav;
