import { createSlice } from "@reduxjs/toolkit";

export const onlineUsersSlice = createSlice({
  name: "onlineUsers",
  initialState: [
    {
      userId: "uid01",
      name: "Maria Ozawa",
      avatar:
        "https://autopro8.mediacdn.vn/k:thumb_w/640/2016/1438153862-1438136585-maria-ozawa-2-1451987734499/thanh-nu-maria-ozawa-roi-rit-xin-loi-sau-khi-gay-tai-nan-o-to.jpg",
    },
    {
      userId: "uid02",
      name: "Barack Omachi",
      avatar:
        "https://static.tuoitre.vn/tto/i/s626/2016/02/16/obama-1455596621.jpg",
    },
    {
      userId: "uid00",
      name: "Quỳnh Hoa",
      avatar:
        "https://scontent.fhan2-2.fna.fbcdn.net/v/t1.6435-9/55576557_2338978699712093_8400321977838993408_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=174925&_nc_ohc=M03HiIbNOA8AX87BXHR&_nc_ht=scontent.fhan2-2.fna&oh=93f4e309ad47e9c563a6412120aeeb22&oe=618AB03B",
    },
    {
      userId: "uid03",
      name: "Lady Gaga",
      avatar:
        "https://sre.vn/wp-content/uploads/2020/12/lady-gaga-lan-san-dien-anh-trong-bo-phim-hanh-dong-moi-lady.jpg",
    },
    {
      userId: "uid04",
      name: "Angel",
      avatar: "https://i.ibb.co/LNx1TGy/3da46d055729.jpg",
    },
    {
      userId: "uid05",
      name: "Angel",
      avatar: "https://i.ibb.co/LNx1TGy/3da46d055729.jpg",
    },
    {
      userId: "uid06",
      name: "Angel",
      avatar: "https://i.ibb.co/LNx1TGy/3da46d055729.jpg",
    },
    {
      userId: "uid07",
      name: "Angel",
      avatar: "https://i.ibb.co/LNx1TGy/3da46d055729.jpg",
    },
    {
      userId: "uid08",
      name: "Angel",
      avatar: "https://i.ibb.co/LNx1TGy/3da46d055729.jpg",
    },
  ],
  reducers: {},
});

// Action creators are generated for each case reducer function
export const { signin, signout } = onlineUsersSlice.actions;

export default onlineUsersSlice.reducer;
