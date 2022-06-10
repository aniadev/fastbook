import React, {useState, useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import {useHistory, useParams, Link} from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import postsApi from "../../store/api/postsApi";
import "./Style/PostViewer.css";
import "./Style/ModalAvatarUploader.css";

function ModalPostViewer() {
  let history = useHistory();
  let {postId} = useParams();
  const user = useSelector((state) => state.user);
  const commentInput = useRef(null);
  const [postData, setPostData] = useState({
    content: "",
    image: "",
  });
  const [allComments, setAllComments] = useState([]);
  const [comment, setComment] = useState("");
  const [reactors, setReactors] = useState([]);
  const submitComment = async () => {
    if (comment) {
      let commentFormat = comment.replace(/\n\s*\n/g, "\n");
      const response = await postsApi.sendComment(postId, {
        comment: commentFormat,
      });
      if (response.success) {
        // setAllComments()
        // console.log(user);
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
        setPostData({...postData, comments: postData.comments + 1});
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
  const handleReactPost = async () => {
    if (reactors.includes(user.userId)) {
      // unlike
      const response = await postsApi.sendReaction(postId, {
        type: "react",
        action: "unlike",
      });
      if (response.success) {
        let newReactors = reactors.filter((el) => el !== user.userId);
        setReactors(newReactors);
        setPostData({...postData, likes: postData.likes - 1});
      }
    } else {
      // like
      const response = await postsApi.sendReaction(postId, {
        type: "react",
        action: "like",
      });
      if (response.success) {
        setReactors([user.userId, ...reactors]);
        setPostData({...postData, likes: postData.likes + 1});
      }
    }
  };

  useEffect(() => {
    // get post data
    const getPostData = async () => {
      const response = await postsApi.getPostData(postId);
      console.log(response);
      if (response.success) {
        setPostData(response.postData);
        setAllComments(response.allComments || []);
        setReactors(response.reactors || []);
      }
    };
    getPostData();
  }, [postId]);

  // convert time
  const convertTime = (_time) => {
    let _timeStr;
    let _Time = new Date(_time);
    let time = new Date() - _Time;
    // return time;
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

  const back = (e) => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <React.Fragment>
      <div>
        <div
          className='modal'
          style={{
            position: "absolute",
            background: "#fff",
            top: 25,
            left: "10%",
            right: "10%",
            padding: 15,
            border: "2px solid #444",
          }}>
          <h1>{"image"}</h1>
          <button>Test</button>
          <div
            style={{
              width: "100%",
              height: 400,
              background: "red",
            }}
          />
          <button type='button' onClick={back}>
            Close
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ModalPostViewer;
