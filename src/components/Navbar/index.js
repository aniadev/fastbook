import React from "react";
import "./Navbar.css";
//components
import NavUser from "./NavUser";
import NavLoginForm from "../Auth/NavLoginForm";
// redux store
import { useSelector } from "react-redux";

function Navbar() {
  const auth = useSelector((state) => state.auth);
  const handleSearch = (e) => {
    e.preventDefault();
    alert("SEARCH \r\n FEATURE UPDATING");
  };
  return (
    <nav className="navbar navbar-expand">
      <div className="nav-left">
        <div className="navbar-brand pointer">
          <img src={process.env.PUBLIC_URL + "/img/logo.png"} alt="logo" />
          <span className="navbar-brand no-select pointer ml-2">Fakebook</span>
        </div>
        <div className="nav-search">
          <form onSubmit={(e) => handleSearch(e)}>
            <input type="search" placeholder="Search" aria-label="Search" />
          </form>
        </div>
      </div>
      {auth.isAuthenticated ? <NavUser /> : <NavLoginForm />}
    </nav>
  );
}

export default Navbar;
