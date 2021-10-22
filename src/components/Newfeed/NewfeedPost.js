import React, { useState, useEffect } from "react";
import Avatar from "./Avatar";
// const avatarLink =
//   "https://www.pngarea.com/pngm/468/3428536_default-avatar-png-profile-demo-hd-png-download.png";

// redux store
import { useSelector, useDispatch } from "react-redux";
import { reactPost, unReactPost } from "../../store/reducers/userSlice";

function NewfeedPost(props) {
  //use props to render the post
  const postData = props.postData;
  // use state
  const [isReacted, setReact] = useState(false);
  //useSelector for user's reaction
  const postReacted = useSelector((state) => state.user.postReacted);
  //useDispatch
  const dispatch = useDispatch();
  // check reactions
  const reactPostHandle = () => {
    isReacted
      ? dispatch(unReactPost(postData.postId))
      : dispatch(reactPost(postData.postId));
  };
  // useEffect
  useEffect(() => {
    setReact(postReacted.includes(postData.userId));
    // console.log(userId);
  }, [postData.userId, postReacted]);

  return (
    <div className="newfeed-post container-fluid">
      <div className="nf-header">
        <div className="ml-3">
          <Avatar avatarLink={postData.avatar} width="45" height="45" />
        </div>
        <div>
          <div className="nf-username">
            <span dir="auto">{postData.name}</span>
          </div>
          <div className="nf-time">
            <span>{postData.time}</span>
          </div>
        </div>
      </div>
      <hr
        style={{ borderTop: "1px dotted black", margin: "4px 2px 2px 14px" }}
      />
      <div className="nf-body">
        <div className="nf-content">
          {/* <span>{postData.content}</span> */}
          <div
            dangerouslySetInnerHTML={{
              __html: `${postData.content.replace(/(?:\r\n|\r|\n)/g, "<br>")}`,
            }}
          />
        </div>
        {postData.image !== "null" &&
        postData.image !== "" &&
        postData.image !== null ? (
          <div className="nf-img">
            <img src={postData.image} alt="nfimage" />
          </div>
        ) : (
          false
        )}
      </div>
      <div className="nf-footer">
        <div className="react-count">
          <span>
            {postData.likes > 0 ? postData.likes : " "}{" "}
            {postData.likes === 0
              ? " "
              : `${postData.likes > 1 ? "likes" : "like"}`}
          </span>
          <span> </span>
          <span>
            {postData.comments > 0 ? postData.comments : " "}{" "}
            {postData.comments === 0
              ? " "
              : `${postData.comments > 1 ? "comments" : "comment"}`}
          </span>
          <hr style={{ borderTop: "1px dotted black", margin: "2px" }} />
        </div>
        <div className="react container-fluid">
          <div className="react-row row align-items-center">
            <div
              className="react-item col text-center no-select"
              onClick={() => reactPostHandle()}
            >
              <span className={isReacted ? "reacted" : ""}>
                Like <i className="far fa-thumbs-up"></i>
              </span>
            </div>
            <div className="react-item col text-center no-select">
              <span>
                Comment <i className="far fa-comment"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewfeedPost;
