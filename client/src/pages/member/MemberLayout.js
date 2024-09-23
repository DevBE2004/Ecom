import React, { memo } from "react";
import { Navigate, Outlet } from "react-router-dom";
import path from "utils/path";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { MemberSidebar } from "components";

const MemberLayout = () => {
  const { isLogin, current } = useSelector((state) => state.user);

  // Redirect if not logged in
  if (!isLogin || !current) {
    return <Navigate to={`/${path.HOME}`} replace={true} />;
  }

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-100">
      <div className="w-full md:w-[300px] flex-none bg-white shadow-md transition-transform duration-300 ease-in-out md:translate-x-0 md:relative">
        <MemberSidebar />
      </div>
      <div className="flex-grow p-6 bg-gray-200">
        <Outlet />
      </div>
    </div>
  );
};

export default memo(MemberLayout);
