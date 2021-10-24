import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
// Components
import HomePage from "./components/HomePage";
// api store
import authApi from "./api/authApi";
// reducers
import {
  signin,
  setPendingStatus,
  resetPendingStatus,
} from "./store/reducers/authSlice";
import { setUserData } from "./store/reducers/userSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    Cookies.get("accessToken") !== "none" && dispatch(setPendingStatus());
    const checkAuth = async () => {
      const response = await authApi.auth();
      if (response.success) {
        console.log(response);
        dispatch(signin(response.accessToken));
        dispatch(setUserData(response.userData));
      } else {
        console.log(response);
      }
      dispatch(resetPendingStatus());
    };
    checkAuth();
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <HomePage />
      </div>
    </Router>
  );
}

export default App;
