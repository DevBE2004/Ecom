import React, { memo } from "react";
import icons from "utils/icons";
const { MdEmail, MdLocationPin, BsFillTelephoneFill } = icons;
const Footer = () => {
  return (
    <div className="w-full">
      <div className="h-[103px] w-full items-center flex justify-between bg-main px-[100px]">
        <div className="w-main flex flex-col flex-1">
          <span className="text-gary-100">SIGN UP TO NEWSLETTER</span>
          <small className="text-gray-300 flex">
            Subscribe now and receive weekly newsletter
          </small>
        </div>
        <div className="flex-1 flex items-center mr-[50px]">
          <input
            type="text"
            className="rounded-l-full flex-1 bg-[#FC4646] outline-none text-gray-100 p-4"
            placeholder="Enter email address"
          ></input>
          <button className="bg-[#FC4646] rounded-r-full pr-4">
            <MdEmail size={56} />
          </button>
        </div>
      </div>

      <div className="w-full h-[407px] bg-gray-800 flex items-center justify-center text-white text-[13px]">
        <div className="w-main flex">
          <div className="flex-2">
            <h3 className="mb-[20px] text-[15px] font-semibold border-l-2 pl-[15px] border-main">
              ABOUT US
            </h3>
            <div className="flex flex-col">
              <span className="flex items-center gap-2">
                <MdLocationPin />
                <span>Address: </span>
                <span className="opacity-70">
                  474 Ontario St Toronto, ON M4X 1M7 Canada
                </span>
              </span>
              <span className="flex items-center gap-2">
                <BsFillTelephoneFill />
                <span>Phone: </span>
                <span className="opacity-70">(+1234)56789xxx</span>
              </span>
              <span className="flex items-center gap-2">
                <MdEmail />
                <span>Mail: </span>
                <span className="opacity-70">tadathemes@gmail.com</span>
              </span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="mb-[20px] text-[15px] font-semibold border-l-2 pl-[15px] border-main">
              INFORMATION
            </h3>
            <div className="flex flex-col opacity-70  cursor-pointer gap-2">
              <span className="hover:text-main">Typography</span>
              <span className="hover:text-main">Gallery</span>
              <span className="hover:text-main">Store Location</span>
              <span className="hover:text-main">Today's Deals</span>
              <span className="hover:text-main">Contact</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="mb-[20px] text-[15px] font-semibold border-l-2 pl-[15px] border-main">
              WHO WE ARE
            </h3>
            <div className="flex flex-col opacity-70  cursor-pointer gap-2">
              <span className="hover:text-main">Help</span>
              <span className="hover:text-main">Free Shipping</span>
              <span className="hover:text-main">FAQs </span>
              <span className="hover:text-main">Return & Exchange</span>
              <span className="hover:text-main">Testimonials</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="mb-[20px] text-[15px] font-semibold border-l-2 pl-[15px] border-main">
              #DIGITALWORLDSTORE
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
