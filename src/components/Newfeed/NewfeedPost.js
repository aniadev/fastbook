import React from "react";
import Avatar from "./Avatar";
const avatarLink =
  "https://www.pngarea.com/pngm/468/3428536_default-avatar-png-profile-demo-hd-png-download.png";
function NewfeedPost() {
  return (
    <div className="newfeed-post">
      <div className="header">
        <div className="ml-3">
          <Avatar avatarLink={avatarLink} width="45" height="45" />
        </div>
        <div className="newfeed-username">
          <p>Lady Gaga</p>
        </div>
      </div>
      <hr />
      <div className="body">
        <div className="post-content">
          <p> Lorem ipsum dolor sit amet, consectetur adip minimist</p>
        </div>
      </div>
    </div>
  );
}

export default NewfeedPost;
