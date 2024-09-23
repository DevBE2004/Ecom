import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  useParams,
  useSearchParams,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import { BreadCrumb, Product, Searchitem, Pagination } from "components";
import { apiGetProducts } from "apis/product";
import Masonry from "react-masonry-css";
import { InputSelect } from "components";
import { sortBy } from "utils/contants";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const Products = () => {
  const titleRef = useRef();
  const navigate = useNavigate();
  const [sort, setSort] = useState("");
  const [product, setProduct] = useState(null);
  const [params] = useSearchParams();
  const { category } = useParams();
  const fetchProductByCategory = async (queries) => {
    const response = await apiGetProducts({ ...queries, category });
    if (response?.success) setProduct(response);
  };
  const fetchProduct = async (queries) => {
    const response = await apiGetProducts(queries);
    if (response?.success) setProduct(response);
  };
  useEffect(() => {
    const query = Object.fromEntries([...params]);
    let priceQuery = {};
    if (query.to && query.from) {
      priceQuery = {
        $and: [{ price: { gte: query.from } }, { price: { lte: query.to } }],
      };
      delete query.price;
    } else {
      if (query.from) query.price = { gte: query.from };
      if (query.to) query.price = { lte: query.to };
    }
    delete query.to;
    delete query.from;
    const q = { ...query, ...priceQuery };
    if (category === ":category") fetchProduct(q);
    else fetchProductByCategory(q);

    titleRef?.current?.scrollIntoView({ block: "center" });
  }, [params]);
  const [activatedClick, setActivatedClick] = useState(null);
  const changeActivateFilter = useCallback(
    (name) => {
      if (activatedClick === name) setActivatedClick(null);
      else setActivatedClick(name);
    },
    [activatedClick]
  );
  const changeValue = useCallback(
    (value) => {
      setSort(value);
    },
    [sort]
  );
  useEffect(() => {
    if (sort)
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({ sort: sort }).toString(),
      });
  }, [sort]);
  return (
    <div className="w-full" ref={titleRef}>
    <div className="flex flex-col items-center mt-4">
      <h2 className="bg-gray-100 font-semibold text-2xl p-4 rounded shadow">
        {category.replace(":", "")?.toUpperCase()}
      </h2>
      <BreadCrumb category={category.replace(":", "")} />
    </div>
  
    <div className="flex justify-between items-center mt-8">
      <div className="w-4/5 border flex flex-col h-[123px] p-4 rounded shadow">
        <span className="font-semibold text-lg opacity-80">Filter by</span>
        <div className="flex gap-4 mt-2 items-center">
          <Searchitem
            name="price"
            activatedClick={activatedClick}
            changeActivateFilter={changeActivateFilter}
            type="input"
          />
          <Searchitem
            name="color"
            activatedClick={activatedClick}
            changeActivateFilter={changeActivateFilter}
          />
        </div>
      </div>
  
      <div className="w-1/5 border p-4 h-[123px] rounded shadow">
        <span className="font-semibold text-lg opacity-80">Sort By</span>
        <div className="w-full mt-2">
          <InputSelect
            value={sort}
            changeValue={changeValue}
            options={sortBy}
          />
        </div>
      </div>
    </div>
  
    <div className="mt-8">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {product?.productDatas?.map((el) => (
          <Product key={el._id} productData={el} normal={true} />
        ))}
      </Masonry>
    </div>
  
    <div className="w-full flex justify-end my-4">
      <Pagination totalProductCount={product?.counts} />
    </div>
  
    <div className="h-[100px]"></div>
  </div>
  );
};

export default Products;
