import axios from "../axios";

export const apiGetProducts = (params) =>
  axios({
    url: "/product/",
    method: "get",
    params,
  });
export const apiGetProduct = (pid) =>
  axios({
    url: "/product/" + pid,
    method: "get",
  });
export const apiCreateProduct = (data) =>
  axios({
    url: "product/create/",
    method: "post",
    data,
  });

export const apiRatings = (data) =>
  axios({
    url: "product/ratings/",
    method: "put",
    data,
  });

export const apiUpdate = (data, pid) =>
  axios({
    url: "product/update/" + pid,
    method: "put",
    data,
  });
export const apiDelete = (pid) =>
  axios({
    url: "product/delete/" + pid,
    method: "delete",
  });
export const apiAddVariants = (data, pid) =>
  axios({
    url: "product/variants/" + pid,
    method: "put",
    data,
  });
export const apiCreateOrder = (data) =>
  axios({
    url: "order/create/",
    method: "post",
    data,
  });
export const apiGetOrders = (params) =>
  axios({
    url: "order/admin",
    method: "get",
    params,
  });
  export const apiGetUserOrder = (params) =>
  axios({
    url: "order/",
    method: "get",
    params,
  });
