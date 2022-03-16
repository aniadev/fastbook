import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    userData: {
      userId: 0,
      name: '',
      username: '',
      email: '',
      avatar: '',
      birthday: null,
      address: null,
      coverPhoto: null,
      blueTick: 0,
    },
    posts: [
      {
        // default post
        postId: 114,
        userId: 1,
        content: 'Đã cập nhật ảnh đại diện.',
        image: 'https://i.ibb.co/9G5G3Sj/fe73f3bffca4.gif',
        likes: 6,
        comments: 4,
        likeId: 16,
        time: '2021-11-17T21:00:30.000Z',
      },
    ],
  },
  reducers: {
    setProfilePosts: (state, action) => {
      [...state.posts] = action.payload;
    },
    setProfileData: (state, action) => {
      console.log(action.payload);
      state.userData = { ...action.payload };
    },
    reactPost: (state, action) => {
      let postId = action.payload;
      state.posts = state.posts.map((post) =>
        post.postId !== postId
          ? post
          : { ...post, likeId: 1, likes: post.likes + 1 }
      );
    },
    unReactPost: (state, action) => {
      let postId = action.payload;
      state.posts = state.posts.map((post) =>
        post.postId !== postId
          ? post
          : { ...post, likeId: null, likes: post.likes - 1 }
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProfilePosts, setProfileData, reactPost, unReactPost } =
  profileSlice.actions;

export default profileSlice.reducer;
