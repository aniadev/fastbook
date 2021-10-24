import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    pendingStatus: true,
    accessToken: "",
  },
  reducers: {
    signin: (state, action) => {
      state.isAuthenticated = true;
      let accessToken = action.payload;
      state.accessToken = accessToken;
      state.pendingStatus = false;
      Cookies.set("accessToken", accessToken, { expires: 7 });
    },
    signout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = "";
      Cookies.remove("accessToken");
    },
    setPendingStatus: (state) => {
      state.pendingStatus = true;
    },
    resetPendingStatus: (state) => {
      state.pendingStatus = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signin, signout, setPendingStatus, resetPendingStatus } =
  authSlice.actions;

export default authSlice.reducer;
