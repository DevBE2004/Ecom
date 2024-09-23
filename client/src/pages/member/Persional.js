import { Button, InputForm } from "components";
import React, { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import avt from "assets/avt.png";
import { apiUpdatedCurrent } from "apis/user";
import { getUser } from "store/user/acsynAction";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import withBaseComponent from "hocs/withBaseComponent";

const Persional = ({ navigate }) => {
  const {
    reset,
    formState: { errors, isDirty },
    handleSubmit,
    register,
  } = useForm();
  const { current } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const handleUpdateInfo = async (data) => {
    const formData = new FormData();
    if (data?.avatar?.length > 0) formData.append("avatar", data?.avatar[0]);
    delete data?.avatar;
    for (let [key, value] of Object.entries(data)) formData.append(key, value);

    const response = await apiUpdatedCurrent(formData);
    if (response.success) {
      dispatch(getUser());
      toast.success(response.message);
      if (searchParams.get("redirect")) navigate(searchParams.get("redirect"));
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    reset({
      firstname: current?.firstname,
      lastname: current?.lastname,
      email: current?.email,
      mobile: current?.mobile,
      avatar: current?.avatar,
      address: current?.address,
    });
  }, [current, reset]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <header className="text-3xl text-center text-main font-semibold mb-6 border-b-2 border-b-main">
        Personal Information
      </header>
      <form onSubmit={handleSubmit(handleUpdateInfo)} className="space-y-6">
        <div>
          <InputForm
            label="Firstname"
            register={register}
            errors={errors}
            id="firstname"
            style="w-full"
            validate={{ required: "First name is required" }}
          />
        </div>
        <div>
          <InputForm
            label="Lastname"
            register={register}
            errors={errors}
            id="lastname"
            style="w-full"
            validate={{ required: "Last name is required" }}
          />
        </div>
        <div>
          <InputForm
            label="Email"
            register={register}
            errors={errors}
            id="email"
            style="w-full"
            validate={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Enter a valid e-mail address",
              },
            }}
          />
        </div>
        <div>
          <InputForm
            label="Phone"
            register={register}
            errors={errors}
            id="mobile"
            style="w-full"
            validate={{
              required: "Phone is required",
              pattern: {
                value: /^(0|\+)[0-9]{9}$/,
                message: "Enter a valid phone number",
              },
            }}
          />
        </div>
        <div>
          <InputForm
            label="Address"
            register={register}
            errors={errors}
            id="address"
            style="w-full"
            validate={{ required: "Address is required" }}
          />
        </div>

        <div className="mt-4">
          <span className="font-semibold">Account Status:</span>
          <span className="ml-2">
            {current?.isBlocked ? "Blocked" : "Active"}
          </span>
        </div>
        <div>
          <span className="font-semibold">Account Role:</span>
          <span className="ml-2">
            {+current?.role === 1 ? "Admin" : "User"}
          </span>
        </div>
        <div>
          <span className="font-semibold">Account Created:</span>
          <span className="ml-2">
            {moment(current?.createdAt).format("DD/MM/YYYY")}
          </span>
        </div>
        <div className="flex items-center mt-4">
          <span className="font-semibold">Profile Image:</span>
          <label htmlFor="file" className="ml-4 cursor-pointer">
            <img
              src={current?.avatar || avt}
              className="w-10 h-10 rounded-full border-2 border-gray-300"
              alt="Profile"
            />
          </label>
          <input type="file" {...register("avatar")} id="file" hidden />
        </div>

        <div className="flex items-center justify-center mt-6">
          <Button type="submit">Update Information</Button>
        </div>
      </form>
    </div>
  );
};

export default withBaseComponent(memo(Persional));
