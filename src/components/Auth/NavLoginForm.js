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
      <div>
        <form className="nav-login-form" onSubmit={(e) => loginHandler(e)}>
          <div className="input-login">
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
              autoComplete="off"
              required
            />
          </div>
          <div className="btn-login">
            <button className="nav-login-btn">Sign in</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default NavLoginForm;
