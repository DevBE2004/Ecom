import React, { memo } from "react";
import { formatMonney, numberToStar } from "utils/helpers";

const ProductCart = ({ img, price, title, totalRatings }) => {
  return (
    <div className="w-[30%] flex-auto mx-2 mb-5">
    <div className="border rounded-lg shadow-sm flex w-full overflow-hidden">
      <img src={img} alt={title} className="w-[120px] h-auto object-contain" />
      <div className="flex-col flex p-2">
        <span className="line-clamp-1 capitalize text-xs font-semibold text-gray-700">
          {title.toLowerCase()}
        </span>
        <span className="flex h-4 mt-1">
          {numberToStar(totalRatings)?.map((el, index) => (
            <span key={index}>{el}</span>
          ))}
        </span>
        <span className="font-bold text-lg mt-1">{`${formatMonney(price)} VND`}</span>
      </div>
    </div>
  </div>
  );
};

export default memo(ProductCart);
