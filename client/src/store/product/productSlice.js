import { createSlice } from "@reduxjs/toolkit";
import { getNewProduct } from "./acsynAction";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    newProduct: null,
    errorMessage: "",
    dealDaily: null,
  },
  reducers: {
    getDealDaily: (state, action) => {
      state.dealDaily = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNewProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNewProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.newProduct = action.payload;
    });
    builder.addCase(getNewProduct.rejected, (state, action) => {
      state.isLoading = true;
      state.errorMessage = action.payload.message;
    });
  },
});
export const { getDealDaily } = productSlice.actions;

export default productSlice.reducer;
