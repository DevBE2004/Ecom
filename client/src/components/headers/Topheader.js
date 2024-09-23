import React, { memo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import path from "utils/path";
import { getUser } from "store/user/acsynAction";
import { useDispatch, useSelector } from "react-redux";
import icons from "utils/icons";
import { logout, clearMessage } from "store/user/userSlice";
import Swal from "sweetalert2";
const { FiLogOut } = icons;

const Topheader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin, current, mes } = useSelector((state) => state.user);
  useEffect(() => {
    const setTimeOutId = setTimeout(() => {
      if (isLogin) dispatch(getUser());
    }, 300);
    return () => {
      clearTimeout(setTimeOutId);
    };
  }, [dispatch, isLogin]);
  useEffect(() => {
    if (mes)
      Swal.fire("Hết hạn", mes, "info").then(() => {
        dispatch(clearMessage());
        navigate(`/${path.LOGIN}`);
      });
  }, [mes]);
  return (
    <div className="w-full bg-main flex justify-center h-[39px] items-center">
      <div className="w-main flex justify-between">
        <div className="flex text-white gap-3 text-xs uppercase">
          <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
          <span>icon</span>
        </div>
        <div className="flex text-white gap-3 text-xs uppercase ">
          {isLogin && current ? (
            <h4 className="upperCase flex items-center justify-center gap-2 ">
              <span>{`Welcome ${current?.lastname} ${current?.firstname}`}</span>
              <span
                className="hover:rounded-full hover:bg-gray-200 hover:text-black cursor-pointer p-2"
                onClick={() => dispatch(logout())}
              >
                <FiLogOut size={12} />
              </span>
            </h4>
          ) : (
            <Link
              to={`${path.LOGIN}`}
              className="hover:text-black cursor-pointer"
            >
              Sign In or Create Account
            </Link>
          )}
          <span className="hover:text-black cursor-pointer justify-center items-center flex">
            icon
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(Topheader);
