import { apiAddVariants } from "apis/product";
import { InputForm, Button, Loading } from "components";
import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { showModal } from "store/app/appSlice";
import Swal from "sweetalert2";
import { getBase64 } from "utils/helpers";
const CustomizeVariants = ({ customizeVariants, setCustomizeVariants }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm();
  const [preview, setPreview] = useState({ thumb: "", images: [] });
  const dispatch = useDispatch();
  useEffect(() => {
    reset({
      title: customizeVariants?.title,
      price: customizeVariants?.price,
      color: customizeVariants?.color,
    });
  }, [customizeVariants]);

  const handlePreviewThumb = async (file) => {
    if (file) {
      if (file.type === "image/png" || file.type === "image/jpg") {
        const thumbBase64 = await getBase64(file);
        setPreview((prev) => ({ ...prev, thumb: thumbBase64 }));
      }
    } else {
      setPreview((prev) => ({ ...prev, thumb: null }));
    }
  };
  const handlePreviewImage = async (files) => {
    if (files) {
      const imagesPreview = [];
      for (let file of files) {
        if (file.type !== "image/png" && file.type !== "image/jpg") {
          toast.warning("file not supported");
          return;
        }
        const base64 = await getBase64(file);
        imagesPreview.push(base64);
      }
      setPreview((prev) => ({ ...prev, images: imagesPreview }));
    }
  };
  const handleVariants = async (data) => {
    if (data.color === customizeVariants.color) {
      Swal.fire("Thất bại", "không thể trùng màu!", "error");
      return;
    } else {
      const formData = new FormData();
      for (let i of Object.entries(data)) formData.append(i[0], i[1]);
      if (data.thumb) formData.append("thumb", data?.thumb[0]);
      if (data.images)
        for (let image of data.images) formData.append("images", image);
      // console.log(formData.get("title"));
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiAddVariants(formData, customizeVariants?._id);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response.success) {
        toast.success(response.message);
        reset();
        setPreview({ thumb: "", images: [] });
      } else toast.error(response.message);
    }
  };
  useEffect(() => {
    if (watch("thumb") instanceof FileList && watch("thumb").length > 0)
      handlePreviewThumb(watch("thumb")[0]);
  }, [watch("thumb")]);
  useEffect(() => {
    if (watch("images") instanceof FileList && watch("images").length > 0)
      handlePreviewImage(watch("images"));
  }, [watch("images")]);
  return (
    <div className="w-full flex flex-col gap-4 h-full bg-gray-50 p-4 rounded-lg shadow-md">
    <div className="flex w-full flex-col items-center justify-center text-main">
      <h1 className="text-3xl font-bold tracking-tight">Variants</h1>
    </div>
    
    <form onSubmit={handleSubmit(handleVariants)} className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex gap-4">
        <InputForm
          label="Name Original"
          register={register}
          errors={errors}
          id="title"
          style="flex-1"
          fw
          readOnly
          disabled
        />
      </div>
      
      <div className="flex mt-8 gap-4 w-full">
        <InputForm
          label="Color Product"
          register={register}
          errors={errors}
          id="color"
          style="flex-1"
          validate={{ required: "Need fill this field" }}
          fw
          placeholder="Color of new Product"
        />
        <InputForm
          label="Price Product"
          register={register}
          errors={errors}
          id="price"
          style="flex-1"
          fw
          type="number"
          validate={{ required: "Need fill this field" }}
          placeholder="Price of new Product"
        />
      </div>
      
      <div className="mt-10">
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="thumb">
            Upload Thumbnail
          </label>
          <input
            type="file"
            id="thumb"
            {...register("thumb", { required: "Need fill" })}
            className="border border-gray-300 rounded-md p-2"
          />
          {errors["thumb"] && (
            <small className="text-xs text-red-500">
              {errors["thumb"]?.message}
            </small>
          )}
        </div>
        
        {preview?.thumb && (
          <div className="my-4">
            <img
              src={preview?.thumb}
              alt="thumbnail"
              className="w-[200px] object-contain rounded-md shadow"
            />
          </div>
        )}
        
        <div className="flex flex-col gap-2 mt-6">
          <label className="font-semibold" htmlFor="products">
            Upload Images of Products
          </label>
          <input
            type="file"
            id="products"
            multiple
            {...register("images", { required: "Need fill" })}
            className="border border-gray-300 rounded-md p-2"
          />
          {errors["images"] && (
            <small className="text-xs text-red-500">
              {errors["images"]?.message}
            </small>
          )}
        </div>
        
        {preview.images.length > 0 && (
          <div className="my-4 flex w-full gap-2">
            {preview?.images?.map((el, idx) => (
              <div key={idx} className="w-fit relative">
                <img
                  src={el}
                  alt="images"
                  className="w-[200px] object-contain rounded-md shadow"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-center gap-4 mt-6">
        <span
          onClick={() => setCustomizeVariants(null)}
          className="text-white bg-red-500 rounded-md cursor-pointer h-10 w-[80px] flex items-center justify-center hover:bg-red-600 transition"
        >
          Cancel
        </span>
        <Button type={"submit"} children={"Add Variants"} />
      </div>
    </form>
  </div>
  );
};

export default memo(CustomizeVariants);
