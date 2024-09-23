import React, { useState, memo, useCallback, useEffect } from "react";
import { description } from "utils/contants";
import { Button, Ratings, VoteOption, Comment } from "components";
import { apiRatings } from "apis/product";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "store/app/appSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import path from "utils/path";

const ProductInfomation = ({ total, ratings, nameProduct, pid, reRender }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activated, setActivated] = useState(1);
  const { isLogin } = useSelector((state) => state.user);
  const [payload, setPayload] = useState({
    comment: "",
    score: "",
  });
  const handleSubmitVote = async (value) => {
    if (!pid || !value.comment || !value.score) {
      alert("Bạn cần phải đánh giá sản phẩm!");
      return;
    }
    const { score, comment } = value;
    const response = await apiRatings({
      star: score,
      comment: comment,
      pid,
      updatedAt: Date.now(),
    });
    reRender();
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
  };
  const handleVoteNow = () => {
    if (!isLogin) {
      Swal.fire({
        text: "Đăng nhập để đánh giá sản phẩm",
        cancelButtonText: "Cancel",
        confirmButtonText: "Login",
        showCancelButton: true,
        title: "Thất bại!",
      }).then((rs) => {
        if (rs.isConfirmed) {
          navigate(`/${path.LOGIN}`);
        }
      });
    } else {
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: (
            <VoteOption
              nameProduct={nameProduct}
              handleSubmitVote={handleSubmitVote}
            />
          ),
        })
      );
    }
  };
  return (
    <div className="p-4">
    <div className="flex items-center gap-2 mb-2 relative">
      {description.map((el) => (
        <span
          className={`p-2 px-4 cursor-pointer rounded-md ${
            activated === el.id ? 'bg-white border border-gray-300 shadow' : 'bg-gray-200'
          }`}
          key={el.id}
          onClick={() => setActivated(el.id)}
        >
          {el.title}
        </span>
      ))}
    </div>
    
    <div className="w-full border rounded-md p-4 bg-white">
      {description.some((el) => el.id === activated) &&
        description.find((el) => el.id === activated)?.content}
    </div>
    
    <div className="mt-4">
      <Ratings total={total} ratings={ratings} />
      <div className="flex flex-col items-center justify-center p-4 text-sm gap-2">
        <span className="font-semibold">Mời bạn đánh giá sản phẩm này</span>
        <Button
          handleOnClick={() => dispatch(handleVoteNow)}
          children="Submit"
          className="bg-main text-white rounded-md py-2 px-4 transition duration-200 hover:bg-main-dark"
        />
      </div>
      
      <div className="flex flex-col gap-4 mt-4">
        {ratings?.map((el) => (
          <Comment
            key={el.id}
            ratings={ratings}
            updatedAt={el.updatedAt}
            comment={el.comment}
            name={`${el.postBy?.lastname} ${el.postBy?.firstname}`}
          />
        ))}
      </div>
    </div>
  </div>
  );
};

export default memo(ProductInfomation);
