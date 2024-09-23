import React, { useCallback, useEffect, useRef, useState } from "react";
import { createSearchParams, useParams } from "react-router-dom";
import { apiGetProduct, apiGetProducts } from "apis/product";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import {
  BreadCrumb,
  Button,
  SelectQuantity,
  ProductExtraItem,
  ProductInfomation,
  Customslider,
} from "components";
import ReactImageMagnify from "react-image-magnify";
import Slider from "react-slick";
import { formatMonney, numberToStar } from "utils/helpers";
import { productExtraInfomation } from "utils/contants";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { apiUpdateCart } from "apis/user";
import withBaseComponent from "hocs/withBaseComponent";
import path from "utils/path";
import { getUser } from "store/user/acsynAction";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const DetalProduct = ({ isQuickView, data, location, dispatch, navigate }) => {
  const [currentImage, setCurrentImage] = useState(null);
  const titleRef = useRef();
  const [quantity, setQuantity] = useState(1);
  const { current } = useSelector((state) => state.user);
  const [variants, setVariants] = useState(null);
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [pid, setPid] = useState(null);
  const [currentProduct, setCurrentProduct] = useState({
    thumb: "",
    title: "",
    images: [],
    price: "",
    color: "",
  });
  const [relatedProduct, setRelatedProduct] = useState(null);
  const [updated, setUpdated] = useState(false);
  const fetchproduct = async () => {
    const response = await apiGetProduct(pid);
    if (response?.success) {
      setProduct(response?.productData);
      setCurrentImage(response?.productData?.thumb);
    }
  };
  const fetchProducts = async () => {
    const response = await apiGetProducts({ category: params.category });
    if (response?.success) setRelatedProduct(response?.productDatas);
  };
  const handleQuantity = useCallback(
    (number) => {
      if (!Number(number) || Number(number) < 1) return;
      else setQuantity(number);
    },
    [quantity]
  );
  const handleChangeQuantity = useCallback(
    (flag) => {
      if (flag === "minus" && quantity === 0) return; //quantity === 1
      if (flag === "minus") setQuantity((prev) => +prev - 1);
      if (flag === "plus") setQuantity((prev) => +prev + 1);
    },
    [quantity]
  );
  useEffect(() => {
    if (data && data?._id) setPid(data?._id);
    else if (params && params.pid) setPid(params.pid);
  }, [data, params]);
  const handleClickImg = (e, el) => {
    e.stopPropagation();
    setCurrentImage(el);
  };
  useEffect(() => {
    if (pid) {
      fetchproduct();
      fetchProducts();
    }
    // window.scrollTo(0, 0);
    titleRef?.current?.scrollIntoView({ block: "center" });
  }, [pid]);

  useEffect(() => {
    if (pid) fetchproduct();
  }, [updated]);
  useEffect(() => {
    if (variants) {
      setCurrentProduct({
        title: product?.variants?.find((el) => el._id === variants)?.title,
        images: product?.variants?.find((el) => el._id === variants)?.images,
        thumb: product?.variants?.find((el) => el._id === variants)?.thumb,
        price: product?.variants?.find((el) => el._id === variants)?.price,
        color: product?.variants?.find((el) => el._id === variants)?.color,
      });
    } else {
      setCurrentProduct({
        title: product?.title,
        images: product?.images || [],
        thumb: product?.thumb,
        price: product?.price,
        color: product?.color,
      });
    }
  }, [variants, product]);
  const reRender = useCallback(() => {
    setUpdated(!updated);
  }, [updated]);
  const handleAddToCart = async () => {
    if (!current)
      return Swal.fire({
        title: "Almost...",
        text: "Please login first",
        icon: "info",
        cancelButtonText: "Not now",
        showCancelButton: true,
        confirmButtonText: "GO login page",
      }).then((rs) => {
        if (rs.isConfirmed)
          navigate({
            pathname: `/${path.LOGIN}`,
            search: createSearchParams({
              redirect: location.pathname,
            }).toString(),
          });
      });
    const response = await apiUpdateCart({
      pid,
      color: currentProduct?.color || product?.color,
      price: currentProduct?.price || product?.price,
      quantity,
      thumbnail: currentProduct?.thumb || product?.thumb,
      title: current?.title || product?.title,
    });
    if (response.success) {
      toast.success(response.message);
      dispatch(getUser());
    } else toast.error(response.message);
  };
  return (
    <div className={clsx(isQuickView ? "w-main object-cover" : "w-full")}>
      {!isQuickView && (
        <div ref={titleRef} className="flex flex-col items-center mt-4">
          <h2 className="bg-gray-100 font-semibold text-[24px] text-center p-2 rounded-md shadow-md">
            {currentProduct?.title?.toUpperCase()}
          </h2>
          <BreadCrumb
            title={currentProduct?.title || product?.title}
            category={product?.category}
          />
        </div>
      )}

      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          "flex mt-6 bg-white",
          isQuickView && "max-h-[80vh] overflow-y-auto"
        )}
      >
        <div className=" w-2/5 flex-col gap-4 flex items-center justify-center">
          <div className={clsx("w-[458px] h-[458px] object-cover border")}>
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "",
                  isFluidWidth: true,
                  src: currentProduct?.thumb || currentImage,
                },
                largeImage: {
                  src: currentProduct?.thumb || currentImage,
                  width: 600,
                  height: 600,
                },
              }}
            />
          </div>

          <div className="w-full mt-3 object-cover">
            <Slider className="slider-detail" {...settings}>
              {currentProduct?.images?.length === 0 &&
                product?.images?.map((el) => (
                  <img
                    onClick={(e) => handleClickImg(e, el)}
                    key={el._id}
                    src={el}
                    alt="anh"
                    className={clsx(
                      isQuickView ? "h-[160px] border " : "h-[163px] border"
                    )}
                  />
                ))}
              {currentProduct?.images?.length > 0 &&
                currentProduct?.images?.map((el) => (
                  <img
                    onClick={(e) => handleClickImg(e, el)}
                    key={el._id}
                    src={el}
                    alt="anh"
                    className={clsx(
                      isQuickView ? "h-[160px] border " : "h-[163px] border"
                    )}
                  />
                ))}
            </Slider>
          </div>
        </div>
        <div className=" w-2/5 h-[456px]">
          <div className="flex items-center justify-between pr-[24px]">
            <h2 className="font-semibold text-[30px]">{`${formatMonney(
              currentProduct?.price || product?.price
            )} VND`}</h2>
            <span>{`Kho: ${product?.quantity}`}</span>
          </div>
          <div className="flex my-2 items-center gap-1">
            {numberToStar(product?.totalRatings)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
            <span className="pl-5">{`(Đã bán: ${product?.sold} cái)`}</span>
          </div>
          <ul className="text-gray-500 text-sm list-item pl-5 line-clamp-6">
            {product?.description?.length > 1 &&
              product?.description?.map((el, idx) => (
                <li key={idx} className=" leading-6 list-square">
                  {el}
                </li>
              ))}
            {product?.description?.length === 1 && (
              <div
                className="text-sm justify-center line-clamp-6"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product?.description[0]),
                }}
              ></div>
            )}
          </ul>
          <div className="my-4 flex items-center gap-4 flex-wrap">
            <span className="font-semibold">Color:</span>
            <div className="flex items-center justify-center">
              <div
                onClick={() => setVariants(null)}
                className={clsx(
                  "flex gap-2 flex-col items-center justify-center cursor-pointer",
                  !variants && "border-main border"
                )}
              >
                <img
                  src={product?.thumb}
                  alt="thumb"
                  className="w-[70px] h-10"
                />
                <span>{product?.color}</span>
              </div>
              {product?.variants?.map((el) => (
                <div
                  onClick={() => setVariants(el._id)}
                  key={el._id}
                  className={clsx(
                    "flex gap-2 flex-col cursor-pointer items-center justify-center",
                    variants === el._id && "border-main border"
                  )}
                >
                  <img src={el?.thumb} alt="thumb" className="w-[70px] h-10" />
                  <span>{el?.color}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-6">
              <span className="font-semibold text-[20px]">Quantity</span>
              <div className="bg-gray-100">
                <SelectQuantity
                  quantity={quantity}
                  handleQuantity={handleQuantity}
                  handleChangeQuantity={handleChangeQuantity}
                />
              </div>
            </div>
            {quantity <= product?.quantity ? (
              <div>
                <h2 className="font-semibold text-[20px]">{`Thành tiền: ${formatMonney(
                  +currentProduct?.price * quantity || product?.price * quantity
                )} VND`}</h2>
                <Button handleOnClick={handleAddToCart} quantity={quantity} fw>
                  ADD TO CARD
                </Button>
              </div>
            ) : (
              <h2 className="font-semibold">{`Sản phẩm không đủ, sản phẩm tối đa ${product?.quantity}.Vui lòng chọn lại!`}</h2>
            )}
          </div>
        </div>
        <div className=" w-1/5">
          {productExtraInfomation?.map((el, id) => (
            <ProductExtraItem
              key={id}
              title={el.title}
              icon={el.icon}
              sub={el.sub}
            />
          ))}
        </div>
      </div>

      {!isQuickView && (
        <div className="mt-8">
          <ProductInfomation
            total={product?.totalRatings}
            ratings={product?.ratings}
            nameProduct={product?.title}
            pid={pid}
            reRender={reRender}
          />
        </div>
      )}
      {!isQuickView && (
        <div>
          <h3 className="font-bold uppercase text-20 py-15 border-b-2 border-main">
            OTHER CUSTOMERS ALSO BUY:
          </h3>
          <Customslider normal={true} product={relatedProduct} />
        </div>
      )}
      <div className="h-[100px]"></div>
    </div>
  );
};

export default withBaseComponent(DetalProduct);
