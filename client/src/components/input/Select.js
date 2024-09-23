import React, { memo } from "react";
import clsx from "clsx";

const Select = ({
  label,
  options = [],
  register,
  errors,
  validate,
  id,
  style,
  fw,
  defaultValue,
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <label className="font-semibold" htmlFor={id}>
          {label}
        </label>
      )}
      <select
        className={clsx("form-select h-[42px]", fw && "w-full", style)}
        id={id}
        {...register(id, validate)}
        defaultValue={defaultValue}
      >
        <option value=" ">---CHOOSE---</option>
        {options?.map((el) => (
          <option value={el.code}>{el.value}</option>
        ))}
      </select>
      {errors[id] && (
        <small className="text-xs text-main">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default memo(Select);
