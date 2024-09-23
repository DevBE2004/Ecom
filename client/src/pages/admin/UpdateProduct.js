import { Button, InputForm, Markdown, Select, Loading } from "components";
import React, { memo, useState, useEffect, useCallback } from "react";
import { set, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { validate, getBase64 } from "utils/helpers";
import { toast } from "react-toastify";
import { showModal } from "store/app/appSlice";
import { apiUpdate } from "apis/product";

const UpdateProduct = ({ editProduct, render, setEditProduct }) => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm();
  const [invalidFields, setInvalidFields] = useState([]);
  const [preview, setPreview] = useState({ thumb: null, images: [] });
  const [payload, setPayload] = useState({ description: "" });
  const { categories } = useSelector((state) => state.app);

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
          toast.warning("File not supported");
          return;
        }
        const base64 = await getBase64(file);
        imagesPreview.push(base64);
      }
      setPreview((prev) => ({ ...prev, images: imagesPreview }));
    }
  };

  const changeValue = useCallback((e) => {
    setPayload(e);
  }, []);

  const handleUpdateProduct = async (data) => {
    const invalids = validate(payload, setInvalidFields);
    if (invalids === 0) {
      const finalPayload = { ...data, ...payload, preview };
      if (finalPayload.category) finalPayload.category = data.category;
      const formData = new FormData();
      for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
      if (finalPayload?.thumb?.length > 0) formData.append("thumb", finalPayload.thumb[0]);
      if (finalPayload?.images) {
        const images = finalPayload?.thumb?.length === 0 ? preview.images : Array.from(finalPayload.images);
        for (let image of images) formData.append("images", image);
      }
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiUpdate(formData, editProduct._id);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response.success) {
        toast.success(response.message);
        render();
        setEditProduct(null);
      } else toast.error(response.message);
    }
  };

  useEffect(() => {
    reset({
      title: editProduct?.title || "",
      price: editProduct?.price || "",
      quantity: editProduct?.quantity || "",
      color: editProduct?.color || "",
      category: editProduct?.category || "",
      brand: editProduct?.brand || "",
    });
    setPayload({
      description:
        typeof editProduct?.description === "object"
          ? editProduct?.description?.join(",")
          : editProduct?.description,
    });
    setPreview({
      thumb: editProduct?.thumb || "",
      images: editProduct?.images || [],
    });
  }, [editProduct]);

  useEffect(() => {
    if (watch("thumb") instanceof FileList && watch("thumb").length > 0)
      handlePreviewThumb(watch("thumb")[0]);
  }, [watch("thumb")]);

  useEffect(() => {
    if (watch("images") instanceof FileList && watch("images").length > 0)
      handlePreviewImage(watch("images"));
  }, [watch("images")]);

  return (
    <div className="w-full flex flex-col gap-4 p-6 bg-gray-50 rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-main">Update Product</h1>
      </div>
      <form className="flex flex-col w-full" onSubmit={handleSubmit(handleUpdateProduct)}>
        <InputForm
          label="Product Name"
          register={register}
          errors={errors}
          id="title"
          style="flex-1 mb-4"
          validate={{ required: "This field is required." }}
          placeholder="Enter the name of the product"
        />
        <div className="flex gap-4 mb-4">
          <InputForm
            label="Price"
            register={register}
            errors={errors}
            id="price"
            style="flex-1"
            validate={{ required: "This field is required." }}
            placeholder="Enter the product price"
            type="number"
          />
          <InputForm
            label="Quantity"
            register={register}
            errors={errors}
            id="quantity"
            style="flex-1"
            validate={{ required: "This field is required." }}
            placeholder="Enter the quantity"
            type="number"
          />
          <InputForm
            label="Color"
            register={register}
            errors={errors}
            id="color"
            style="flex-1"
            validate={{ required: "This field is required." }}
            placeholder="Enter the color"
          />
        </div>
        <div className="flex gap-4 mb-4">
          <Select
            label="Category"
            options={categories?.map((el) => ({
              code: el.title,
              value: el.title,
            }))}
            register={register}
            id="category"
            style="flex-1"
            errors={errors}
            validate={{ required: "This field is required." }}
          />
          <Select
            label="Brand"
            options={categories
              ?.find((el) => el.title === watch("category"))
              ?.brand?.map((el) => ({ code: el, value: el }))}
            register={register}
            errors={errors}
            id="brand"
            style="flex-1"
            validate={{ required: "This field is required." }}
          />
        </div>
        <Markdown
          name="description"
          changeValue={changeValue}
          label="Description"
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          value={payload.description}
        />
        <div className="flex flex-col mb-4">
          <label className="font-semibold" htmlFor="thumb">Upload Thumbnail</label>
          <input type="file" id="thumb" {...register("thumb")} className="border rounded-md p-2" />
          {errors["thumb"] && (
            <small className="text-xs text-red-500">{errors["thumb"]?.message}</small>
          )}
        </div>
        {preview?.thumb && (
          <div className="my-4">
            <img src={preview?.thumb} alt="thumbnail" className="w-[100px] object-contain" />
          </div>
        )}
        <div className="flex flex-col mb-4">
          <label className="font-semibold" htmlFor="products">Upload Product Images</label>
          <input type="file" id="products" multiple {...register("images")} className="border rounded-md p-2" />
          {errors["images"] && (
            <small className="text-xs text-red-500">{errors["images"]?.message}</small>
          )}
        </div>
        {preview?.images.length > 0 && (
          <div className="my-4 flex gap-2">
            {preview?.images?.map((el, idx) => (
              <div key={idx} className="relative">
                <img src={el} alt="product" className="w-[100px] object-contain" />
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-center gap-4 mt-6">
          <span
            onClick={() => setEditProduct(null)}
            className="bg-gray-300 text-white rounded-md cursor-pointer h-10 w-[60px] flex items-center justify-center hover:bg-gray-400"
          >
            Cancel
          </span>
          <Button type="submit" children="Update" />
        </div>
      </form>
    </div>
  );
};

export default memo(UpdateProduct);