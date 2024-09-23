import React, { memo } from "react";

const Button = ({ type, quantity, children, handleOnClick, style, fw }) => {
  return (
    <button
      type={type || "button"}
      className={
        quantity !== 0
          ? style ||
            `px-4 py-2 rounded-md text-white bg-main text-semibold my-2 ${
              fw ? "w-full" : "w-fit"
            }`
          : `px-4 py-2 rounded-md text-white bg-red-200 text-semibolb my-2 ${
              fw ? "w-full" : "w-fit"
            }`
      }
      onClick={() => {
        handleOnClick && handleOnClick();
      }}
      disabled={quantity === 0}
    >
      {children}
    </button>
  );
};

export default memo(Button);
