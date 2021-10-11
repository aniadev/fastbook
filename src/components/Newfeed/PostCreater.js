import React from "react";
import "./NewfeedPanel.css";
import Avatar from "./Avatar";
const avatarLink =
  "https://www.pngarea.com/pngm/468/3428536_default-avatar-png-profile-demo-hd-png-download.png";

function PostCreater() {
  return (
    <div className="post-creater">
      <div className="ml-3">
        <Avatar avatarLink={avatarLink} width="45" height="45" />
      </div>

      <div className="form-group">
        <form action="">
          <input
            className="form-control"
            type="text"
            name="newPost"
            placeholder="How do you feel ?"
          />
        </form>
      </div>
    </div>
  );
}

export default PostCreater;
