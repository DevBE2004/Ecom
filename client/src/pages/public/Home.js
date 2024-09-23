import React from "react";
import {
  Sidebar,
  Banner,
  Bestseller,
  Dealdaily,
  Featureproduct,
  Customslider,
} from "components";
import { useSelector } from "react-redux";
import icons from "utils/icons";
import { Link, createSearchParams } from "react-router-dom";
import withBaseComponent from "hocs/withBaseComponent";
import Blog from "./Blog";
const { AiFillCaretRight } = icons;

const Home = ({ navigate }) => {
  const { newProduct } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.app);
  return (
    <>
    <div className="w-main flex">
      <div className="flex flex-col gap-5 w-[25%] flex-auto">
        <Sidebar />
        <Dealdaily />
      </div>
      <div className="flex flex-col gap-5 pl-5 w-[75%]">
        <Banner />
        <Bestseller />
      </div>
    </div>
  
    <div className="my-8">
      <Featureproduct />
    </div>
  
    <div className="my-8">
      <h3 className="font-bold uppercase text-2xl py-4 border-b-2 border-main">
        New Arrivals
      </h3>
      <div className="w-full text-lg gap-8 pb-4 mt-5">
        <Customslider product={newProduct} />
      </div>
    </div>
  
    <div className="my-8">
      <h3 className="font-bold uppercase text-2xl py-4 border-b-2 border-main">
        Hot Collections
      </h3>
      <div className="flex flex-wrap gap-4 mt-4">
        {categories
          ?.filter((el) => el.title !== "Camera" && el.title !== "Speaker")
          ?.map((el) => (
            <div key={el._id} className="w-[385px]">
              <div className="border flex p-4 gap-4 min-h-[202px] hover:shadow-lg transition-shadow duration-300">
                <img
                  src={el.image}
                  alt={el.title}
                  className="w-[144px] h-[129px] object-cover rounded-md"
                />
                <div className="flex-1 text-gray-700">
                  <h3 className="uppercase font-semibold">{el.title}</h3>
                  <ul className="text-sm">
                    {el?.brand?.map((br) => (
                      <li
                        key={br}
                        onClick={() =>
                          navigate({
                            pathname: `/${el?.title}`,
                            search: createSearchParams({ brand: br }).toString(),
                          })
                        }
                        className="flex gap-1 items-center text-gray-500 hover:underline cursor-pointer"
                      >
                        <AiFillCaretRight size={14} />
                        {br}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  
    <div className="my-8">
      <h3 className="font-bold uppercase text-2xl py-4 border-b-2 border-main">
        Blog Posts
      </h3>
      <Blog />
    </div>
  </>
  );
};

export default withBaseComponent(Home);
