/* eslint-disable array-callback-return */
import { createSlice } from "@reduxjs/toolkit";

export const newfeedSlice = createSlice({
  name: "newfeed",
  initialState: {
    posts: [
      {
        // default post
        postId: 0,
        userId: 9,
        name: "Quỳnh Hoa",
        avatar: "https://i.ibb.co/n12nYGH/2b1559f3d963.jpg",
        content: `Hê hê \r\n BKFS Cup 2019 😘😘😘 #20200420`,
        image: "https://i.ibb.co/VBqjxsL/08c9dbac7b61.jpg",
        time: "March 17 2019",
        likes: 78,
        comments: 18,
        likeId: null,
      },
    ],
    onRefresh: false,
    page: 1,
    currentPostDelete: null,
    currentContentEdit: null,
  },
  reducers: {
    initPosts: (state, action) => {
      let posts = action.payload;
      state.posts.length = 0; // clear newfeed after initializing
      [...state.posts] = posts;
    },
    createPost: (state, action) => {
      // from user
      state.posts.unshift(action.payload);
    },
    addMorePosts: (state, action) => {
      let posts = action.payload;
      state.posts = [...state.posts, ...posts];
    },
    deletePost: (state, action) => {
      // console.log("deletePost: " + action.payload);
      let deleteIndex = state.posts.findIndex(
        (el) => el.postId === action.payload
      );
      if (deleteIndex >= 0) state.posts.splice(deleteIndex, 1);
    },
    setDeletePost: (state, action) => {
      state.currentPostDelete = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    reactPost: (state, action) => {
      // react post with postId
      state.posts.map((post) => {
        if (post.postId === action.payload) {
          post.likeId = 1;
          post.likes += 1;
        }
      });
    },
    unReactPost: (state, action) => {
      state.posts.map((post) => {
        if (post.postId === action.payload) {
          post.likeId = null;
          post.likes -= 1;
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  createPost,
  initPosts,
  deletePost,
  setDeletePost,
  setPage,
  addMorePosts,
  reactPost,
  unReactPost,
} = newfeedSlice.actions;

export default newfeedSlice.reducer;
