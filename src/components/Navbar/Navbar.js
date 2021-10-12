import React from "react";
import "./Navbar.css";
// redux store
import { useSelector } from "react-redux";

function Navbar() {
  const user = useSelector((state) => state.user);
  return (
    <nav className="navbar navbar-expand-sm">
      <div className="navbar-brand mr-1 pointer">
        <img
          src={process.env.PUBLIC_URL + "/img/logo.png"}
          width="40"
          height="40"
          alt="logo"
        />
      </div>
      <span className="navbar-brand mb-0 no-select pointer">Fakebook</span>

      {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-dropdown" aria-controls="navbar-dropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button> */}
      <form className="form-search">
        <input type="search" placeholder="Search" aria-label="Search" />
      </form>

      <div className="navbar-user no-select">
        <img src={user.avatar} width="36" height="36" alt="avatar" />
        <p>{user.username}</p>
      </div>

      <div className="dropdown">
        <button
          className="dropdown-toggle btn-sm"
          id="bd-versions"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        ></button>
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
          <a className="dropdown-item" href="http://anicorp.tk">
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
