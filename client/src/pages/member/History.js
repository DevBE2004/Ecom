import { apiGetUserOrder } from "apis/product";
import { CustomSelect, InputForm, Pagination } from "components";
import withBaseComponent from "hocs/withBaseComponent";
import moment from "moment";
import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { statusOptions } from "utils/contants";

const History = ({ navigate, location }) => {
  const [order, setOrder] = useState(null);
  const { register, formState: { errors }, watch } = useForm();
  const [count, setCount] = useState(0);
  const q = watch("q");
  const status = watch("status");

  const fetchOrder = async (param) => {
    const response = await apiGetUserOrder({
      ...param,
      limit: process.env.REACT_APP_LIMIT,
    });
    if (response.success) {
      setOrder(response?.order);
      setCount(response?.counts);
    }
  };

  const [params] = useSearchParams();
  const currentpage = +params.get("page");

  useEffect(() => {
    const pr = Object.fromEntries([...params]);
    fetchOrder(pr);
  }, [params]);

  const handleSearchStatus = ({ value }) => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams({ status: value }).toString(),
    });
  };

  return (
    <div className="w-full">
    <header className="text-4xl text-center text-main font-semibold p-6 border-b-4 border-b-main">
      Personal Orders
    </header>
    <div className="p-6 flex justify-between items-center bg-gray-50 rounded-lg shadow-md">
      <form className="w-full flex gap-4">
        <InputForm
          register={register}
          errors={errors}
          id="q"
          fw
          placeholder="Search order by status..."
          className="flex-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-main"
        />
        <CustomSelect
          options={statusOptions}
          value={status}
          onChange={handleSearchStatus}
          wrapClassname="flex-none w-1/3"
        />
      </form>
    </div>
    <div className="w-full my-10 overflow-x-auto">
      <table className="table-auto w-full border-collapse shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-main text-white">
          <tr>
            <th className="p-4">No.</th>
            <th className="p-4">Products</th>
            <th className="p-4">Total</th>
            <th className="p-4">Status</th>
            <th className="p-4">Created At</th>
          </tr>
        </thead>
        <tbody>
          {order?.map((el, idx) => (
            <tr key={el._id} className="border-b hover:bg-gray-100 transition">
              <td className="p-4 text-center">{currentpage ? (currentpage - 1) * process.env.REACT_APP_LIMIT + idx + 1 : idx + 1}</td>
              <td className="p-4">
                <div className="flex flex-col">
                  {el?.products?.map((item) => (
                    <div className="flex items-center mb-2" key={item._id}>
                      <img src={item?.thumbnail} className="w-10 h-10 mr-2 rounded" alt="thumb" />
                      <div className="flex flex-col">
                        <span className="font-semibold">{`${item?.title} - ${item?.color}`}</span>
                        <span className="text-sm text-gray-600">Quantity: {item?.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </td>
              <td className="p-4 text-center font-bold">{el?.total + " 💲"}</td>
              <td className="p-4 text-center">{el?.status}</td>
              <td className="p-4 text-center">{moment(el?.createdAt).format("DD/MM/YYYY")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="flex justify-end w-full">
      <Pagination totalProductCount={count} />
    </div>
  </div>
  );
};

export default withBaseComponent(memo(History));