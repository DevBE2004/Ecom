import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetProducts } from "apis/product";

export const getNewProduct = createAsyncThunk(
  "product/newproduct",
  async (data, { rejectWithValue }) => {
    const response = await apiGetProducts({ sort: "-createdAt" });
    if (!response?.success) return rejectWithValue(response);
    return response.productDatas;
  }
);
