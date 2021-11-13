import React, { useState, useEffect } from "react";
import "./NewfeedPanel.css";
// components
import PostCreater from "./PostCreater";
import NewfeedPost from "./NewfeedPost";
// redux store
import { useSelector, useDispatch } from "react-redux";
import { initPosts } from "../../store/reducers/newfeedSlice";
// api axiosClient
import postsApi from "../../api/postsApi";

function NewfeedPanel() {
  const newfeedPost = useSelector((state) => state.newfeedPost);
  const allPostData = [...newfeedPost.posts];
  const dispatch = useDispatch();
  useEffect(() => {
    const getApi = async () => {
      try {
        const response = await postsApi.getPosts({ _page: newfeedPost.page });
        if (response.success) {
          // console.log(response.posts);
          dispatch(initPosts(response.posts));
        } else {
          console.log(response.message);
        }
      } catch (error) {
        console.log("Fail to call: " + error);
      }
    };
    getApi();
  }, [dispatch, newfeedPost.page]);

  const handleGetMorePost = () => {
    alert("GET MORE POST \n FEATURE UPDATING");
  };

  return (
    <div className="NewfeedPanel">
      <div className="nf-all-posts">
        <PostCreater />
        {allPostData.map((post) => {
          return <NewfeedPost key={post.postId} postData={post} />;
        })}
        <div className="nf-post-add" onClick={() => handleGetMorePost()}>
          <span>Get more . . .</span>
        </div>
      </div>
      <div className="nf-features"></div>
    </div>
  );
}

export default NewfeedPanel;
