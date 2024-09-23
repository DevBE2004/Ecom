import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  Login,
  Public,
  Service,
  DetalProduct,
  FAQ,
  Blog,
  FinalRegister,
  Resetpassword,
  Products,
  DetailCart,
} from "pages/public";
import {
  AdminLayout,
  ManageOrder,
  ManageProduct,
  ManageUser,
  DashBoard,
  CreateProduct,
} from "pages/admin";
import {
  MemberLayout,
  Persional,
  WishList,
  History,
  Checkout,
} from "pages/member";
import path from "utils/path";
import { getCategories } from "store/app/acsynAction";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Cart, Modal } from "components";
import { showCart } from "store/app/appSlice";

function App() {
  const { isShowModal, modalChildren, isShowCart } = useSelector(
    (state) => state.app
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <div className="font-KdamThmorPro h-screen relative">
      {isShowCart && (
        <div
          onClick={() => dispatch(showCart())}
          className="absolute flex justify-end bg-overlay w-full h-full z-50 "
        >
          <Cart />
        </div>
      )}
      {isShowModal && <Modal>{modalChildren}</Modal>}

      <Routes>
        <Route path={path.RESETPASSWORD} element={<Resetpassword />} />
        <Route path={path.CHECKOUT} element={<Checkout />} />
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.BLOGS} element={<Blog />} />
          <Route
            path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE}
            element={<DetalProduct />}
          />

          <Route path={path.OUR_SERVICES} element={<Service />} />
          <Route path={path.FAQS} element={<FAQ />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route path={path.ALL} element={<Home />} />
        </Route>

        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.FINALREGISTER} element={<FinalRegister />} />

        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.MANAGE_ORDER} element={<ManageOrder />} />
          <Route path={path.MANAGE_PRODUCT} element={<ManageProduct />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.DASHBOARD} element={<DashBoard />} />
          <Route path={path.CREATE_PRODUCT} element={<CreateProduct />} />
        </Route>

        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PERSIONAL} element={<Persional />} />
          <Route path={path.MYCART} element={<DetailCart />} />
          <Route path={path.WISHLIST} element={<WishList />} />
          <Route path={path.HISTORY} element={<History />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default App;
