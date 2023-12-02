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
