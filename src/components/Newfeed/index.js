import React, { useEffect } from 'react';
import './Newfeed.css';
// components
import PostCreater from './PostCreater';
import NewfeedPost from './NewfeedPost';
// redux store
import { useSelector, useDispatch } from 'react-redux';
import {
  initPosts,
  setPage,
  addMorePosts,
} from '../../store/reducers/newfeedSlice';
// api axiosClient
import postsApi from '../../store/api/postsApi';

function NewfeedPanel() {
  const newfeedPost = useSelector((state) => state.newfeedPost);
  const user = useSelector((state) => state.user);
  const allPostData = [...newfeedPost.posts];
  const dispatch = useDispatch();
  useEffect(() => {
    const getApi = async () => {
      try {
        const response = await postsApi.getPosts({ _page: 1 });
        if (response.success) {
          // console.log(response.posts);
          dispatch(initPosts(response.posts));
        } else {
          console.log(response.message);
        }
      } catch (error) {
        console.log('Fail to call: ' + error);
      }
    };
    dispatch(setPage(1));
    getApi();
  }, [dispatch]);

  const handleGetMorePost = async () => {
    dispatch(setPage(newfeedPost.page + 1));
    try {
      const response = await postsApi.getPosts({ _page: newfeedPost.page + 1 });
      if (response.success) {
        console.log(response.posts);
        dispatch(addMorePosts(response.posts));
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log('Fail to call: ' + error);
    }
  };

  return (
    <div className='newfeed'>
      <div className='nf-creator'>
        <div className='nf-creator__header'>
          <img
            src={user.avatar}
            alt='artist'
            className='nf-creator__header-avatar'
          />
          <input
            type='text'
            className='nf-creator__header-input'
            placeholder={`${user.name} ơi, bạn đang nghĩ gì thế?`}
          />
        </div>
        <ul className='nf-creator__footer'>
          <li className='nf-creator__footer-item'>
            <span className='nf-creator__footer-item-camera-icon'>
              <i className='fas fa-camera-retro'></i>
            </span>
            Phát trực tiếp
          </li>
          <li className='nf-creator__footer-item'>
            <span className='nf-creator__footer-item-photo-icon'>
              <i className='fas fa-photo-video'></i>
            </span>
            Ảnh/video
          </li>
          <li className='nf-creator__footer-item'>
            <span className='nf-creator__footer-item-laugh-icon'>
              <i className='far fa-laugh'></i>
            </span>
            Cảm xúc/hoạt động
          </li>
        </ul>
      </div>
      {allPostData.map((post) => {
        return <NewfeedPost key={post.postId} postData={post} />;
      })}
      <div className='nf-post-add' onClick={() => handleGetMorePost()}>
        <span>Get more . . .</span>
      </div>
    </div>
  );
}

export default NewfeedPanel;
