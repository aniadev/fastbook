import React from "react";
import "./NewfeedPanel.css";

function Avatar(props) {
  const { avatarLink, width, height } = props;
  return (
    <div className="avatar">
      <img src={avatarLink} alt="avatar" width={width} height={height} />
    </div>
  );
}

export default Avatar;
