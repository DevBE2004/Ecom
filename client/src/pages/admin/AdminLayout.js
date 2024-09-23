import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import path from "utils/path";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { AdminSidebar } from "components";

const AdminLayout = () => {
  const { isLogin, current } = useSelector((state) => state.user);

  // Redirect if not logged in or not an admin
  if (!isLogin || !current || +current.role !== 1) {
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-100">
      <div className="flex flex-row">
        <div className="w-[300px] flex-none bg-white shadow-lg rounded-r-lg">
          <AdminSidebar />
        </div>
        <div className="flex-grow p-6 bg-gray-50 rounded-l-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
