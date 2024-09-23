import React, { memo } from "react";

const ProductExtraItem = ({ icon, title, sub }) => {
  return (
    <div className="flex items-center p-4 mb-2 border rounded-lg shadow-sm gap-4 bg-white">
  <span className="flex items-center justify-center p-2 text-gray-100 bg-gray-600 rounded-full">
    {icon}
  </span>
  <div className="flex flex-col text-sm text-gray-700">
    <span className="font-medium text-gray-800">{title}</span>
    <span className="text-gray-600">{sub}</span>
  </div>
</div>
  );
};

export default memo(ProductExtraItem);
