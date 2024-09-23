import React, { memo } from "react";
import { navigation } from "utils/contants";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="w-main h-[48px] py-2 border-y text-sm flex items-center bg-gray-50">
  {navigation.map((el, index, self) => (
    <div key={el.id} className={`flex items-center ${index !== self.length - 5 ? 'border-l-2 pl-4' : ''}`}>
      <NavLink
        to={el.path}
        className={({ isActive }) =>
          isActive
            ? "pr-12 text-main font-semibold"
            : "pr-12 hover:text-main text-gray-700"
        }
      >
        {el.value}
      </NavLink>
    </div>
  ))}
</div>
  );
};

export default memo(Navigation);
