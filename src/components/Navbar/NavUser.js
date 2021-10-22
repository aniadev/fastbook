import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../../store/reducers/authSlice";

function NavUser() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signout());
    console.log("signed out");
  };
  return (
    <React.Fragment>
      <div className="navbar-user no-select">
        <img src={user.avatar} width="36" height="36" alt="avatar" />
        <p>{user.name}</p>
      </div>

      <div className="dropdown">
        <button
          className="btn-sm"
          id="bd-versions"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i className="fas fa-cog"></i>
        </button>
        <div
          className="dropdown-menu dropdown-menu-right"
          aria-labelledby="bd-versions"
        >
          <a className="dropdown-item" href="http://anicorp.tk">
            My profile
          </a>
          <a className="dropdown-item" href="http://anicorp.tk">
            Messenger
          </a>
          <a className="dropdown-item" href="http://anicorp.tk">
            Friends
          </a>
          <div className="dropdown-divider"></div>
          <span className="dropdown-item" onClick={() => logout()}>
            Logout
          </span>
        </div>
      </div>
    </React.Fragment>
  );
}

export default NavUser;
