import React, { useCallback, useEffect, useState } from "react";
import { InputField, Button, Loading } from "components";
import {
  apiRegister,
  apiLogin,
  apiForgotPassword,
  apiFinalRegister,
} from "apis/user";
import { showModal } from "store/app/appSlice";
import Swal from "sweetalert2";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import path from "utils/path";
import { login } from "store/user/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { validate } from "utils/helpers";
import loginsvg from "assets/login.svg";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [searchParams] = useSearchParams();
  const resetPayload = () => {
    setPayload({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      mobile: "",
    });
  };
  const [isVeriFieldEmail, setIsVeriFieldEmail] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);
  const [email, setEmail] = useState([]);
  const [token, setToken] = useState("");
  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({ email });
    if (response.success) toast.success(response.message, { theme: "colored" });
    else toast.info(response.message, { theme: "colored" });
  };
  useEffect(() => {
    resetPayload();
  }, [isRegister]);
  //Submit
  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, mobile, ...data } = payload;
    const invalids = isRegister
      ? validate(payload, setInvalidFields)
      : validate(data, setInvalidFields);
    if (invalids === 0) {
      if (isRegister) {
        dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
        const response = await apiRegister(payload);
        dispatch(showModal({ isShowModal: false, modalChildren: null }));
        if (response.success) {
          setIsVeriFieldEmail(true);
        } else Swal.fire("Thất Bại", response.message, "error");
      } else {
        const rs = await apiLogin(data);
        if (rs.success) {
          dispatch(
            login({
              isLogin: true,
              token: rs.accessToken,
              userData: rs.userData,
            })
          );
          searchParams.get("redirect")
            ? navigate(searchParams.get("redirect"))
            : navigate(`/${path.HOME}`);
        } else {
          Swal.fire("Thất Bại", rs.message, "error");
        }
      }
    }
  }, [payload, isRegister]);
  const finalRegister = async () => {
    const response = await apiFinalRegister(token);
    if (response.success) {
      Swal.fire("Thành Công", response.message, "success").then(() => {
        setIsRegister(false);
        resetPayload();
      });
    } else Swal.fire("Thất Bại", response.message, "error");
    setIsVeriFieldEmail(false);
    setToken("");
  };
  return (
    <div className="w-screen h-screen relative bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
      {isVeriFieldEmail && (
        <div className="absolute inset-0 bg-gray-800 bg-opacity-70 z-50 flex justify-center items-center">
          <div className="bg-white w-full max-w-md rounded-lg p-8 shadow-lg">
            <h4 className="text-black text-xl font-bold mb-4 text-center">
              Kiểm tra email của bạn, Nhập mã code:
            </h4>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full mb-4"
              placeholder="Nhập mã code"
            />
            <button
              type="button"
              className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
              onClick={finalRegister}
            >
              Gửi
            </button>
          </div>
        </div>
      )}
      {isForgotPassword && (
        <div className="absolute inset-0 bg-white flex flex-col items-center justify-center z-50">
          <div className="flex flex-col gap-4 w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
            <label htmlFor="email" className="text-lg font-semibold">
              Nhập email của bạn:
            </label>
            <input
              type="text"
              id="email"
              className="w-full border-b-2 border-gray-300 outline-none focus:border-blue-500 transition mb-4"
              placeholder="Example: email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex items-center justify-end w-full gap-4">
              <Button
                children="Gửi"
                handleOnClick={handleForgotPassword}
                style="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
              />
              <Button
                children="Quay lại"
                handleOnClick={() => setIsForgotPassword(false)}
                style="px-4 py-2 rounded-md text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white transition"
              />
            </div>
          </div>
        </div>
      )}
      <img
        src={loginsvg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="relative bg-white rounded-lg p-10 shadow-lg z-10 max-w-md w-full">
        <h1 className="font-semibold text-center mb-8 uppercase text-2xl">
          {isRegister ? "Đăng ký" : "Đăng nhập"}
        </h1>
        {isRegister && (
          <div className="flex flex-col gap-4">
            <InputField
              value={payload.firstname}
              setValue={setPayload}
              nameKey={"firstname"}
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              
            />
            <InputField
              value={payload.lastname}
              setValue={setPayload}
              nameKey={"lastname"}
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
          </div>
        )}
        {isRegister && (
          <InputField
            value={payload.mobile}
            setValue={setPayload}
            nameKey={"mobile"}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
        )}
        <InputField
          value={payload.email}
          setValue={setPayload}
          nameKey={"email"}
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />
        <InputField
          value={payload.password}
          setValue={setPayload}
          nameKey={"password"}
          type="password"
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />
        <Button
          children={isRegister ? "Đăng ký" : "Đăng nhập"}
          handleOnClick={handleSubmit}
          style="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        />
        <div className="flex justify-between mt-4">
          {!isRegister && (
            <span
              onClick={() => setIsForgotPassword(true)}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Quên tài khoản?
            </span>
          )}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Quay lại" : "Tạo tài khoản"}
          </span>
        </div>
        <Link
          className="flex justify-center items-center hover:underline text-blue-600 cursor-pointer mt-4"
          to={`/${path.HOME}`}
        >
          Về trang chính
        </Link>
      </div>
    </div>
  );
};

export default Login;
