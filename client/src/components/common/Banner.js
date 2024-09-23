import React, { memo, useEffect, useState } from "react";
import banner1 from "assets/banner.png";
import banner2 from "assets/banner2.png";
import banner3 from "assets/banner3.png";

const Banner = () => {
  const [currentBanner, setCurrentBanner] = useState(banner1);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentBanner === banner1) {
        setCurrentBanner(banner2);
      } else if (currentBanner === banner2) {
        setCurrentBanner(banner3);
      } else {
        setCurrentBanner(banner1);
      }
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [currentBanner]);

  return (
    <img
      src={currentBanner}
      alt="Banner"
      className="h-[448px] w-full object-cover"
    />
  );
};

export default memo(Banner);