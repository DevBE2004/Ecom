import React, { memo } from "react";
import clsx from "clsx";
import {
  useSearchParams,
  useNavigate,
  useLocation,
  createSearchParams,
} from "react-router-dom";

const PagiItem = ({ children }) => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const handlePagination = () => {
    const queries = Object.fromEntries([...params]);
    if (Number(children)) queries.page = children;
    navigate({
      pathname: location.pathname,
      search: createSearchParams(queries).toString(),
    });
  };
  return (
    <button
      type="button"
      className={clsx(
        "flex items-center justify-center p-4 w-10 h-10 rounded-md transition duration-200",
        !Number(children) && "items-end pb-2",
        Number(children) && "cursor-pointer hover:bg-gray-300",
        +params.get("page") === +children && "bg-gray-300 rounded-full",
        !+params.get("page") && +children === 1 && "bg-gray-300 rounded-full",
        "disabled:opacity-50 disabled:cursor-not-allowed"
      )}
      onClick={handlePagination}
      disabled={!Number(children)}
    >
      {children}
    </button>
  );
};

export default memo(PagiItem);
