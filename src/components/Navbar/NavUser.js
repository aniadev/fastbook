import React from "react";
import { Link } from "react-router-dom";
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
      <Link className="navbar-user no-select" to={`/${user.userId}`}>
        <img src={user.avatar} width="36" height="36" alt="avatar" />
        <span className="navbar-user__name">{user.name}</span>
        {user.blueTick ? (
          <span className="app__blue-tick">
            <i className="fas fa-check-circle"></i>
          </span>
        ) : (
          false
        )}
      </Link>

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
          <Link className="dropdown-item" to="./me">
            My profile
          </Link>
          <Link className="dropdown-item" to="./messenger">
            Messenger
          </Link>
          <Link className="dropdown-item" to="./friends">
            Friends
          </Link>
          <div className="dropdown-divider"></div>
          <Link className="dropdown-item" to="/" onClick={() => logout()}>
            Logout
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}

export default NavUser;
