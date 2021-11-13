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
      avatar: "https://i.ibb.co/n12nYGH/2b1559f3d963.jpg",
    },
    {
      userId: "1",
      name: "Phạm Công Hải",
      avatar: "https://i.ibb.co/kHgmGCL/dfbbd8c468bb.jpg",
    },
    {
      userId: "uid04",
      name: "Angel",
      avatar: "https://i.ibb.co/LNx1TGy/3da46d055729.jpg",
    },
  ],
  reducers: {},
});

// Action creators are generated for each case reducer function
export const { signin, signout } = onlineUsersSlice.actions;

export default onlineUsersSlice.reducer;
