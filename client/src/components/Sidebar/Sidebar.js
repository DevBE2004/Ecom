import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { createSlug } from "utils/helpers";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { categories } = useSelector((state) => state.app);
  return (
    <div className="flex flex-col border border-gray-200 rounded-lg shadow-md">
      {categories?.map((el) => (
        <NavLink
          key={createSlug(el.title)}
          to={`/${createSlug(el.title)}`}
          className={({ isActive }) =>
            `flex items-center px-5 pt-4 pb-3 text-sm transition duration-200 ${
              isActive
                ? "bg-main text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          {el.title}
        </NavLink>
      ))}
    </div>
  );
};

export default memo(Sidebar);
