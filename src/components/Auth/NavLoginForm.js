import React from "react";
import { useDispatch } from "react-redux";
import { signin } from "../../store/reducers/authSlice";
import { setUserData } from "../../store/reducers/userSlice";
import authApi from "../../api/authApi";

function NavLoginForm() {
  const dispatch = useDispatch();
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await authApi.login({
        username: e.target.username.value,
        password: e.target.password.value,
      });
      if (response.success) {
        dispatch(signin(response.accessToken));
        dispatch(setUserData(response.userData));
      } else {
        alert("Fail: " + response.message);
      }
    } catch (error) {
      console.log("Failed to login: " + error.message);
    }
  };

  return (
    <React.Fragment>
      <div className="nav-login-form">
        <form action="" onSubmit={(e) => loginHandler(e)}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            autoComplete="off"
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          <button className="nav-login-btn">Sign in</button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default NavLoginForm;
