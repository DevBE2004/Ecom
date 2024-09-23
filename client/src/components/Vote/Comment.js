import React, { memo } from "react";
import avt from "assets/avt.png";
import moment from "moment";
import { numberToStar } from "utils/helpers";

const Comment = ({
  image = avt,
  name = "Anonymous",
  comment,
  ratings,
  updatedAt,
}) => {
  return (
    <div class="flex p-4 bg-white rounded-lg shadow-md">
    <div class="flex items-center">
      <img
        src={image}
        alt="avatar"
        class="w-10 h-10 rounded-full object-cover border border-gray-300"
      />
      <div class="ml-3 flex flex-col justify-center">
        <h3 class="font-semibold text-lg">{name}</h3>
        <span class="text-gray-600 text-sm">{moment(updatedAt)?.fromNow()}</span>
      </div>
    </div>
    <div class="pl-6 border-l border-gray-300 bg-gray-100 ml-4">
      <div class="flex items-center mb-2">
        <span class="font-semibold text-gray-800">Đánh giá:</span>
        <span class="flex ml-2">
          {numberToStar(ratings[0]?.star)?.map((el, index) => (
            <span key={index} class="text-yellow-500">{el}</span>
          ))}
        </span>
      </div>
      <div>
        <span class="font-semibold text-gray-800">Comment:</span>
        <span class="text-gray-700">{comment}</span>
      </div>
    </div>
  </div>
  );
};

export default memo(Comment);
