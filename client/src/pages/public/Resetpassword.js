import React, { useState } from "react";
import { Button } from "components";
import { useNavigate, useParams } from "react-router-dom";
import { apiResetPassword } from "apis/user";
import { toast } from "react-toastify";

const Resetpassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const handleResetPassword = async () => {
    const response = await apiResetPassword({ password, token });
    if (response.success) {
      toast.success(response.message, { theme: "colored" });
      navigate("/login");
    } else toast.info(response.message, { theme: "colored" });
  };
  return (
    <div className="animate-slide-right top-0 left-0 bottom-0 right-0 bg-white flex flex-col items-center py-8 z-50">
    <div className="flex flex-col gap-6 w-full max-w-md">
      <label htmlFor="password" className="font-semibold text-lg">
        Enter your password:
      </label>
      <input
        type="password"
        id="password"
        className="w-full pb-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 transition"
        placeholder="Enter your new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex items-center justify-end w-full">
        <Button
          children="Reset Password"
          name="Submit"
          handleOnClick={handleResetPassword}
          style="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition"
        />
      </div>
    </div>
  </div>
  );
};

export default Resetpassword;
