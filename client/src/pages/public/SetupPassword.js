import React, { memo, useState } from "react";
import { Button } from "components";
import { useDispatch, useSelector } from "react-redux";
import { apiSiginWithGoogle } from "apis/user";
import { toast } from "react-toastify";
import { login } from "store/user/userSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import path from "utils/path";

const SetupPassword = ({ payload, setIsSetUpPassword, resetPayload }) => {
  const { googleData, token } = useSelector((state) => state.user);
  const [password, setPassword] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSetupPassword = async () => {
    const data = {
      ...googleData,
      password,
    };
    const response = await apiSiginWithGoogle(data);
    if (response.success) {
      dispatch(login({ isLogin: true, token: response.accessToken }));
      searchParams.get("redirect")
        ? navigate(searchParams.get("redirect"))
        : navigate(`/${path.HOME}`);
      setIsSetUpPassword(false);
      resetPayload();
    } else {
      toast.error(response.mes);
    }
  };
  console.log(token);
  return (
    <div className="absolute inset-0 bg-white flex flex-col items-center justify-center z-50">
      <div className="flex flex-col gap-4 w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h4 className="text-lg font-semibold">Thiết lập mật khẩu mới:</h4>
        <input
          type="password"
          className="w-full border-b-2 border-gray-300 outline-none focus:border-blue-500 transition mb-4"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex items-center justify-end w-full gap-4">
          <Button
            children="Gửi"
            handleOnClick={handleSetupPassword}
            style="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
          />
          <Button
            children="Quay lại"
            handleOnClick={() => setIsSetUpPassword(false)}
            style="px-4 py-2 rounded-md text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white transition"
          />
        </div>
      </div>
    </div>
  );
};

export default memo(SetupPassword);
