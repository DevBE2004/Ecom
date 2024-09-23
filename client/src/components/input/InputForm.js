import clsx from "clsx";
import React, { memo, useEffect, useState } from "react";

const InputForm = ({
  label,
  disabled,
  register,
  errors,
  id,
  validate,
  type = "text",
  placeholder,
  fw,
  defaultValue,
  style,
  readOnly,
}) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className={clsx("flex flex-col mb-4", style)}>
      {label && (
        <label className="font-semibold text-gray-700 mb-1" htmlFor={id}>
          {label + ":"}
        </label>
      )}
      <input
        min="1"
        type={type}
        id={id}
        {...register(id, validate)}
        disabled={disabled}
        placeholder={placeholder}
        value={inputValue}
        readOnly={readOnly}
        onChange={handleInputChange}
        className={clsx(
          "px-4 py-2 border rounded-md shadow-sm transition duration-200",
          "focus:outline-none focus:ring-2 focus:ring-blue-400",
          "disabled:bg-gray-200 disabled:text-gray-500",
          fw && "w-full",
          errors[id] ? "border-red-500" : "border-gray-300"
        )}
      />
      {errors[id] && (
        <small className="text-xs text-red-500 mt-1">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default memo(InputForm);