import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
// const avatarLink =
//   "https://www.pngarea.com/pngm/468/3428536_default-avatar-png-profile-demo-hd-png-download.png";

// redux store
import { useSelector, useDispatch } from "react-redux";
import { reactPost, unReactPost } from "../../store/reducers/userSlice";
import { setDeletePost } from "../../store/reducers/newfeedSlice";

function NewfeedPost(props) {
  //use props to render the post
  const postData = props.postData;
  // use state
  const [isReacted, setReact] = useState(false);
  //useSelector for user's reaction
  const user = useSelector((state) => state.user);
  const { postReacted } = user;
  const dispatch = useDispatch();
  // check reactions
  const reactPostHandle = () => {
    isReacted
      ? dispatch(unReactPost(postData.postId))
      : dispatch(reactPost(postData.postId));
  };
  const commentPostHandle = () => {
    console.log("COMMENT \n FEATURE UPDATING");
  };
  // useEffect to set reaction
  useEffect(() => {
    setReact(postReacted.includes(postData.userId));
  }, [postData.userId, postReacted]);

  // handle post-option
  const handlePostOption = () => {
    // alert("POST-OPTION \n FEATURE UPDATING");
  };
  // convert time
  const convertTime = (_time) => {
    let _timeStr;
    let _Time = new Date(_time);
    let time = new Date() - _Time;
    let mins = Math.round(((time / 1000) % 3600) / 60);
    let hrs = Math.round(time / 1000 / 3600);
    let days = Math.round(hrs / 24);
    if (days > 3) {
      return _Time.toLocaleDateString("vi-VN");
    }
    days < 2
      ? hrs < 1
        ? mins < 1
          ? (_timeStr = "vừa xong")
          : (_timeStr = mins + " phút trước")
        : (_timeStr = hrs + " giờ trước")
      : (_timeStr = days + " ngày trước");

    return _timeStr;
  };
  return (
    <div className="newfeed-post container-fluid">
      <div className="nf-header">
        <Link className="ml-3 no-select" to={`/${postData.userId}`}>
          <Avatar avatarLink={postData.avatar} width="45" height="45" />
        </Link>
        <div className="nf-info">
          <div className="nf-username">
            <span className="nf-username__name">{postData.name}</span>
            {postData.blueTick ? (
              <span className="app__blue-tick">
                <i className="fas fa-check-circle"></i>
              </span>
            ) : (
              false
            )}
          </div>
          <div className="nf-time">
            <span>{convertTime(postData.time)}</span>
          </div>
        </div>
        {postData.userId === user.userId && (
          <div className="nf-post--option" onClick={() => handlePostOption()}>
            {/* <i className="fas fa-ellipsis-h"></i> */}
            <i
              type="button"
              className="fas fa-ellipsis-h"
              id="dropdownPostOption"
              data-toggle="dropdown"
              aria-expanded="true"
              data-offset="-150,10"
            ></i>
            <div className="dropdown-menu" aria-labelledby="dropdownPostOption">
              <span className="dropdown-item">Edit</span>
              <button
                className="dropdown-item"
                type="button"
                data-toggle="modal"
                data-target={`#postDeleteModal`}
                onClick={() => dispatch(setDeletePost(postData.postId))}
              >
                Delete
              </button>
            </div>
          </div>
        )}
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
        {postData.likes || postData.comments ? (
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
          </div>
        ) : (
          false
        )}
        <hr style={{ borderTop: "1px dotted black", margin: "2px" }} />
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
            <Link
              to={`/post/${postData.postId}`}
              className="react-item col text-center no-select"
              onClick={() => commentPostHandle()}
            >
              <span>
                Comment <i className="far fa-comment"></i>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewfeedPost;
