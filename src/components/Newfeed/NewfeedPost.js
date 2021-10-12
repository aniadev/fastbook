import React, { useState, useEffect } from "react";
import Avatar from "./Avatar";
// const avatarLink =
//   "https://www.pngarea.com/pngm/468/3428536_default-avatar-png-profile-demo-hd-png-download.png";

// redux store
import { useSelector, useDispatch } from "react-redux";
import { reactPost, unReactPost } from "../../store/reducers/userSlice";

function NewfeedPost(props) {
  // use state
  const [isReacted, setReact] = useState(false);
  //use props
  const { id, user, content, reactions } = props.postData;
  //useSelector
  const postReacted = useSelector((state) => state.user.postReacted);
  //useDispatch
  const dispatch = useDispatch();
  // check reactions
  const reactPostHandle = () => {
    isReacted ? dispatch(unReactPost(id)) : dispatch(reactPost(id));
  };
  // useEffect
  useEffect(() => {
    setReact(postReacted.includes(id));
    // console.log(id);
  }, [id, postReacted]);

  return (
    <div className="newfeed-post container-fluid">
      <div className="nf-header">
        <div className="ml-3">
          <Avatar avatarLink={user.avatar} width="45" height="45" />
        </div>
        <div>
          <div className="nf-username">
            <span dir="auto">{user.name}</span>
          </div>
          <div className="nf-time">
            <span>{content.time}</span>
          </div>
        </div>
      </div>
      <hr
        style={{ borderTop: "1px dotted black", margin: "4px 2px 2px 14px" }}
      />
      <div className="nf-body">
        <div className="nf-content">
          <span>{content.value}</span>
        </div>
        {content.image || "" ? (
          <div className="nf-img">
            <img src={content.image} alt="nfimage" />
          </div>
        ) : (
          false
        )}
      </div>
      <div className="nf-footer">
        <div className="react-count">
          <span>{reactions.likes} likes</span>
          <span> </span>
          <span>{reactions.comments} comments</span>
          <hr style={{ borderTop: "1px dotted black", margin: "2px" }} />
        </div>
        <div className="react container-fluid">
          <div className="react-row row align-items-center">
            <div
              className="react-item col text-center no-select"
              onClick={() => reactPostHandle()}
            >
              <span className={isReacted ? "reacted" : ""}>Like</span>
            </div>
            <div className="react-item col text-center no-select">
              <span>Comment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewfeedPost;
