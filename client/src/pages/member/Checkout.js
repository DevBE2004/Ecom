import React, { memo, useEffect, useState } from "react";
import paymentGif from "assets/payment.gif";
import { useSelector } from "react-redux";
import { formatMonney } from "utils/helpers";
import Payment from "components/common/Payment";
import { Congrat } from "components";
import withBaseComponent from "hocs/withBaseComponent";
import { getUser } from "store/user/acsynAction";

const Checkout = ({ dispatch }) => {
  const { currentCart, current } = useSelector((state) => state.user);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      dispatch(getUser());
    }
  }, [isSuccess, dispatch]);

  return (
    <div className="p-8 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-10 gap-6 h-full max-h-screen overflow-y-auto">
    {isSuccess && <Congrat />}
    <div className="w-full flex justify-center items-center col-span-4">
      <img
        src={paymentGif}
        alt="Payment"
        className="h-[70%] object-contain shadow-lg rounded-lg"
      />
    </div>
    <div className="flex w-full flex-col gap-6 col-span-6 items-center">
      <h2 className="text-4xl font-bold uppercase mb-4 text-main">Checkout Your Order</h2>
      <div className="flex gap-6 w-full">
        <table className="table-auto flex-1 border-collapse border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-yellow-500">
              <th className="border border-black text-left p-3">Products</th>
              <th className="border border-black text-center p-3">Quantity</th>
              <th className="border border-black text-center p-3">Price</th>
            </tr>
          </thead>
          <tbody>
            {currentCart?.map((el) => (
              <tr key={el?._id} className="hover:bg-gray-100 transition">
                <td className="border border-black text-left p-2">{el?.title}</td>
                <td className="border border-black text-center p-2">{el?.quantity}</td>
                <td className="border border-black text-right p-2">{`${formatMonney(el?.price)} VND`}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
          <h3 className="font-semibold text-xl">Order Summary</h3>
          <div className="mt-4">
            <span className="font-semibold">Subtotal: </span>
            <span className="text-main font-bold">{`${formatMonney(currentCart?.reduce((sum, el) => sum + +el?.price * el?.quantity, 0))} VND`}</span>
          </div>
          <div className="mt-2">
            <span className="font-semibold">Address: </span>
            <span className="text-main font-bold">{current?.address}</span>
          </div>
        </div>
      </div>
      <div className="w-full mt-6">
        <Payment
          setIsSuccess={setIsSuccess}
          payload={{
            products: currentCart,
            total: Math.round(currentCart?.reduce((sum, el) => sum + +el?.price * el?.quantity, 0) / 23500),
            address: current?.address,
          }}
          amount={Math.round(currentCart?.reduce((sum, el) => sum + +el?.price * el?.quantity, 0) / 23500)}
        />
      </div>
    </div>
  </div>
  );
};

export default withBaseComponent(memo(Checkout));