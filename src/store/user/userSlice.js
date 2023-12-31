import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncActions";
const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    token: null,
    isLogginned: false,
    isLoading: false,
    isRegister: false,
    mes: "",
    han: false,
  },
  reducers: {
    logout: (state, action) => {
      state.isLogginned = false;
      state.token = null;
    },
    loginSc: (state, action) => {
      state.isLogginned = true;
      state.token = action.payload?.token;
    },
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(actions.getCurrent.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(actions.getCurrent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload?.userData;
        state.han = false;
      })
      .addCase(actions.getCurrent.rejected, (state, action) => {
        state.isLoading = false;

        state.data = null;
        state.han = true;
      });
  },
});

export const { logout, loginSc } = userSlice.actions;
export default userSlice.reducer;
