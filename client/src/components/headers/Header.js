import React, { Fragment, memo, useEffect, useState } from "react";
import icons from "utils/icons";
import { Link } from "react-router-dom";
import path from "utils/path";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "store/user/userSlice";
import withBaseComponent from "hocs/withBaseComponent";
import { showCart } from "store/app/appSlice";

const {
  FaUserCircle,
  MdOutlineMail,
  AiOutlineShoppingCart,
  BsFillTelephoneFill,
} = icons;

const Header = ({ dispatch }) => {
  const { current } = useSelector((state) => state.user);
  const [isShowOption, setIsShowOption] = useState(false);
  useEffect(() => {
    const handleClickOut = (e) => {
      const profile = document.getElementById("profile");
      if (profile?.contains(e.target) === false) setIsShowOption(false);
    };
    document.addEventListener("click", handleClickOut);
    return () => {
      document.removeEventListener("click", handleClickOut);
    };
  }, []);
  return (
    <div className="w-main h-[110px] py-3 flex justify-between fixed top-0 left-0 bg-white z-40 shadow-md transition-transform duration-300 transform translate-y-0 sm:translate-y-0 sm:hover:translate-y-0 sm:sticky sm:top-0">
      <Link to={`/${path.HOME}`}>
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/logo_digital_new_250x.png?v=1613166683"
          alt="Logo"
          className="w-[234px] object-contain ml-3 flex mt-[30px]"
        />
      </Link>
      <div className="flex font-semibold text-[13px] px-4 pr-5 gap-5">
        <span className="flex flex-col justify-center items-center ">
          <span className="flex justify-center items-center">
            <span>
              <BsFillTelephoneFill color="red" />
            </span>
            <span>(+1800) 000 8808</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </span>
        <div className="flex flex-col justify-center items-center ">
          <div className="flex justify-center items-center ">
            <span>
              <MdOutlineMail color="red" />
            </span>
            <span> SUPPORT@TADATHEMES.COM</span>
          </div>
          <span>Online Support 24/7</span>
        </div>
        {current && (
          <Fragment>
            <div
              onClick={() => dispatch(showCart())}
              className="cursor-pointer flex items-center justify-center gap-2"
            >
              <AiOutlineShoppingCart size={24} color="red" />
              <span>{current?.cart?.length} items</span>
            </div>
            {/* <Link
              to={
                +current.role === 1
                  ? `/${path.ADMIN}/${path.DASHBOARD}`
                  : `/${path.MEMBER}/${path.PERSIONAL}`
              }
              className="cursor-pointer flex justify-center items-center gap-2"
            >
              <FaUserCircle size={24} color="red" className="" />
              <span>Profile</span>
            </Link> */}
            <div
              to={
                +current.role === 1
                  ? `/${path.ADMIN}/${path.DASHBOARD}`
                  : `/${path.MEMBER}/${path.PERSIONAL}`
              }
              className="cursor-pointer flex justify-center items-center gap-2 relative"
              onClick={() => setIsShowOption((prev) => !prev)}
              id="profile"
            >
              <FaUserCircle size={24} color="red" className="" />
              <span>Profile</span>
              {isShowOption && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="absolute top-[60px] left-1 min-w-[100px] border bg-gray-200 py-2 flex flex-col"
                >
                  <Link
                    className="p-2 hover:bg-sky-100 w-full"
                    to={`/${path.MEMBER}/${path.PERSIONAL}`}
                  >
                    PERSIONAL
                  </Link>
                  {+current?.role === 1 && (
                    <Link
                      className="p-2 hover:bg-sky-100 w-full"
                      to={`/${path.ADMIN}/${path.DASHBOARD}`}
                    >
                      ADMIN
                    </Link>
                  )}
                  <span
                    className="p-2 hover:bg-sky-100 w-full"
                    onClick={() => dispatch(logout())}
                  >
                    Logout
                  </span>
                </div>
              )}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default withBaseComponent(memo(Header));
