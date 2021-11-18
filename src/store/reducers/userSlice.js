import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    name: "",
    username: "",
    avatar: "",
    email: "",
    blueTick: 0,
  },
  reducers: {
    setUserData: (state, action) => {
      const data = action.payload;
      for (let property in data) {
        state[property] = data[property];
      }
      // state.userId = userId;
      // state.username = username;
      // state.avatar = avatar;
      // state.name = name;
      // state.email = email || "";
      // state.blueTick = blueTick || 0;
    },
    clearUserData: (state) => {
      state = {
        userId: null,
        name: "",
        username: "",
        avatar: "",
        email: "",
        blueTick: 0,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
