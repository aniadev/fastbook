import React from "react";
import "./Sidebar.css";
import UserProfileItem from "../UserProfileItem";
// redux store
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const user = useSelector((state) => state.user);
  return (
    <div className="menu">
      <ul>
        <li>
          <NavLink
            to={`/${user.userId}`}
            className="menu-item"
            activeClassName="sidebar-active"
          >
            <UserProfileItem name={user.name} avatar={user.avatar} />
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to="/"
            className="menu-item"
            activeClassName="sidebar-active"
          >
            <i className="fa fas fa-home"></i>
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/messenger"
            className="menu-item"
            activeClassName="sidebar-active"
          >
            <i className="fab fa-facebook-messenger"></i>
            <span>Messenger</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/friends"
            className="menu-item"
            activeClassName="sidebar-active"
          >
            <i className="fas fa-users"></i>
            <span>Friends</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
