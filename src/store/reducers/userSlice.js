import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "Phạm Hải",
    avatar:
      "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.6435-9/83784115_1152812378443907_8576028218039992320_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=a4a2d7&_nc_ohc=5cSsDJVykaoAX-Sza3t&_nc_ht=scontent.fhan2-3.fna&oh=168dffb7aa8a7c26ec4a5ad98e47ba5e&oe=618A002F",
    postReacted: ["a", "b"], // id
  },
  reducers: {
    reactPost: (state, action) => {
      state.postReacted.push(action.payload);
      // console.log("React Post " + action.payload);
    },
    unReactPost: (state, action) => {
      var index = state.postReacted.indexOf(action.payload);
      state.postReacted.splice(index, 1);
      // console.log("UnReact Post " + action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { reactPost, unReactPost } = userSlice.actions;

export default userSlice.reducer;
