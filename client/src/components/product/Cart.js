import { apiRemoveCart } from "apis/user";
import Button from "components/buttons/Button";
import withBaseComponent from "hocs/withBaseComponent";
import React, { memo } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { showCart } from "store/app/appSlice";
import { getUser } from "store/user/acsynAction";
import { formatMonney } from "utils/helpers";
import icons from "utils/icons";
import path from "utils/path";
const { AiFillDelete } = icons;

const Cart = ({ dispatch, navigate }) => {
  const { currentCart } = useSelector((state) => state.user);
  const removeCart = async (pid, color) => {
    const response = await apiRemoveCart(pid, color);
    if (response.success) dispatch(getUser());
    else toast.error(response.message);
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="p-4 w-[370px] bg-black grid grid-rows-[auto,1fr,auto] text-white h-full rounded-lg shadow-lg"
    >
      <header className="flex items-center justify-between border-b font-semibold text-2xl uppercase py-2">
        <span>Your Cart</span>
        <AiFillCloseSquare
          onClick={() => dispatch(showCart())}
          size={30}
          className="cursor-pointer hover:text-gray-400"
        />
      </header>

      <section className="overflow-y-auto mt-2">
        {!currentCart?.length ? (
          <span className="text-xs italic py-4">Không có sản phẩm nào cả!</span>
        ) : (
          currentCart.map((el) => (
            <div
              key={el?._id}
              className="flex gap-2 items-center border-b py-3"
            >
              <img
                src={el?.thumbnail}
                className="w-[80px] h-[92.8px] object-cover rounded-md"
              />
              <div className="flex-1">
                <span className="line-clamp-1">{el?.title}</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="line-clamp-1">Color: {el?.color}</span>
                  <span
                    onClick={() => removeCart(el?.product?._id, el?.color)}
                    className="h-5 w-5 cursor-pointer hover:bg-gray-700 flex items-center justify-center rounded-full hover:text-white"
                  >
                    <AiFillDelete size={16} />
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span>Quantity: {el?.quantity}</span>
                  <span className="font-semibold">{`${formatMonney(
                    el?.price
                  )} VND`}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </section>

      <div className="h-full text-center mt-4">
        <div className="flex justify-between items-center font-semibold">
          <span>Subtotal: </span>
          <span>{`${formatMonney(
            currentCart?.reduce(
              (sum, el) => sum + Number(el?.price * el?.quantity),
              0
            )
          )} VND`}</span>
        </div>
        <span className="italic text-gray-500 mt-1">
          Shipping, taxes, and discounts calculated at checkout.
        </span>
        <div
          onClick={() => {
            dispatch(showCart());
            navigate(`/${path.MEMBER}/${path.MYCART}`);
          }}
          className="mt-4"
        >
          <Button children="SHOPPING CART" fw />
        </div>
      </div>
    </div>
  );
};

export default withBaseComponent(memo(Cart));
