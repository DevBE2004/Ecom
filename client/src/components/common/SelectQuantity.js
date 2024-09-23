import React, { memo } from "react";

const SelectQuantity = ({ quantity, handleQuantity,handleChangeQuantity }) => {
  return (
    <div className="flex items-center justify-center bg-gray-100 p-2 rounded-md shadow-md">
    <span 
      className="cursor-pointer p-2 border-r-2 border-black hover:bg-gray-200 transition"
      onClick={() => handleChangeQuantity('minus')}
    >
      -
    </span>
    <input
      type="text"
      className="py-2 w-[50px] text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main transition"
      value={quantity}
      onChange={(e) => handleQuantity(e.target.value)}
    />
    <span 
      className="cursor-pointer p-2 border-l-2 border-black hover:bg-gray-200 transition"
      onClick={() => handleChangeQuantity('plus')}
    >
      +
    </span>
  </div>
  );
};

export default memo(SelectQuantity);
