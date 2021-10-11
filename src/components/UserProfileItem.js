import React from "react";

function UserProfileItem(props) {
  const { userName, avatar } = props;
  return (
    <div className="user-profile-item">
      <img src={avatar} width="36" height="36" alt="avatar" />
      <p>{userName}</p>
    </div>
  );
}

export default UserProfileItem;
