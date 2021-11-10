import React from "react";

function UserProfileItem(props) {
  const { name, avatar, blueTick } = props;
  return (
    <div className="user-profile-item">
      <img src={avatar} width="36" height="36" alt="avatar" />
      <span className="username">{name}</span>
      {blueTick ? (
        <span className="app__blue-tick">
          <i className="fas fa-check-circle"></i>
        </span>
      ) : (
        false
      )}
    </div>
  );
}

export default UserProfileItem;
