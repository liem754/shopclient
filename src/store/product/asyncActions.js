import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "api";
export const getCategory = createAsyncThunk(
  "getCategory",
  async (data, { rejectWithValue }) => {
    try {
      const rs = await api.getCategorys();
      return rs.data.categorys;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getProductss = createAsyncThunk(
  "getProducts",
  async (data, { rejectWithValue }) => {
    try {
      const rs = await api.getProducts(data);
      return rs.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getProductbyId = createAsyncThunk(
  "getProductbyId",
  async (pid, { rejectWithValue }) => {
    try {
      const rs = await api.getProduct(pid);
      return rs.data.productData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
