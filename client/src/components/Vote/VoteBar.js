import React, { memo, useEffect, useRef } from "react";
import icons from "utils/icons";
const { FaStar } = icons;

const VoteBar = ({ star, userVote, userVoteTotal }) => {
  const percentRef = useRef();
  const percent = Math.round((userVote * 100) / userVoteTotal) || 0;
  useEffect(() => {
    percentRef.current.style.cssText = `right:${100 - percent}%`;
  }, [userVote, userVoteTotal]);
  return (
    <div class="flex-1 flex items-center gap-3 text-gray-700">
    <div class="flex items-center gap-1 text-sm">
      <span class="font-semibold">{star}</span>
      <FaStar className="text-orange-500" />
    </div>
    <div class="flex-1 w-full h-2 bg-gray-300 rounded-md relative">
      <div
        ref={percentRef}
        class="absolute inset-0 bg-red-500 rounded-md transition-all duration-300"
        style={{ width: `${(userVote / userVoteTotal) * 100}%` }} // Adjust width based on votes
      ></div>
    </div>
    <div class="text-sm text-gray-600">{`${userVote} vote${userVote !== 1 ? 's' : ''}`}</div>
  </div>
  );
};

export default memo(VoteBar);
