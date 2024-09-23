import React, { memo } from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from "react-router-dom";
import icons from "utils/icons";
import { capitalizedStr } from "utils/helpers";

const { AiFillCaretRight } = icons;

const BreadCrumb = ({ title, category }) => {
  const routes = [
    { path: "/:category/:pid/:title", breadcrumb: title },
    { path: "/:category", breadcrumb: capitalizedStr(category) },
    { path: "/", breadcrumb: "HOME" },
  ];
  const breadcrumbs = useBreadcrumbs(routes);
  return (
    <div className="flex bg-gray-100 p-2 gap-1">
  {breadcrumbs
    ?.filter((el) => !el.match.route === false)
    .map(({ match, breadcrumb }, index, self) => (
      <Link key={match.pathname} to={match.pathname} className="flex items-center text-xs hover:text-main">
        <span className="flex items-center gap-1">
          {breadcrumb}
          {index !== self.length - 1 && <AiFillCaretRight />}
        </span>
      </Link>
    ))}
</div>
  );
};

export default memo(BreadCrumb);
