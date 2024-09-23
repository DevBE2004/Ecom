import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "./acsynAction";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    current: null,
    token: null, //accessToken
    isLoading: false,
    mes: "",
    currentCart: [],
  },
  reducers: {
    login: (state, action) => {
      state.isLogin = action.payload.isLogin;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      state.isLogin = false;
      state.token = null;
      state.current = null;
      state.isLoading = false;
      state.mes = "";
    },
    clearMessage: (state) => {
      state.mes = "";
    },
    updateCart: (state, action) => {
      const { color, quantity, pid } = action.payload;
      const updatingCart = JSON.parse(JSON.stringify(state.currentCart));
      // const updateItem = state.currentCart.find((el) => el.color === color && el?.product?._id === pid);
      // if (updateItem) updateItem.quantity = quantity;
      // else state.mes = "Please try later!"
      state.currentCart = updatingCart?.map((el) => {
        if (el.color === color && el?.product?._id === pid) {
          return { ...el, quantity };
        } else return el;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.current = action.payload;
      state.isLogin = true;
      state.currentCart = action.payload.cart;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
      state.current = null;
      state.isLogin = false;
      state.token = null;
      state.mes = "Phiên đăng nhập đã hết hạn! hãy đăng nhập lại ";
    });
  },
});
export const { login, logout, clearMessage, updateCart } = userSlice.actions;

export default userSlice.reducer;
