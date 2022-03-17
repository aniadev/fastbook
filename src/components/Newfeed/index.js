import React, { useEffect } from 'react';
import './Newfeed.css';
import './Newfeed-mobile.css';
// components
import NewfeedCreator from './NewfeedCreator';
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
      <NewfeedCreator />
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
