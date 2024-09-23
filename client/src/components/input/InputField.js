import clsx from "clsx";
import React, { memo } from "react";

const InputField = ({
  value,
  setValue,
  nameKey,
  type,
  invalidFields,
  setInvalidFields,
  fw,
  placeholder,
  isHideLabel,
}) => {
  return (
    <div className={clsx(" flex flex-col relative", fw && { fw })}>
      {!isHideLabel && value?.trim() !== "" && (
        <label
          className=" animate-slide-top-sm text-[10px] absolute top-0 left-[8px] bg-white px-1"
          htmlFor={nameKey}
        >
          {nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        </label>
      )}
      <input
        type={type || "text"}
        placeholder={
          placeholder || nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)
        }
        className="px-4 py-2 rounded-sm w-full outline-none mt-2"
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
        onFocus={() => setInvalidFields && setInvalidFields([])}
      ></input>
      {invalidFields?.some((el) => el.name === nameKey) && (
        <small className="text-[10px] text-main italic">
          {invalidFields.find((el) => el.name === nameKey)?.mes}
        </small>
      )}
    </div>
  );
};

export default memo(InputField);
