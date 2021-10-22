/* eslint-disable array-callback-return */
import { createSlice } from "@reduxjs/toolkit";

export const newfeedSlice = createSlice({
  name: "newfeed",
  initialState: [
    {
      // default post
      postId: "pid00",
      userId: "2",
      name: "Quỳnh Hoa",
      avatar:
        "https://scontent.fhan2-2.fna.fbcdn.net/v/t1.6435-9/55576557_2338978699712093_8400321977838993408_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=174925&_nc_ohc=M03HiIbNOA8AX87BXHR&_nc_ht=scontent.fhan2-2.fna&oh=93f4e309ad47e9c563a6412120aeeb22&oe=618AB03B",
      content: `Hê hê \r\n BKFS Cup 2019 😘😘😘 #20200420`,
      image:
        "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.6435-9/54358221_2337526049857358_5451961486165409792_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=174925&_nc_ohc=UNbrc6vCoZMAX9ORrPx&tn=JZOqhw_6mOOiWWjn&_nc_ht=scontent.fhan2-3.fna&oh=133f9a628a82d74cbdc364fb870b3f95&oe=618C17B9",
      time: "March 17 2019",
      likes: 78,
      comments: 18,
    },
  ],
  reducers: {
    initPosts: (state, action) => {
      let posts = action.payload;
      state.length = 0; // renew newfeed
      posts.map((post) => {
        state.unshift(post);
      });
    },
    createPost: (state, action) => {
      state.unshift(action.payload);
    },
    addMorePosts: (state, action) => {
      state.unshift(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { createPost, initPosts } = newfeedSlice.actions;

export default newfeedSlice.reducer;
