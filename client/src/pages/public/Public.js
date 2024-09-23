import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Navigation, Footer, Topheader } from "components";

const Public = () => {
  return (
    <div className="w-full max-h-screen flex flex-col items-center overflow-y-auto">
      <Topheader />
      <Header />
      <Navigation />
      <div className="w-main flex-1 p-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Public;
