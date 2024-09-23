import React, { memo } from "react";

const Countdown = ({unit, number}) => {
  return (
    <div className="w-[30%] h-[60px] flex flex-col justify-center items-center bg-gray-200 rounded-md shadow-md p-2">
    <span className="text-[18px] text-gray-800 font-semibold">{number}</span>
    <span className="text-[12px] text-gray-600">{unit}</span>
  </div>
  );
};

export default memo(Countdown);
