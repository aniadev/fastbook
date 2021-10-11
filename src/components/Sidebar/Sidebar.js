import React from "react";
import "./Sidebar.css";
import UserProfileItem from "../UserProfileItem";

function Sidebar() {
  return (
    <div className="menu">
      <ul>
        <li>
          <UserProfileItem
            userName="Phạm Công Hải"
            avatar="https://www.pngarea.com/pngm/468/3428536_default-avatar-png-profile-demo-hd-png-download.png"
          />
        </li>
        <li className="active">
          <p>Trang chủ</p>
        </li>
        <li>
          <p>Messenger</p>
        </li>
        <li>
          <p>Friends</p>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
