import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    accessToken: "",
  },
  reducers: {
    signin: (state, action) => {
      state.isAuthenticated = true;
      let accessToken = action.payload;
      state.accessToken = accessToken;
      Cookies.set("accessToken", accessToken, { expires: 7 });
    },
    signout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = "";
      Cookies.set("accessToken", "none", { expires: 7 });
    },
  },
});

// Action creators are generated for each case reducer function
export const { signin, signout } = authSlice.actions;

export default authSlice.reducer;
