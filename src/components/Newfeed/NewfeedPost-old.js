import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
// redux store
import { useSelector, useDispatch } from 'react-redux';
import {
  setDeletePost,
  reactPost,
  unReactPost,
} from '../../store/reducers/newfeedSlice';
import postsApi from '../../store/api/postsApi';

function NewfeedPost({ postData }) {
  //useSelector for user's reaction
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // check reactions
  const reactPostHandle = async () => {
    if (postData.likeId) {
      // unlike post
      const response = await postsApi.sendReaction(postData.postId, {
        type: 'react',
        action: 'unlike',
      });
      if (response.success) {
        dispatch(unReactPost(postData.postId));
      }
    } else {
      //like post
      const response = await postsApi.sendReaction(postData.postId, {
        type: 'react',
        action: 'like',
      });
      if (response.success) {
        dispatch(reactPost(postData.postId));
      }
    }
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
      return _Time.toLocaleDateString('vi-VN');
    }
    days < 2
      ? hrs < 1
        ? mins < 1
          ? (_timeStr = 'vừa xong')
          : (_timeStr = mins + ' phút trước')
        : (_timeStr = hrs + ' giờ trước')
      : (_timeStr = days + ' ngày trước');

    return _timeStr;
  };
  return (
    <div className='newfeed-post container-fluid'>
      <div className='nf-header'>
        <Link className='no-select' to={`/${postData.userId}`}>
          <Avatar avatarLink={postData.avatar} width='45' height='45' />
        </Link>
        <div className='nf-info'>
          <div className='nf-username'>
            <span className='nf-username__name'>{postData.name}</span>
            {postData.blueTick ? (
              <span className='app__blue-tick'>
                <i className='fas fa-check-circle'></i>
              </span>
            ) : (
              false
            )}
          </div>
          <div className='nf-time'>
            <span>{convertTime(postData.time)}</span>
          </div>
        </div>
        {postData.userId === user.userId && (
          <div className='nf-post--option'>
            {/* <i className="fas fa-ellipsis-h"></i> */}
            <i
              type='button'
              className='fas fa-ellipsis-h'
              id='dropdownPostOption'
              data-toggle='dropdown'
              aria-expanded='true'
              data-offset='-150,10'
            ></i>
            <div className='dropdown-menu' aria-labelledby='dropdownPostOption'>
              <span className='dropdown-item'>Edit</span>
              <button
                className='dropdown-item'
                type='button'
                data-toggle='modal'
                data-target={`#postDeleteModal`}
                onClick={() => dispatch(setDeletePost(postData.postId))}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
      {/* <hr
        style={{ borderTop: "1px dotted black", margin: "4px 2px 2px 14px" }}
      /> */}
      <div className='nf-body'>
        <div className='nf-content'>
          {/* <span>{postData.content}</span> */}
          <div
            dangerouslySetInnerHTML={{
              __html: `${postData.content.replace(/(?:\r\n|\r|\n)/g, '<br>')}`,
            }}
          />
        </div>
        {postData.image !== 'null' &&
        postData.image !== '' &&
        postData.image !== null ? (
          <Link className='nf-img' to={`/post/${postData.postId}`}>
            <img src={postData.image} alt='nfimage' />
          </Link>
        ) : (
          false
        )}
      </div>
      <div className='nf-footer'>
        {postData.likes || postData.comments ? (
          <div className='react-count'>
            <span>
              {postData.likes > 0 ? postData.likes : ' '}{' '}
              {postData.likes === 0
                ? ' '
                : `${postData.likes > 1 ? 'likes' : 'like'}`}
            </span>
            <span> </span>
            <span>
              {postData.comments > 0 ? postData.comments : ' '}{' '}
              {postData.comments === 0
                ? ' '
                : `${postData.comments > 1 ? 'comments' : 'comment'}`}
            </span>
          </div>
        ) : (
          false
        )}
        <hr style={{ borderTop: '1px dotted black', margin: '2px' }} />
        <div className='react container-fluid'>
          <div className='react-row row align-items-center'>
            <div
              className='react-item col text-center no-select'
              onClick={() => reactPostHandle()}
            >
              {/* if postData has likeId property, it means reacted */}
              <span className={postData.likeId ? 'reacted' : ''}>
                Like <i className='far fa-thumbs-up'></i>
              </span>
            </div>
            <Link
              to={`/post/${postData.postId}`}
              className='react-item col text-center no-select'
            >
              <span>
                Comment <i className='far fa-comment'></i>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewfeedPost;
