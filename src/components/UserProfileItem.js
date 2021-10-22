import React from "react";

function UserProfileItem(props) {
  const { name, avatar } = props;
  return (
    <div className="user-profile-item">
      <img src={avatar} width="36" height="36" alt="avatar" />
      <p className="username">{name}</p>
    </div>
  );
}

export default UserProfileItem;
