import React, { memo } from "react";
import icons from "utils/icons";
import { numberToStar } from "utils/helpers";
import { VoteBar } from "components";
const { FaStar } = icons;

const Ratings = ({ total, ratings }) => {
  return (
    <div class="flex p-6 border rounded-lg shadow-lg bg-white">
    <div class="w-2/5 p-4 flex flex-col items-center justify-center">
      <span class="flex items-center text-2xl font-bold text-gray-800">
        {Math.round(total)}/5 <FaStar className="ml-1 text-orange-500" />
      </span>
      <span class="flex mt-2">
        {numberToStar(total)?.map((el, index) => (
          <span key={index} className="text-yellow-500">{el}</span>
        ))}
      </span>
      <span class="mt-2 text-gray-600">{`${ratings?.length} review${ratings?.length === 1 ? '' : 's'}`}</span>
    </div>
    <div class="w-3/5 flex flex-col p-4">
      {Array.from(Array(5).keys())
        .reverse()
        .map((el) => (
          <VoteBar
            key={el}
            star={el + 1}
            userVote={ratings?.filter((item) => item.star === el + 1)?.length}
            userVoteTotal={ratings?.length}
          />
        ))}
    </div>
  </div>
  );
};

export default memo(Ratings);
