import {createSlice} from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userData: {
      userId: 0,
      name: "",
      username: "",
      email: "",
      avatar: "",
      birthday: null,
      address: null,
      coverPhoto: null,
      blueTick: 0,
    },
    posts: [],
  },
  reducers: {
    setProfilePosts: (state, action) => {
      [...state.posts] = action.payload;
    },
    setProfileData: (state, action) => {
      state.userData = {...action.payload};
    },
    reactPost: (state, action) => {
      let postId = action.payload;
      state.posts = state.posts.map((post) =>
        post.postId !== postId
          ? post
          : {...post, likeId: 1, likes: post.likes + 1}
      );
    },
    unReactPost: (state, action) => {
      let postId = action.payload;
      state.posts = state.posts.map((post) =>
        post.postId !== postId
          ? post
          : {...post, likeId: null, likes: post.likes - 1}
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {setProfilePosts, setProfileData, reactPost, unReactPost} =
  profileSlice.actions;

export default profileSlice.reducer;
