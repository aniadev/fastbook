import React, { useEffect } from "react";
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
  const allPostData = useSelector((state) => state.newfeedPost);
  const dispatch = useDispatch();
  useEffect(() => {
    const getApi = async () => {
      try {
        const response = await postsApi.getPosts();
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
  }, [dispatch]);
  return (
    <div className="NewfeedPanel">
      <PostCreater />
      {allPostData.map((post) => {
        return <NewfeedPost key={post.postId} postData={post} />;
      })}
    </div>
  );
}

export default NewfeedPanel;
