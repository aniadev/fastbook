import React, { useState } from "react";
import "./Sidebar.css";
import UserProfileItem from "../UserProfileItem";
// redux store
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Sidebar() {
  const user = useSelector((state) => state.user);
  const [actItem, setActItem] = useState("Home");
  const items = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Messenger",
      url: "/messenger",
    },
    {
      name: "Friends",
      url: "/friends",
    },
  ];
  return (
    <div className="menu">
      <ul>
        <li>
          <Link
            to="/me"
            className={actItem === "Profile" ? "menu-item active" : "menu-item"}
            onClick={() => setActItem("Profile")}
          >
            <UserProfileItem name={user.name} avatar={user.avatar} />
          </Link>
        </li>
        {items.map((item, index) => {
          return (
            <li key={index}>
              <Link
                to={item.url}
                className={
                  actItem === item.name ? "menu-item active" : "menu-item"
                }
                onClick={() => setActItem(item.name)}
              >
                <p>{item.name}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
