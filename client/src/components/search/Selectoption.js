import React, { memo } from "react";

const Selectoption = ({ icon }) => {
  return (
    <div
      className="w-10 h-10 bg-white rounded-full flex justify-center items-center border border-gray-300 shadow-md 
             hover:bg-gray-800 hover:text-white cursor-pointer transition duration-200 transform 
             hover:scale-105"
    >
      {icon}
    </div>
  );
};

export default memo(Selectoption);
