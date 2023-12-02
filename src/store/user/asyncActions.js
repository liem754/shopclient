import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "api";
export const getCurrent = createAsyncThunk(
  `getuser`,
  async (data, { rejectWithValue }) => {
    try {
      const rs = await api.apiGetOne();
      return rs.data;
    } catch (error) {
      return rejectWithValue(error.data.mes);
    }
  }
);

export const login = createAsyncThunk(
  `login`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.apilogin(data);
      if (response.data.err !== 0) return rejectWithValue(response.data.mes);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.data.mes);
    }
  }
);
