import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import newfeedReducer from "./reducers/newfeedSlice";
import userReducer from "./reducers/userSlice";
import profileReducer from "./reducers/profileSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    newfeedPost: newfeedReducer,
    profile: profileReducer,
  },
});
