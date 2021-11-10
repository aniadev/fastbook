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
      <form className="form-search" onSubmit={(e) => handleSearch(e)}>
        <input type="search" placeholder="Search" aria-label="Search" />
      </form>
      {auth.isAuthenticated ? <NavUser /> : <NavLoginForm />}
    </nav>
  );
}

export default Navbar;
