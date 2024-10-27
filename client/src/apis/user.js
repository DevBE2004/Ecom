import axios from "../axios";

export const apiRegister = (data) =>
  axios({
    url: "/user/register/",
    method: "post",
    data,
    // withCredentials: true,
  });
export const apiFinalRegister = (token) =>
  axios({
    url: "/user/finalregister/" + token,
    method: "post",
  });
export const apiLogin = (data) =>
  axios({
    url: "/user/login/",
    method: "post",
    data,
  });

export const apiForgotPassword = (data) =>
  axios({
    url: "/user/forgotpassword/",
    method: "post",
    data,
  });
export const apiResetPassword = (data) =>
  axios({
    url: "/user/resetpassword/",
    method: "put",
    data,
  });
export const apiGetCurrent = () =>
  axios({
    url: "/user/current/",
    method: "get",
  });
export const apiGetUsers = (params) =>
  axios({
    url: "/user/",
    method: "get",
    params,
  });

export const apiUpdatedUsers = (data, uid) =>
  axios({
    url: "/user/" + uid,
    method: "put",
    data,
  });
export const apiUpdatedCurrent = (data) =>
  axios({
    url: "user/updateuser/",
    method: "put",
    data,
  });

export const apiDeleteUsers = (uid) =>
  axios({
    url: "/user/deleteuser/" + uid,
    method: "delete",
  });
export const apiUpdateCart = (data) =>
  axios({
    url: "/user/cart/",
    method: "put",
    data,
  });
export const apiRemoveCart = (pid, color) =>
  axios({
    url: `/user/remove-cart/${pid}/${color}`,
    method: "delete",
  });
export const apiUpdateWishlist = (pid) =>
  axios({
    url: `/user/wishlist/` + pid,
    method: "put",
  });

export const apiGetCredentialsFromGoogle = (accessToken) =>
  axios({
    method: "get",
    url:
      "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" +
      accessToken,
  });
export const apiCheckNewUser = (email) =>
  axios({
    method: "get",
    url: "/user/has-user/" + email,
  });
export const apiSiginWithGoogle = (data) =>
  axios({
    method: "post",
    url: "/user/google/",
    data,
  });
