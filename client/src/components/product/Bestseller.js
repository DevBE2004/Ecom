import React, { memo, useEffect, useState } from "react";
import { apiGetProducts } from "apis/product";
import { Customslider } from "..";
import { getNewProduct } from "store/product/acsynAction";
import { useDispatch, useSelector } from "react-redux";

const tabs = [
  { id: 1, name: "BEST SELLER" },
  { id: 2, name: "NEW ARRIVALS" },
];

const Bestseller = () => {
  const [bestSellers, setBestSellers] = useState(null);
  const [activedTab, setActivedTab] = useState(1);
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const { newProduct } = useSelector((state) => state.product);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await apiGetProducts({ sort: "-sold" });
      if (response?.success) {
        setBestSellers(response.productDatas);
        setProduct(response.productDatas);
      }
    };

    fetchProducts();
    dispatch(getNewProduct());
  }, [dispatch]);

  useEffect(() => {
    if (activedTab === 1) setProduct(bestSellers);
    if (activedTab === 2) setProduct(newProduct);
  }, [activedTab, newProduct, bestSellers]);

  return (
<div className="p-4">
  <div className="flex text-[20px] gap-8 pb-4 border-b-2 border-main">
    {tabs.map((el) => (
      <span
        key={el.id}
        className={`font-semibold cursor-pointer ${
          activedTab === el.id ? "text-gray-800 border-b-2 border-main" : "text-gray-400"
        }`}
        onClick={() => setActivedTab(el.id)}
      >
        {el.name}
      </span>
    ))}
  </div>
  
  <div className="mt-4 w-full">
    <Customslider product={product} activedTab={activedTab} />
  </div>

  <div className="flex justify-between items-center w-full mt-8 gap-4">
    <img
      src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
      alt="Banner 1"
      className="flex-1 rounded-lg shadow-md object-cover"
    />
    <img
      src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657"
      alt="Banner 2"
      className="flex-1 rounded-lg shadow-md object-cover"
    />
  </div>
</div>
  );
};

export default memo(Bestseller);
