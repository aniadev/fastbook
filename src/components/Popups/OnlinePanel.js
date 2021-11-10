import React, { useState } from "react";
import "./OnlinePanel.css";
import UserProfileItem from "../UserProfileItem";
import { useSelector } from "react-redux";

function OnlinePanel() {
  const onlineUsers = useSelector((state) => state.onlineUsers);
  const [showPanel, setShowPanel] = useState(true);

  return (
    <div className="online-panel">
      <div
        className="o-p-header no-select pointer"
        onClick={() => setShowPanel(!showPanel)}
      >
        <span className="o-p-text">
          <i className="fas fa-users"></i> Online{" "}
          <span className="o-p-count">({onlineUsers.length})</span>
        </span>
        <div className="o-p-search">
          <i className="fas fa-search"></i>
        </div>
      </div>
      <div className={showPanel ? "o-p-body--show" : "o-p-body--hide"}>
        {onlineUsers.map((user) => {
          return (
            <div className="o-p-users" key={user.userId}>
              <UserProfileItem name={user.name} avatar={user.avatar} />
              <i className="fas fa-circle mr-3 text-success"></i>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OnlinePanel;
