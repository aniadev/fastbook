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
            <UserProfileItem
              name={user.name}
              avatar={user.avatar}
              blueTick={user.blueTick}
            />
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to="/"
            className="menu-item"
            activeClassName="sidebar-active"
          >
            <p>Home</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/messenger"
            className="menu-item"
            activeClassName="sidebar-active"
          >
            <p>Messenger</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/friends"
            className="menu-item"
            activeClassName="sidebar-active"
          >
            <p>Friends</p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
