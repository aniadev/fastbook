import React from "react";
import "./Sidebar.css";
import UserProfileItem from "../UserProfileItem";

function Sidebar() {
  return (
    <div className="menu">
      <ul>
        <li>
          <div className="menu-item">
            <UserProfileItem
              userName="Phạm Công Hải"
              avatar="https://www.pngarea.com/pngm/468/3428536_default-avatar-png-profile-demo-hd-png-download.png"
            />
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
