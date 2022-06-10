import React from "react";
import {Link} from "react-router-dom";
// use custom hooks
import useModal from "../CustomHooks/useModal";
import ModalPostDelete from "../Tools/ModalPostDelete";
// redux store
import {useSelector, useDispatch} from "react-redux";
import {
  setDeletePost,
  reactPost,
  unReactPost,
} from "../../store/reducers/newfeedSlice";
import postsApi from "../../store/api/postsApi";

function NewfeedPost({postData}) {
  //useSelector for user's reaction
  const {isShowing, toggle} = useModal();
  const ownId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();
  // check reactions
  const reactPostHandle = async () => {
    if (postData.likeId) {
      // unlike post
      const response = await postsApi.sendReaction(postData.postId, {
        type: "react",
        action: "unlike",
      });
      if (response.success) {
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
      }
    }
  };
  const deletePostHandler = (postId) => {
    dispatch(setDeletePost(postId));
    toggle();
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
    <div className='nf-post'>
      <div className='nf-post__header'>
        <div className='nf-post__header-artist'>
          <div className='nf-post__header-artist-img'>
            <img src={postData.avatar} alt='artist' />
          </div>
          <div className='nf-post__header-artist-info'>
            <Link
              className='nf-post__header-artist-name'
              to={`/${postData.userId}`}>
              {postData.name}
              {postData.blueTick ? (
                <span className='nf-post__header-artist-bluetick'>
                  <i className='fas fa-check-circle'></i>
                </span>
              ) : (
                ""
              )}
            </Link>
            <div className='nf-post__header-artist-time'>
              {convertTime(postData.time)}
            </div>
          </div>
        </div>
        {ownId === postData.userId ? (
          <div className='nf-post__header-option'>
            <i className='fas fa-ellipsis-h'></i>
            <div className='nf-post__header-option-dropdown'>
              <span className='nf-post__header-option-dropdown-item'>
                Chỉnh sửa
              </span>
              <span
                className='nf-post__header-option-dropdown-item warning'
                type='button'
                onClick={() => deletePostHandler(postData.postId)}>
                Xóa
              </span>
            </div>
            <ModalPostDelete isShowing={isShowing} hide={toggle} />
          </div>
        ) : (
          false
        )}
      </div>
      <div className='nf-post__body'>
        <div
          className='nf-post__body-status'
          dangerouslySetInnerHTML={{
            __html: `${postData.content.replace(/(?:\r\n|\r|\n)/g, "<br>")}`,
          }}>
          {/* Post status */}
        </div>
        {postData.image !== "null" &&
        postData.image !== "" &&
        postData.image !== null ? (
          <Link to={`/post/${postData.postId}`}>
            <img
              src={postData.image}
              alt='post-img'
              className='nf-post__body-image'
            />
          </Link>
        ) : (
          false
        )}
      </div>
      <div className='nf-post__footer'>
        <div className='nf-post__footer-react'>
          {postData.likes > 0 ? (
            <div className='nf-post__footer-like-counter'>
              <i className='far fa-thumbs-up'></i>
              <span>{`${postData.likes} lượt thích`}</span>
            </div>
          ) : (
            false
          )}
          {postData.comments > 0 ? (
            <div className='nf-post__footer-cmt-counter'>
              {postData.comments} bình luận
            </div>
          ) : (
            false
          )}
        </div>
        {/* footer */}
        <div className='nf-post__footer-option'>
          {/* if postData has likeId property, it means reacted */}
          <div
            className={`nf-post__footer-like ${
              postData.likeId ? "nf-post__footer-like--active" : ""
            }`}
            onClick={() => reactPostHandle()}>
            <i className='far fa-thumbs-up'></i>
            <span>Thích</span>
          </div>
          <Link
            className='nf-post__footer-comment'
            to={`/post/${postData.postId}`}>
            <i className='far fa-comment-alt'></i>
            <span>Bình luận</span>
          </Link>
          <div className='nf-post__footer-share'>
            <i className='fas fa-share'></i>
            <span>Chia sẻ</span>
          </div>
        </div>
        <div className='nf-post__footer-comments-wrapper'></div>
      </div>
    </div>
  );
}

export default NewfeedPost;
