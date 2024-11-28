import React, { memo } from "react";
import PropTypes from "prop-types";
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
    <div className="flex p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center">
        <img
          src={image}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover border border-gray-300"
        />
        <div className="ml-3 flex flex-col justify-center">
          <h3 className="font-semibold text-lg">{name}</h3>
          <span className="text-gray-600 text-sm">{moment(updatedAt)?.fromNow()}</span>
        </div>
      </div>
      <div className="pl-6 border-l border-gray-300 bg-gray-100 ml-4">
        <div className="flex items-center mb-2">
          <span className="font-semibold text-gray-800">Đánh giá:</span>
          <span className="flex ml-2">
            {numberToStar(ratings[0]?.star)?.map((el, index) => (
              <span key={index} className="text-yellow-500">{el}</span>
            ))}
          </span>
        </div>
        <div>
          <span className="font-semibold text-gray-800">Comment:</span>
          <span className="text-gray-700">{comment}</span>
        </div>
      </div>
    </div>
  );
};


Comment.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  comment: PropTypes.string.isRequired,
  ratings: PropTypes.arrayOf(
    PropTypes.shape({
      star: PropTypes.number.isRequired,
    })
  ).isRequired,
  updatedAt: PropTypes.string.isRequired,
};

export default memo(Comment);