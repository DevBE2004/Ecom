import React, { useEffect, useState, useCallback } from "react";
import { Button, InputForm, Markdown, Select, Loading } from "components";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { validate, getBase64 } from "utils/helpers";
import { toast } from "react-toastify";
import { apiCreateProduct } from "apis/product";
import { showModal } from "store/app/appSlice";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();
  const [preview, setPreview] = useState({ thumb: null, images: [] });
  const [payload, setPayload] = useState({ description: "" });
  const [invalidFields, setInvalidFields] = useState([]);
  const { categories } = useSelector((state) => state.app);

  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload]
  );

  const handlePreviewThumb = async (file) => {
    if (file) {
      if (file.type === "image/png" || file.type === "image/jpg") {
        const thumbBase64 = await getBase64(file);
        setPreview((prev) => ({ ...prev, thumb: thumbBase64 }));
      }
    }
  };

  const handlePreviewImage = async (files) => {
    const imagesPreview = [];
    for (let file of files) {
      if (file.type !== "image/png" && file.type !== "image/jpg") {
        toast.warning("File not supported");
        return;
      }
      const base64 = await getBase64(file);
      imagesPreview.push({ name: file.name, path: base64 });
    }
    setPreview((prev) => ({ ...prev, images: imagesPreview }));
  };

  useEffect(() => {
    if (watch("thumb")) handlePreviewThumb(watch("thumb")[0]);
  }, [watch("thumb")]);

  useEffect(() => {
    handlePreviewImage(watch("images"));
  }, [watch("images")]);

  const handleCreateProduct = async (data) => {
    const invalids = validate(payload, setInvalidFields);
    const finalPayload = { ...data, ...payload };
    if (invalids === 0) {
      if (data.category) {
        finalPayload.category = categories?.find(
          (el) => el._id === data.category
        )?.title;
      }
      const formData = new FormData();
      for (let [key, value] of Object.entries(finalPayload)) {
        formData.append(key, value);
      }

      if (finalPayload.thumb) formData.append("thumb", finalPayload.thumb[0]);
      if (finalPayload.images) {
        for (let image of finalPayload.images) {
          formData.append("images", image);
        }
      }

      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiCreateProduct(formData);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));

      if (response.success) {
        toast.success(response.message);
        reset();
        setPayload({ thumb: "", images: [] });
      } else {
        toast.error(response.message);
      }
    }
  };

  return (
    <div className="w-full bg-gray-100 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center text-[#c62828] mb-8">
        Create Product
      </h1>
      <form
        className="bg-white shadow-lg rounded-lg p-8"
        onSubmit={handleSubmit(handleCreateProduct)}
      >
        <InputForm
          label="Product Name"
          register={register}
          errors={errors}
          id="title"
          style="flex-1"
          fw
          validate={{ required: "This field is required" }}
          placeholder="Enter product name"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <InputForm
            label="Price"
            register={register}
            errors={errors}
            id="price"
            validate={{ required: "This field is required" }}
            placeholder="Enter product price"
            type="number"
          />
          <InputForm
            label="Quantity"
            register={register}
            errors={errors}
            id="quantity"
            validate={{ required: "This field is required" }}
            placeholder="Enter product quantity"
            type="number"
          />
          <InputForm
            label="Color"
            register={register}
            errors={errors}
            id="color"
            validate={{ required: "This field is required" }}
            placeholder="Enter product color"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Select
            label="Category"
            options={categories?.map((el) => ({
              code: el._id,
              value: el.title,
            }))}
            register={register}
            id="category"
            errors={errors}
            validate={{ required: "This field is required" }}
          />
          <Select
            label="Brand"
            options={categories
              ?.find((el) => el._id === watch("category"))
              ?.brand?.map((el) => ({ code: el, value: el }))}
            register={register}
            errors={errors}
            id="brand"
            validate={{ required: "This field is required" }}
          />
        </div>
        <Markdown
          name="description"
          changeValue={changeValue}
          label="Description"
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />
        <div className="mt-6">
          <label className="font-semibold" htmlFor="thumb">
            Upload Thumbnail
          </label>
          <input
            type="file"
            id="thumb"
            {...register("thumb", { required: "This field is required" })}
            className="mt-2 border rounded-md p-2 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#c62828] transition"
          />
          {errors["thumb"] && (
            <small className="text-xs text-red-500">
              {errors["thumb"].message}
            </small>
          )}
          {preview.thumb && (
            <div className="my-4">
              <img
                src={preview.thumb}
                alt="thumbnail"
                className="w-[200px] object-contain border border-gray-300 rounded"
              />
            </div>
          )}
        </div>
        <div className="mt-6">
          <label className="font-semibold" htmlFor="products">
            Upload Product Images
          </label>
          <input
            type="file"
            id="products"
            multiple
            {...register("images", { required: "This field is required" })}
            className="mt-2 border rounded-md p-2 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#c62828] transition"
          />
          {errors["images"] && (
            <small className="text-xs text-red-500">
              {errors["images"].message}
            </small>
          )}
          {preview.images.length > 0 && (
            <div className="my-4 flex gap-2 flex-wrap">
              {preview.images.map((el, idx) => (
                <div key={idx} className="w-fit relative">
                  <img
                    src={el.path}
                    alt="images"
                    className="w-[200px] object-contain border border-gray-300 rounded"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-center mt-6">
          <Button
            type="submit"
            className="bg-[#c62828] text-white px-6 py-2 rounded-lg hover:bg-[#a52b2b] transition"
          >
            Create New Product
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
