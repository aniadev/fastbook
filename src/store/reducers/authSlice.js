import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    signin: (state) => {
      state.isAuthenticated = true;
    },
    signout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signin, signout } = authSlice.actions;

export default authSlice.reducer;
