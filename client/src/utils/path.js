const path = {
  PUBLIC: "/",
  HOME: "",
  LOGIN: "login",
  ALL: "*",
  PRODUCTS: ":category",
  BLOGS: "blogs",
  OUR_SERVICES: "services",
  FAQS: "faqs",
  DETAIL_PRODUCT__CATEGORY__PID__TITLE: "/:category/:pid/:title",
  FINALREGISTER: "finalregister/:status",
  RESETPASSWORD: "reset-password/:token",
  DETAIL_CART: "my-cart",
  CHECKOUT: "checkout",

  //admin
  ADMIN: "admin",
  DASHBOARD: "dashboard",
  MANAGE_USER: "manage-user",
  MANAGE_PRODUCT: "manage-product",
  MANAGE_ORDER: "manage-order",
  CREATE_PRODUCT: "create-product",

  //member
  MEMBER: "member",
  PERSIONAL: "persional",
  MYCART: "mycart",
  WISHLIST: "wishlist",
  HISTORY: "history",
};

export default path;
