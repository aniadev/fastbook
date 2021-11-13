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
    postReacted: [], // id
  },
  reducers: {
    reactPost: (state, action) => {
      state.postReacted.push(action.payload);
      // alert("user: " + state.userId + " like post id: " + action.payload);
      alert("LIKE \n FEATURE UPDATING");
      // console.log("React Post " + action.payload);
    },
    unReactPost: (state, action) => {
      var index = state.postReacted.indexOf(action.payload);
      state.postReacted.splice(index, 1);
      // alert("user: " + state.userId + " unlike post id: " + action.payload);
      alert("UNLIKE \n FEATURE UPDATING");
      // console.log("UnReact Post " + action.payload);
    },
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
  },
});

// Action creators are generated for each case reducer function
export const { reactPost, unReactPost, setUserData } = userSlice.actions;

export default userSlice.reducer;
