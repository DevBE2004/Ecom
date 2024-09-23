import React, { memo } from "react";
import Slider from "react-slick";
import { Product } from "components";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
};

const Customslider = ({ product, activedTab, normal }) => {
  return (
    <>
    {product && product.length > 0 && (
      <Slider className="custom-slider" {...settings}>
        {product.map((el) => (
          <div key={el._id} className="p-2">
            <Product
              pid={el._id}
              productData={el}
              isNew={activedTab !== 1}
              normal={normal}
            />
          </div>
        ))}
      </Slider>
    )}
    {product && product.length === 0 && (
      <div className="flex justify-center items-center h-48 text-gray-500">
        <span>No products available.</span>
      </div>
    )}
  </>
  );
};

export default memo(Customslider);
