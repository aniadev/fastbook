import React, {useState, useEffect, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useHistory, useParams, Link} from "react-router-dom";
import postsApi from "../../store/api/postsApi";
import "./Style/ModalPostViewer.css";
import "./Style/ModalPostViewer-mobile.css";
import {
  // setDeletePost,
  reactPost,
  unReactPost,
} from "../../store/reducers/newfeedSlice";

function ModalPostViewer() {
  let history = useHistory();
  let {postId} = useParams();
  const user = useSelector((state) => state.user);
  const ownId = useSelector((state) => state.user.userId);
  const commentInput = useRef(null);
  const [postData, setPostData] = useState({
    content: "",
    image: "",
  });
  const [allComments, setAllComments] = useState([]);
  const [comment, setComment] = useState("");
  const [reactors, setReactors] = useState([]);
  const dispatch = useDispatch();

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
  const handleDeleteCmt = () => {
    alert("Tính năng đang cập nhật");
  };
  const handleEditCmt = () => {
    alert("Tính năng đang cập nhật");
  };
  const reactPostHandle = async () => {
    if (reactors.includes(user.userId)) {
      // unlike post
      const response = await postsApi.sendReaction(postData.postId, {
        type: "react",
        action: "unlike",
      });
      if (response.success) {
        let newReactors = reactors.filter((el) => el !== user.userId);
        setReactors(newReactors);
        setPostData({...postData, likes: postData.likes - 1});
        dispatch(unReactPost(postData.postId));
      }
    } else {
      //like post
      const response = await postsApi.sendReaction(postData.postId, {
        type: "react",
        action: "like",
      });
      if (response.success) {
        dispatch(reactPost(postData.postId));
        setReactors([user.userId, ...reactors]);
        setPostData({...postData, likes: postData.likes + 1});
      }
    }
  };

  // const deletePostHandler = (postId) => {
  //   dispatch(setDeletePost(postId));
  //   back();
  // };

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
    <div className='modal-post-viewer'>
      <div className='post-viewer-main'>
        <div className='modal-post-viewer-close' onClick={back}>
          <i className='fas fa-times'></i>
        </div>
        <div className='pvm__image'>
          <img className='pvm__image-img' src={postData.image} alt='anh post' />
        </div>
        <div className='pvm__body'>
          <div className='pvm__body__header'>
            <div className='pvm__body__header-artist'>
              <div className='pvm__body__header-artist-img'>
                <img src={postData.avatar} alt='artist' />
              </div>
              <div className='pvm__body__header-artist-info'>
                <Link
                  className='pvm__body__header-artist-name'
                  to={`/${postData.userId}`}>
                  {postData.name}
                  {postData.blueTick ? (
                    <span className='pvm__body__header-artist-bluetick'>
                      <i className='fas fa-check-circle'></i>
                    </span>
                  ) : (
                    false
                  )}
                </Link>
                <div className='pvm__body__header-artist-time'>
                  {convertTime(postData.time)}
                </div>
              </div>
            </div>
            <div className='pvm__body__header-option'>
              <i className='fas fa-ellipsis-h'></i>
              <div className='pvm__body__header-option-dropdown'>
                <span className='pvm__body__header-option-dropdown-item'>
                  Chỉnh sửa
                </span>
                <span
                  className='pvm__body__header-option-dropdown-item warning'
                  type='button'>
                  Xóa
                </span>
              </div>
            </div>
          </div>
          <div className='pvm__body__content'>
            <div
              dangerouslySetInnerHTML={{
                __html: `${postData.content.replace(
                  /(?:\r\n|\r|\n)/g,
                  "<br>"
                )}`,
              }}
            />
          </div>
          <div className='pvm__body__footer'>
            <div className='pvm__body__footer-react'>
              {postData.likes > 0 ? (
                <div className='pvm__body__footer-like-counter'>
                  <i className='far fa-thumbs-up'></i>
                  <span>{`${postData.likes} lượt thích`}</span>
                </div>
              ) : (
                false
              )}
              {postData.comments > 0 ? (
                <div className='pvm__body__footer-cmt-counter'>
                  {postData.comments} bình luận
                </div>
              ) : (
                false
              )}
            </div>
            <div className='pvm__body__footer-option'>
              <div
                className={`pvm__body__footer-like ${
                  reactors.includes(user.userId)
                    ? "pvm__body__footer-like--active"
                    : ""
                }`}
                onClick={() => reactPostHandle()}>
                <i className='far fa-thumbs-up'></i>
                <span>Thích</span>
              </div>
              <div
                className='pvm__body__footer-comment'
                onClick={() => commentInput.current.focus()}>
                <i className='far fa-comment-alt'></i>
                <span>Bình luận</span>
              </div>
              <div className='pvm__body__footer-share'>
                <i className='fas fa-share'></i>
                <span>Chia sẻ</span>
              </div>
            </div>
            <div className='pvm__body__footer-comments-wrapper'>
              {/* Render all comments */}
              {allComments.map((comment) => (
                <li key={comment.cmtId} className='post-comment'>
                  <Link
                    className='post-comment__avatar'
                    to={`/${comment.userCmtId}`}>
                    <img src={comment.avatar} alt='cmt_avt' />
                  </Link>
                  <div className='post-comment__main'>
                    <Link
                      className='post-comment__main__name'
                      to={`/${comment.userCmtId}`}>
                      <span>{comment.name}</span>
                    </Link>
                    <div className='post-comment__main__content'>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: `${comment.cmtContent.replace(
                            /(?:\r\n|\r|\n)/g,
                            "<br>"
                          )}`,
                        }}
                      />
                    </div>
                    <div className='post-comment__main__time'>
                      <span>{convertTime(comment.cmtTime)}</span>
                    </div>
                    <div className='post-comment__main__footer'></div>

                    {ownId === comment.userCmtId ? (
                      <div className='post-comment__main__option'>
                        <i className='fas fa-ellipsis-h'></i>
                        <div className='post-comment__main__option-dropdown'>
                          <span
                            className='post-comment__main__option-dropdown-item'
                            onClick={() => handleEditCmt()}>
                            Chỉnh sửa
                          </span>
                          <span
                            className='post-comment__main__option-dropdown-item warning'
                            type='button'
                            onClick={() => handleDeleteCmt()}>
                            Xóa
                          </span>
                        </div>
                      </div>
                    ) : (
                      false
                    )}
                  </div>
                </li>
              ))}
            </div>
            <div className='pvm__body__comment-editer'>
              <a className='post-comment-editer__avatar' href='/31'>
                <img src={user.avatar} alt='cmt_avt' />
              </a>
              <div className='post-comment-editer__input-group'>
                <input
                  type='text'
                  className='post-comment-editer__input'
                  placeholder='Viết bình luận...'
                  onChange={(e) => handleWriteComment(e)}
                  onKeyPress={(e) => handleKeyPress(e)}
                  autoFocus
                  value={comment}
                  ref={commentInput}
                />
                <div
                  className='post-comment-editer__btn'
                  onClick={() => submitComment()}>
                  <i className='far fa-paper-plane'></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='modal-post-viewer-overlay' onClick={back}></div>
    </div>
  );
}

export default ModalPostViewer;
