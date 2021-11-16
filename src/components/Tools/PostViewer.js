import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import postsApi from "../../api/postsApi";
import "./Style/PostViewer.css";

export default function PostViewer() {
  const { postId } = useParams();
  const user = useSelector((state) => state.user);

  const commentInput = useRef(null);
  const [postData, setPostData] = useState({
    content: "",
    image: "",
  });
  const [allComments, setAllComments] = useState([]);
  const [comment, setComment] = useState("");

  const submitComment = async () => {
    if (comment) {
      let commentFormat = comment.replace(/\n\s*\n/g, "\n");
      const response = await postsApi.sendComment(postId, {
        comment: commentFormat,
      });
      if (response.success) {
        // setAllComments()
        console.log(user);
        let newComment = {
          avatar: user.avatar,
          blueTick: user.blueTick,
          name: user.name,
          postId: postId,
          userCmtId: user.userId,
          cmtId: response.cmtId,
          cmtContent: commentFormat,
          cmtTime: Date.now() + 1,
        };
        setAllComments([newComment, ...allComments]);
        setComment("");
      }
    }
  };

  const handleWriteComment = (e) => {
    // console.log(e.nativeEvent.inputType);
    if (e.nativeEvent.inputType !== "insertLineBreak") {
      setComment(e.target.value);
    }
  };
  const handleKeyPress = (e) => {
    if (e.shiftKey && e.key === "Enter") {
      setComment(e.target.value + "\n");
    } else if (e.key === "Enter") {
      submitComment();
    }
  };

  useEffect(() => {
    const getPostData = async () => {
      const response = await postsApi.getPostData(postId);
      console.log(response);
      if (response.success) {
        setPostData(response.postData);
        setAllComments(response.allComments || []);
      }
    };
    getPostData();
  }, [postId]);

  // convert time
  const convertTime = (_time) => {
    let _timeStr;
    let _Time = new Date(_time);
    let time = new Date() - _Time + _Time.getTimezoneOffset() * 60000;
    let mins = Math.round(((time / 1000) % 3600) / 60);
    let hrs = Math.round(time / 1000 / 3600);
    let days = Math.round(hrs / 24);
    if (days > 5) {
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
    <div className="post-viewer">
      <div className="post-viewer__post">
        <div className="post-viewer__post--header">
          <div className="pw__h--user">
            <div className="pw__h--avatar">
              <img src={postData.avatar} alt="nf-avatar" />
            </div>
            <div className="pw__h--info">
              <span className="pw__h--info-name">
                {postData.name}
                {postData.blueTick ? (
                  <span className="app__blue-tick">
                    {" "}
                    <i className="fas fa-check-circle"></i>
                  </span>
                ) : (
                  false
                )}
              </span>
              <span className="pw__h--info-time">
                {convertTime(postData.time)}
              </span>
            </div>
          </div>
          <div className="pw__h--option">
            <i type="button" className="fas fa-ellipsis-h"></i>
          </div>
        </div>
        <div className="post-viewer__post--body">
          <div className="pw__b--content">
            <div
              dangerouslySetInnerHTML={{
                __html: `${postData.content.replace(
                  /(?:\r\n|\r|\n)/g,
                  "<br>"
                )}`,
              }}
            />
          </div>
          {postData.image !== "null" &&
          postData.image !== "" &&
          postData.image !== undefined &&
          postData.image !== null ? (
            <div className="pw__b--image">
              <img src={postData.image} alt="nfimage" />
            </div>
          ) : (
            false
          )}
        </div>
        <div className="post-viewer__post--footer">
          <div className="pw__f--react-count">
            <span>{postData.likes}</span> <span>likes</span>{" "}
            <span>{postData.comments}</span> <span>comments</span>
          </div>
          <div className="pw__f--react-btn">
            <div className="pw__f--react-btn-like">
              <i className="fas fa-thumbs-up"></i>
            </div>
            <div
              className="pw__f--react-btn-cmt"
              onClick={() => commentInput.current.focus()}
            >
              <i className="far fa-comment"></i>
            </div>
          </div>
          <hr
            style={{
              margin: "8px 0px 5px 0px",
              backgroundColor: "#2d3436",
              width: "90%",
            }}
          />
          <div className="pw__f--comments">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="pw__f--comment-input">
                <img src={user.avatar} alt="avt" />
                <TextareaAutosize
                  name="comment"
                  placeholder={`Write your comment !`}
                  autoComplete="off"
                  onChange={(e) => handleWriteComment(e)}
                  onKeyPress={(e) => handleKeyPress(e)}
                  value={comment}
                  ref={commentInput}
                />
                <i
                  className="fa fa-paper-plane"
                  type="button"
                  onClick={() => submitComment()}
                ></i>
              </div>
            </form>
            <div>
              <ul className="pw__f--comment-items">
                {allComments.map((comment) => (
                  <li key={comment.cmtId} className="pw__f--comment-item">
                    <div className="cmt--avatar">
                      <img src={comment.avatar} alt="cmt_avt" />
                    </div>
                    <div className="cmt--body">
                      <div className="cmt--body-name">
                        <span>{comment.name}</span>
                      </div>
                      <div className="cmt--body-content">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: `${comment.cmtContent.replace(
                              /(?:\r\n|\r|\n)/g,
                              "<br>"
                            )}`,
                          }}
                        />
                      </div>
                      <div className="cmt--body-time">
                        <span>{convertTime(comment.cmtTime)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
