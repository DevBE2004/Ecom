import React, { memo, useRef, useState, useEffect } from "react";
import icons from "utils/icons";
import logo from "assets/logo.png";
import { voteStar } from "utils/contants";
import { capitalizedStr } from "utils/helpers";
import { Button } from "components";

const { FaStar } = icons;

const VoteOption = ({ nameProduct, handleSubmitVote }) => {
  const modalRef = useRef();
  const [chosenScore, setChosenScore] = useState(null);
  const [comment, setComment] = useState("");
  const [score, setScore] = useState(null);
  useEffect(() => {
    modalRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);
  return (
<div
  onClick={(e) => e.stopPropagation()}
  ref={modalRef}
  className="max-w-md bg-white rounded-lg shadow-xl flex flex-col justify-center items-center gap-6 p-6"
>
  <img src={logo} alt="Product Logo" className="w-3/4 object-contain mb-4" />
  <h2 className="text-center text-lg font-semibold text-gray-800">{`Đánh giá sản phẩm ${nameProduct}`}</h2>
  <textarea
    className="form-textarea w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 transition duration-200"
    placeholder="Nhập ý kiến đánh giá của bạn vào đây..."
    value={comment}
    onChange={(e) => setComment(e.target.value)}
  ></textarea>
  <div className="flex flex-col items-center">
    <p className="text-center mb-2 text-gray-700">Bạn cảm thấy sản phẩm này thế nào?</p>
    <div className="flex justify-center items-center mb-4">
      {voteStar.map((el) => (
        <div key={el.id} className="bg-gray-200 rounded-lg p-2 cursor-pointer transition hover:bg-gray-300 mx-1">
          <span
            className="flex flex-col items-center"
            onClick={() => {
              setChosenScore(el.id);
              setScore(el.id);
            }}
          >
            {Number(chosenScore) && chosenScore >= el.id ? (
              <FaStar color="orange" />
            ) : (
              <FaStar color="gray" />
            )}
            <span className="mt-1 text-sm text-gray-600">{capitalizedStr(el.text)}</span>
          </span>
        </div>
      ))}
    </div>
    <Button
      handleOnClick={() => handleSubmitVote({ comment, score })}
      children="Submit"
      fw
      className="bg-orange-600 text-white py-2 px-6 rounded-lg hover:bg-orange-700 transition duration-200"
    />
  </div>
</div>
  );
};

export default memo(VoteOption);
