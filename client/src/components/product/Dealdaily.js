import React, { memo, useEffect, useState } from "react";
import icons from "../../utils/icons";
import { apiGetProducts } from "../../apis/product";
import {
  formatMonney,
  milisecondstoHMS,
  numberToStar,
} from "../../utils/helpers";
import { Countdown } from "..";
import { useSelector } from "react-redux";
import moment from "moment";
import withBaseComponent from "hocs/withBaseComponent";
import { getDealDaily } from "store/product/productSlice";

const { FaStar, AiOutlineMenu } = icons;
let idInterval;

const Dealdaily = ({ dispatch }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [expireTime, setExpireTime] = useState(false);
  const { dealDaily } = useSelector((state) => state.product);

  const fetchProduct = async () => {
    const response = await apiGetProducts({ sort: "-totalRatings", limit: 20 });
    if (response?.success) {
      const pr = response.productDatas[Math.round(Math.random() * 20)];
      dispatch(
        getDealDaily({
          data: pr,
          time: Date.now() + 24 * 3600 * 1000,
        })
      );
    }
  };
  useEffect(() => {
    if (dealDaily?.time) {
      const deltaTime = dealDaily?.time - Date.now();
      console.log(milisecondstoHMS(deltaTime));
      setHours(milisecondstoHMS(deltaTime).hours);
      setMinutes(milisecondstoHMS(deltaTime).minutes);
      setSeconds(milisecondstoHMS(deltaTime).seconds);
    }
  }, [dealDaily]);
  useEffect(() => {
    idInterval && clearInterval(idInterval);
    fetchProduct();
  }, [expireTime]);

  useEffect(() => {
    idInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prev) => prev - 1);
      } else {
        if (minutes > 0) {
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        } else {
          if (hours > 0) {
            setHours((prev) => prev - 1);
            setMinutes(59);
            setSeconds(59);
          } else {
            setExpireTime(!expireTime);
          }
        }
      }
    }, 1000);

    return () => {
      clearInterval(idInterval);
    };
  }, [seconds, minutes, hours, expireTime]);
  return (
    <div className="w-full flex flex-col border rounded-lg shadow-md bg-white">
  <div className="flex items-center justify-between font-bold p-4">
    <FaStar color="red" size={24} />
    <span className="flex-1 text-center">DEAL DAILY</span>
    <span className="flex-1"></span>
  </div>
  
  <div className="flex flex-col items-center pt-4">
    <img
      src={
        dealDaily?.data?.thumb ||
        "https://th.bing.com/th/id/OIP.wyS54dWv02tzWeNTGgM8KgHaFW?w=241&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
      }
      alt="product"
      className="w-full h-auto object-contain rounded-t-lg"
    />
    <span className="line-clamp-1 text-center font-semibold mt-2">
      {dealDaily?.data?.title}
    </span>
    <span className="flex text-center mt-1">
      {numberToStar(dealDaily?.data?.totalRatings)?.map((el, index) => (
        <span key={index} className="mx-1">{el}</span>
      ))}
    </span>
    <span className="text-center font-bold text-lg mt-1">{`${formatMonney(
      dealDaily?.data?.price
    )} VND`}</span>
  </div>
  
  <div className="flex justify-center items-center gap-4 mt-4">
    <Countdown unit="Hours" number={hours} />
    <Countdown unit="Minutes" number={minutes} />
    <Countdown unit="Seconds" number={seconds} />
  </div>
  
  <div className="flex justify-center items-center gap-4 mt-4 rounded-md bg-main hover:bg-black hover:text-white py-2 transition-colors duration-200">
    <AiOutlineMenu size={20} />
    <button className="font-semibold">OPTIONS</button>
  </div>
</div>
  );
};

export default withBaseComponent(memo(Dealdaily));
