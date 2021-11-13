import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
// Components
import HomePage from "./components/HomePage";
import PostDeleteModal from "./components/Tools/PostDeleteModal"; // TOOLS
// api store
import authApi from "./api/authApi";
// reducers
import {
  signin,
  setPendingStatus,
  resetPendingStatus,
  setErrorStatus,
} from "./store/reducers/authSlice";
import { setUserData } from "./store/reducers/userSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import AvatarUploader from "./components/Tools/AvatarUploader";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    Cookies.get("accessToken") !== "none" && dispatch(setPendingStatus());
    const checkAuth = async () => {
      const response = await authApi.auth();
      if (response.success) {
        // console.log(response);
        dispatch(signin(response.accessToken));
        dispatch(setUserData(response.userData));
        dispatch(resetPendingStatus());
      } else {
        console.log(response.status);
        response.status === 408 && dispatch(setErrorStatus(response.message));
        response.status === 401 && dispatch(resetPendingStatus());
      }
    };
    checkAuth();
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <HomePage />
        <PostDeleteModal />
        <AvatarUploader />
      </div>
    </Router>
  );
}

export default App;
