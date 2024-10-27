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
    <div className="w-screen h-screen relative">
      {isVeriFieldEmail && (
        <div className="absolute top-0 right-0 left-0 bottom-0 bg-gray-100 z-50 flex flex-col justify-center items-center">
          <div className="bg-white w-full max-w-md rounded-lg p-8 shadow-xl border border-gray-300 transition transform hover:scale-105">
            <h4 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Kiểm tra email của bạn
            </h4>
            <p className="text-gray-600 mb-4 text-center">Nhập mã code:</p>
            <div className="flex items-center mb-4">
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="p-3 border border-gray-300 outline-none rounded-l-md flex-1 transition duration-200 focus:border-blue-500 focus:ring focus:ring-blue-100"
                placeholder="Nhập mã code"
              />
              <button
                type="button"
                className="px-6 py-3 bg-blue-500 font-semibold text-white rounded-r-md hover:bg-blue-600 transition duration-200 shadow-md"
                onClick={finalRegister}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      {isForgotPassword && (
        <div className="absolute animate-slide-right top-0 left-0 bottom-0 right-0 bg-white flex flex-col items-center py-10 z-50 shadow-lg rounded-lg">
          <div className="flex flex-col gap-6 w-full max-w-md mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
            <label
              htmlFor="email"
              className="text-xl font-semibold text-gray-700"
            >
              Enter your email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full pb-2 border-b border-gray-300 outline-none focus:border-blue-500 transition duration-200 p-2 rounded-md"
              placeholder="Example: email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex items-center justify-between w-full gap-4">
              <Button
                children="Submit"
                handleOnClick={handleForgotPassword}
                style="px-6 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-200 shadow-sm"
              />
              <Button
                children="Back"
                handleOnClick={() => setIsForgotPassword(false)}
                style="px-6 py-2 rounded-md text-blue-600 bg-gray-200 hover:bg-gray-300 transition duration-200 shadow-sm"
              />
            </div>
          </div>
        </div>
      )}
      <img src={loginsvg} alt="" className="w-full h-full object-cover" />
      <div className="absolute top-[200px] left-[500px]">
        <div className="flex flex-col p-8 bg-white rounded-md min-w-[500px] absolute gap-2">
          <h1 className="font-semibold flex items-center justify-center mb-8 uppercase text-[24px]">
            {isRegister ? "Register" : "Login"}
          </h1>
          {isRegister && (
            <div className="flex items-center justify-center">
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
            children={isRegister ? "Resgister" : "Login"}
            handleOnClick={handleSubmit}
            fw
          />
          {!isRegister && (
            <div className="flex justify-between">
              <span
                onClick={() => setIsForgotPassword(true)}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Forgot your account?
              </span>
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => setIsRegister(true)}
              >
                Create account
              </span>
            </div>
          )}
          {isRegister && (
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => setIsRegister(false)}
            >
              Back
            </span>
          )}
          <Link
            className="flex justify-center items-center hover:underline text-blue-500 cursor-pointer"
            to={`/${path.HOME}`}
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
