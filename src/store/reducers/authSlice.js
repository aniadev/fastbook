import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    pendingStatus: true,
    errorStatus: false,
    errorMessage: "",
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
    setErrorStatus: (state, action) => {
      state.errorStatus = true;
      state.errorMessage = action.payload;
    },
    resetErrorStatus: (state) => {
      state.errorStatus = false;
      state.errorMessage = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  signin,
  signout,
  setPendingStatus,
  resetPendingStatus,
  setErrorStatus,
  resetErrorStatus,
} = authSlice.actions;

export default authSlice.reducer;
