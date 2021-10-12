import React from "react";
import "./Sidebar.css";
import UserProfileItem from "../UserProfileItem";
// redux store
import { useSelector } from "react-redux";

function Sidebar() {
  const user = useSelector((state) => state.user);
  return (
    <div className="menu">
      <ul>
        <li>
          <div className="menu-item">
            <UserProfileItem userName={user.username} avatar={user.avatar} />
          </div>
        </li>
        <li>
          <div className="menu-item active">
            <p>Home</p>
          </div>
        </li>
        <li>
          <div className="menu-item">
            <p>Messenger</p>
          </div>
        </li>
        <li>
          <div className="menu-item">
            <p>Friends</p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
