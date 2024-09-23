import SelectQuantity from "components/common/SelectQuantity";
import withBaseComponent from "hocs/withBaseComponent";
import React, { memo, useEffect, useState } from "react";
import { formatMonney } from "utils/helpers";
import { updateCart } from "store/user/userSlice";

const OrderItem = ({ el, defautQuantity = 1, dispatch }) => {
  const [quantity, setQuantity] = useState(() => defautQuantity);
  const handleQuantity = (number) => {
    if (+number > 0) setQuantity(number);
  };
  const handleChangeQuantity = (flag) => {
    if (flag === "minus" && quantity === 0) return;
    if (flag === "minus") setQuantity((prev) => +prev - 1);
    if (flag === "plus") setQuantity((prev) => +prev + 1);
  };
  useEffect(() => {
    dispatch(updateCart({ pid: el?.product?._id, quantity, color: el?.color }));
  }, [quantity]);
  return (
    <div className="font-semibold flex items-center py-2 border-b border-gray-300">
    <span className="w-3/6 flex items-center text-center">
      <img src={el?.thumbnail} className="w-[50px] h-[100px] object-cover rounded-md" alt={el?.title} />
      <div className="ml-2">
        <span className="line-clamp-1 text-left">{el?.title}</span>
        <span className="line-clamp-1 text-center font-main text-gray-600">
          {el?.color}
        </span>
      </div>
    </span>
    
    <span className="w-1/6 text-center">
      <div className="flex items-center justify-center h-full">
        <SelectQuantity
          quantity={quantity}
          handleQuantity={handleQuantity}
          handleChangeQuantity={handleChangeQuantity}
        />
      </div>
    </span>
    
    <span className="w-2/6 text-center flex items-center justify-center">
      <span className="text-lg font-bold text-gray-800">{`${formatMonney(el?.price * quantity)} VND`}</span>
    </span>
  </div>
  );
};

export default withBaseComponent(memo(OrderItem));
