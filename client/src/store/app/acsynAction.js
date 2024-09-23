import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetCategories } from "../../apis/app";

export const getCategories = createAsyncThunk(
  "app/categories",
  async (data, { rejectWithValue }) => {
    const response = await apiGetCategories();
    if (!response?.success) return rejectWithValue(response);
    return response.category;
  }
);
