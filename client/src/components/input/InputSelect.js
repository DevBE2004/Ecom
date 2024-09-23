import React, { memo } from "react";
import { capitalizedStr } from "utils/helpers";

const InputSelect = ({ value, changeValue, options }) => {
  return (
    <select
      className="form-select text-sm"
      name={value}
      onChange={(e) => changeValue(e.target.value)}
    >
      <option value="">Random</option>
      {options?.map((el) => (
        <option key={el.id} value={el.value}>
          {capitalizedStr(el.text)}
        </option>
      ))}
    </select>
  );
};

export default memo(InputSelect);
