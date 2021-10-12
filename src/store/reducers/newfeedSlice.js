import { createSlice } from "@reduxjs/toolkit";

export const newfeedSlice = createSlice({
  name: "newfeed",
  initialState: [
    {
      id: "a",
      user: {
        name: "Lady Gaga",
        avatar:
          "https://sre.vn/wp-content/uploads/2020/12/lady-gaga-lan-san-dien-anh-trong-bo-phim-hanh-dong-moi-lady.jpg",
      },
      content: {
        value: "Hello, My name is Lady Gaga!",
        image:
          "https://znews-photo.zadn.vn/w660/Uploaded/rohunwa/2019_03_29/lady_gaga_11_1_thumb.jpg",
        time: "just now",
      },
      reactions: {
        likes: 321,
        comments: 23,
      },
    },
    {
      id: "b",
      user: {
        name: "Quỳnh Hoa",
        avatar:
          "https://scontent.fhan2-2.fna.fbcdn.net/v/t1.6435-9/55576557_2338978699712093_8400321977838993408_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=174925&_nc_ohc=M03HiIbNOA8AX87BXHR&_nc_ht=scontent.fhan2-2.fna&oh=93f4e309ad47e9c563a6412120aeeb22&oe=618AB03B",
      },
      content: {
        value: `Hê hê \r\n BKFS Cup 2019 😘😘😘 #20200420`,
        image:
          "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.6435-9/54358221_2337526049857358_5451961486165409792_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=174925&_nc_ohc=UNbrc6vCoZMAX9ORrPx&tn=JZOqhw_6mOOiWWjn&_nc_ht=scontent.fhan2-3.fna&oh=133f9a628a82d74cbdc364fb870b3f95&oe=618C17B9",
        time: "March 17 2019",
      },
      reactions: {
        likes: 78,
        comments: 18,
      },
    },
    {
      id: "c",
      user: {
        name: "Katy Perry",
        avatar:
          "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/09/01/0/6/f/2/1598941770952_600.jpg",
      },
      content: {
        value: "Katy Perry love you!!!",
        image:
          "https://lh3.googleusercontent.com/proxy/wbZx5DKq7HEMl_MF5NyeaB6JQXzPp0-Vp2BZKjpcmOV9eGnQmMm87qko6ucU2x2pWIQZuLeqWHK6LeqkB6TKudeyayONhuw5TCrpgPqRMafnpecVZ05MwGnSysDATKmbdOZpfqbonxi1WYgs5rut82sbT24N",
        time: "4hrs ago",
      },
      reactions: {
        likes: 412,
        comments: 223,
      },
    },
    {
      id: "d",
      user: {
        name: "Spider-Man",
        avatar:
          "https://miro.medium.com/max/1400/1*TWTaQyGwCzBypcATOdyFbg.jpeg",
      },
      content: {
        value: "I am Spider-Mannnn !!!",
        image:
          "https://img.hulu.com/user/v3/artwork/f82b95f5-13da-4acd-b378-7d3f6864919f?base_image_bucket_name=image_manager&base_image=4b2d95d2-c41b-4ed2-b9d1-cc0f8f80e0a2&region=US&format=jpeg&size=952x536",
        time: "2hrs ago",
      },
      reactions: {
        likes: 4122,
        comments: 2213,
      },
    },
    {
      id: "3",
      user: {
        name: "Spider-Man",
        avatar:
          "https://miro.medium.com/max/1400/1*TWTaQyGwCzBypcATOdyFbg.jpeg",
      },
      content: {
        value: "Hello",
        image: "",
        time: "2hrs ago",
      },
      reactions: {
        likes: 4122,
        comments: 2213,
      },
    },
  ],
  reducers: {
    createPost: (state, action) => {
      state.unshift(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { createPost } = newfeedSlice.actions;

export default newfeedSlice.reducer;
