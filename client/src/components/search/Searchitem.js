import React, { memo, useEffect, useState } from "react";
import icons from "utils/icons";
import { colors } from "utils/contants";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { apiGetProducts } from "apis/product";
import { formatMonney } from "utils/helpers";
import useDebounce from "hooks/useDebounce";

const { AiOutlineDown } = icons;

const Searchitem = ({
  name,
  activatedClick,
  changeActivateFilter,
  type = "checkbox",
}) => {
  const [params] = useSearchParams();
  const [bestPrice, setBestPrice] = useState(null);
  const fetchProductBestPrice = async () => {
    const response = await apiGetProducts({ sort: "-price", limit: 1 });
    if (response.success) setBestPrice(response?.productDatas[0]?.price);
  };
  const [price, setPrice] = useState({
    from: "",
    to: "",
  });
  const { category } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const handleSelect = (e) => {
    const alreadyEl = selected.find((el) => el === e.target.value);
    if (alreadyEl)
      setSelected((prev) => prev.filter((el) => el !== e.target.value));
    else setSelected((prev) => [...prev, e.target.value]);
    changeActivateFilter(null);
  };
  useEffect(() => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    const queries = {};
    for (let i of param) queries[i[0]] = i[1];
    if (selected.length > 0) {
      queries.color = selected.join(",");
      queries.page = 1;
      navigate({
        pathname: `/${category}`,
        search: createSearchParams(queries).toString(),
      });
    } else delete queries.color;
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString(),
    });
  }, [selected]);

  useEffect(() => {
    if (type === "input") fetchProductBestPrice();
  }, [type]);

  useEffect(() => {
    if (price.from && price.to && price.from > price.to) {
    }
  }, [price]);
  const debouncePriceFrom = useDebounce(price.from, 500);
  const debouncePriceTo = useDebounce(price.to, 500);
  useEffect(() => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    const queries = {};
    for (let i of param) queries[i[0]] = i[1];
    if (Number(price.from) > 0) queries.from = price.from;
    else delete queries.from;
    if (Number(price.to) > 0) queries.to = price.to;
    else delete queries.to;
    queries.page = 1;
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString(),
    });
  }, [debouncePriceFrom, debouncePriceTo]);
  return (
<div
  className="relative p-4 text-sm border border-gray-300 flex justify-between items-center gap-4 cursor-pointer hover:bg-gray-100 transition duration-200 rounded-md"
  onClick={() => changeActivateFilter(name)}
>
  <span className="capitalize text-gray-800">{name}</span>
  <AiOutlineDown
    className={`transition-transform ${activatedClick === name ? "rotate-180" : ""}`}
  />

  {activatedClick === name && (
    <div className="absolute mt-2 top-full bg-white p-4 shadow-lg rounded-md z-10 w-72 border border-gray-300">
      {type === "checkbox" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">{`${selected.length} selected`}</span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                setSelected([]);
                changeActivateFilter(null);
              }}
              className="underline text-blue-600 cursor-pointer"
            >
              Reset
            </span>
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            {colors.map((el, index) => (
              <div className="flex items-center gap-2 mb-2" key={index}>
                <input
                  type="checkbox"
                  name={el}
                  id={el}
                  value={el}
                  onClick={handleSelect}
                  checked={selected.includes(el)}
                  className="cursor-pointer"
                />
                <label className="capitalize text-gray-700 cursor-pointer" htmlFor={el}>
                  {el}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
      {type === "input" && (
        <div onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">
              The highest price is {formatMonney(bestPrice)} VND. Default input value is USD.
            </span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                setPrice({ from: "", to: "" });
                changeActivateFilter(null);
              }}
              className="underline text-blue-600 cursor-pointer"
            >
              Reset
            </span>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="From" className="text-gray-700">From</label>
            <input
              min="0"
              value={price.from}
              onChange={(e) => setPrice((prev) => ({ ...prev, from: e.target.value }))}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-20"
              type="number"
              id="From"
            />
            <label htmlFor="To" className="text-gray-700">To</label>
            <input
              min="0"
              value={price.to}
              onChange={(e) => setPrice((prev) => ({ ...prev, to: e.target.value }))}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-20"
              type="number"
              id="To"
            />
          </div>
        </div>
      )}
    </div>
  )}
</div>
  );
};

export default memo(Searchitem);
