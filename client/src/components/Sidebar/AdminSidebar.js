import React, { Fragment, memo, useState } from "react";
import logo from "assets/logo.png";
import { adminSidebar } from "utils/contants";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";
import icons from "utils/icons";
import path from "utils/path";
const { AiFillCaretLeft, AiFillCaretDown } = icons;

const activedStyle = "bg-main";
const notActivedStyle = "";
const AdminSidebar = () => {
  const [actived, setActived] = useState([]);
  const handleShowTab = (TabId) => {
    if (actived.some((el) => el === TabId))
      setActived((prev) => prev.filter((el) => el !== TabId));
    else setActived((prev) => [...prev, TabId]);
  };
  return (
    <div className="flex w-full flex-col py-4 bg-gray-100">
    <Link to={`/${path.HOME}`} className="flex flex-col items-center justify-center p-4 gap-2 w-full bg-white rounded-lg shadow-md hover:shadow-lg transition">
      <img src={logo} alt="logo" className="w-[200px] object-contain" />
      <span className="font-semibold text-gray-800 text-[14px]">Admin Workspace</span>
    </Link>
    
    <div className="flex flex-col mt-4">
      {adminSidebar.map((el) => (
        <Fragment key={el.id}>
          {el.type === "SINGLE" && (
            <NavLink
              className={({ isActive }) =>
                clsx(
                  isActive ? activedStyle : notActivedStyle,
                  "flex items-center gap-2 p-3 rounded-md transition hover:bg-main"
                )
              }
              to={el.path}
            >
              <span>{el.icon}</span>
              <span className="text-gray-700">{el.text}</span>
            </NavLink>
          )}
          {el.type === "PARENT" && (
            <div>
              <div
                onClick={() => handleShowTab(+el.id)}
                className="flex items-center gap-2 p-3 rounded-md hover:bg-main cursor-pointer justify-between text-gray-700"
              >
                <div className="flex items-center">
                  <span>{el.icon}</span>
                  <span>{el.text}</span>
                </div>
                {actived.some((id) => id === el.id) ? (
                  <AiFillCaretDown />
                ) : (
                  <AiFillCaretLeft />
                )}
              </div>
              {actived.some((id) => id === el.id) && (
                <div className="pl-6">
                  {el.subMenu.map((item) => (
                    <NavLink
                      key={item.text}
                      to={item.path}
                      className={({ isActive }) =>
                        clsx(
                          isActive ? activedStyle : notActivedStyle,
                          "block p-2 hover:bg-main rounded-md text-gray-600"
                        )
                      }
                    >
                      {item.text}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          )}
        </Fragment>
      ))}
    </div>
  </div>
  );
};

export default memo(AdminSidebar);
