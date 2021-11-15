import React, { useState } from "react";
import "./LoginPage.css";
import authApi from "../../api/authApi";

function RegisterPage() {
  const initialState = {
    name: "",
    username: "",
    email: "",
    password: "",
    repassword: "",
  };
  const [regData, setRegData] = useState(initialState);
  const handleChange = (e) => {
    // console.log(e.target.name);
    // let newField = { [e.target.name]: e.target.value };
    setRegData({ ...regData, [e.target.name]: e.target.value });
  };

  const registerFormHandler = async (e) => {
    e.preventDefault();
    if (regData.repassword === regData.password) {
      try {
        const response = await authApi.register({
          name: regData.name,
          username: regData.username,
          password: regData.password,
          email: regData.email,
        });

        if (response.success) {
          alert("Register successfull !");
          setRegData(initialState);
        } else {
          alert(response.message);
        }
      } catch (error) {
        console.log("Error registering: " + error);
      }
    } else {
      alert("Confirm Password Error");
    }
  };

  return (
    <div className="reg-panel">
      <div className="card bg-dark">
        <article className="card-body mx-auto" style={{ maxWidth: "400px" }}>
          <h4 className="card-title mt-3 text-center">Create Account</h4>
          <p className="text-center">Get started with your free account</p>
          <p>
            <span className="btn btn-block btn-twitter">
              {" "}
              <i className="fab fa-twitter"></i>   Login via Twitter
            </span>
            <span className="btn btn-block btn-google">
              {" "}
              <i className="fab fa-google"></i>   Login via Google
            </span>
          </p>
          <p className="divider-text">
            <span className="bg-dark">OR</span>
          </p>
          <form onSubmit={(e) => registerFormHandler(e)}>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-user"></i>{" "}
                </span>
              </div>
              <input
                name="name"
                className="form-control"
                placeholder="Tên hiển thị (*)"
                type="text"
                autoComplete="off"
                required
                value={regData.name}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-user"></i>{" "}
                </span>
              </div>
              <input
                name="username"
                className="form-control"
                placeholder="Tên đăng nhập (*)"
                type="text"
                autoComplete="off"
                required
                value={regData.username}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-envelope"></i>{" "}
                </span>
              </div>
              <input
                name="email"
                className="form-control"
                placeholder="Email (tùy chọn)"
                autoComplete="off"
                type="email"
                value={regData.email}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-lock"></i>{" "}
                </span>
              </div>
              <input
                className="form-control"
                placeholder="Mật khẩu (*)"
                autoComplete="off"
                name="password"
                type="password"
                required
                value={regData.password}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-lock"></i>{" "}
                </span>
              </div>
              <input
                className="form-control"
                name="repassword"
                placeholder="Nhập lại mật khẩu (*)"
                autoComplete="off"
                type="password"
                required
                value={regData.repassword}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                {" "}
                Đăng ký{" "}
              </button>
            </div>
          </form>
        </article>
      </div>{" "}
    </div>
  );
}

export default RegisterPage;
