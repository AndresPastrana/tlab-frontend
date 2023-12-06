import { Link, useLocation } from "react-router-dom";

import { FC } from "react";
import { CrumbsItems } from "../../types";

const Breadcrumbs: FC<CrumbsItems> = ({ items }) => {
  const { pathname } = useLocation();
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        {items.map(({ label, href }) => {
          const key = `${pathname}-bredcrumb-${
            href ?? "last"
          }-${label.toLowerCase()}`;

          return (
            <>
              {href && (
                <li
                  key={key}
                  className="mx-1 text-gray-800 font-medium bg-gray-100 px-3 py-1 rounded-3xl"
                >
                  <Link to={href}>{label}</Link>
                </li>
              )}
              {!href && (
                <li className="border rounded-3xl px-3 py-1 border-gray-100 btn-disabled">
                  {label}
                </li>
              )}
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
