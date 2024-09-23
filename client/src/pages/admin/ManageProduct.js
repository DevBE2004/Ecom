import { apiGetProducts } from "apis/product";
import { InputForm, Pagination, CustomizeVariants } from "components";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { apiDelete } from "apis/product";
import { useForm } from "react-hook-form";
import { formatMonney } from "utils/helpers";
import {
  useSearchParams,
  createSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import useDebounce from "hooks/useDebounce";
import UpdateProduct from "./UpdateProduct";
import icons from "utils/icons";

const { AiFillDelete, RxUpdate, MdOutlineDashboardCustomize } = icons;

const ManageProduct = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useForm();

  const [editProduct, setEditProduct] = useState(null);
  const [update, setUpdate] = useState(false);
  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState([]);
  const [count, setCount] = useState(0);
  const [customizeVariants, setCustomizeVariants] = useState(null);

  const fetchProduct = async (param) => {
    const response = await apiGetProducts({
      ...param,
      limit: process.env.REACT_APP_LIMIT,
    });
    if (response.success) {
      setProduct(response.productDatas);
      setCount(response.counts);
    }
  };

  const [params] = useSearchParams();
  const currentPage = +params.get("page");
  const queryDebounce = useDebounce(watch("q"), 800);

  const handleDelete = (pid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Bạn có muốn xóa không?",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDelete(pid);
        if (response.success) {
          toast.success(response.message);
          render();
        } else {
          toast.error(response.message);
        }
      }
    });
  };

  useEffect(() => {
    if (queryDebounce) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ q: queryDebounce }).toString(),
      });
    } else {
      navigate({
        pathname: location.pathname,
      });
    }
  }, [queryDebounce, navigate, location.pathname]);

  useEffect(() => {
    const searchParams = Object.fromEntries([...params]);
    fetchProduct(searchParams);
  }, [params, update]);

  return (
    <div className="w-full flex flex-col relative h-full bg-gray-100">
      {/* Update Product Modal */}
      {editProduct && (
        <div className="bg-gray-200 absolute inset-0 h-full z-10">
          <UpdateProduct
            editProduct={editProduct}
            render={render}
            setEditProduct={setEditProduct}
          />
        </div>
      )}

      {/* Customize Variants Modal */}
      {customizeVariants && (
        <div className="bg-gray-200 absolute inset-0 h-full z-10">
          <CustomizeVariants
            customizeVariants={customizeVariants}
            setCustomizeVariants={setCustomizeVariants}
          />
        </div>
      )}

      {/* Header */}
      <div className="w-full flex items-center justify-center text-main py-4">
        <h1 className="text-4xl font-bold">Manage Products</h1>
      </div>

      {/* Search Form */}
      <div className="p-4 flex w-full justify-end items-center">
        <form>
          <input
            id="q"
            name="q"
            {...register("q")}
            placeholder="Search Product..."
            className={`border rounded-md p-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[#c62828] transition ${
              errors.q ? "border-red-500" : "border-gray-300"
            }`}
          />
        </form>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-main text-white uppercase text-xs">
              {[
                "#",
                "Thumb",
                "Title",
                "Brand",
                "Category",
                "Price",
                "Qty",
                "Sold",
                "Rating",
                "Variants",
                "Color",
                "Updated",
                "Actions",
              ].map((header, index) => (
                <th key={index} className="p-2">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {product?.map((el, idx) => (
              <tr key={el._id} className="border-b hover:bg-gray-50 transition">
                <td className="text-center p-2">
                  {currentPage
                    ? (currentPage - 1) * process.env.REACT_APP_LIMIT + idx + 1
                    : idx + 1}
                </td>
                <td className="flex items-center justify-center p-2">
                  <img
                    src={el.thumb}
                    alt="thumb"
                    className="w-10 h-12 object-contain"
                  />
                </td>
                <td className="text-center p-2">{el.title}</td>
                <td className="text-center p-2">{el.brand}</td>
                <td className="text-center p-2">{el.category}</td>
                <td className="text-center p-2">{`${formatMonney(
                  el.price
                )} VND`}</td>
                <td className="text-center p-2">{el.quantity}</td>
                <td className="text-center p-2">{el.sold}</td>
                <td className="text-center p-2">{el.totalRatings}</td>
                <td className="text-center p-2">{el?.variants.length || 0}</td>
                <td className="text-center p-2">{el.color}</td>
                <td className="text-center p-2">
                  {moment(el.createdAt).format("DD/MM/YY")}
                </td>
                <td
                  onClick={() => setEditProduct(el)}
                  className="text-blue-400 hover:text-orange-500 hover:underline cursor-pointer text-center p-2"
                >
                  <RxUpdate />
                </td>
                <td
                  onClick={() => handleDelete(el._id)}
                  className="text-blue-400 hover:text-orange-500 hover:underline cursor-pointer text-center p-2"
                >
                  <AiFillDelete />
                </td>
                <td
                  onClick={() => setCustomizeVariants(el)}
                  className="text-blue-400 hover:text-orange-500 hover:underline cursor-pointer text-center p-2"
                >
                  <MdOutlineDashboardCustomize />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end w-full p-4">
        <Pagination totalProductCount={count} />
      </div>
    </div>
  );
};

export default ManageProduct;
