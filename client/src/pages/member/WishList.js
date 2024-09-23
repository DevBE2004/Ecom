import { Button, Product } from "components";
import React, { memo } from "react";
import { useSelector } from "react-redux";

const WishList = () => {
  const { current } = useSelector((state) => state.user);

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <header className="text-3xl text-center text-main font-semibold p-6 border-b-2 border-b-main">
        My Wishlist
      </header>
      <div className="p-4 flex flex-wrap justify-center w-full">
        {current?.wishlist?.length > 0 ? (
          current.wishlist.map((el) => (
            <div
              className="bg-white rounded-md shadow-md m-2 p-4 transition-transform duration-200 hover:scale-105"
              key={el?._id}
            >
              <Product pid={el._id} productData={el} normal />
            </div>
          ))
        ) : (
          <div className="text-center text-gray-700 p-4">
            <p>Your wishlist is empty!</p>
            <Button onClick={() => window.location.href = '/products'}>Browse Products</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(WishList);