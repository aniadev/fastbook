import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setProfilePosts,
  reactPost,
  unReactPost,
} from "../../store/reducers/profileSlice";
// import NewfeedPost from "../Newfeed/NewfeedPost";
import Post from "./Post";
//api
import profileApi from "../../store/api/profileApi";
import postsApi from "../../store/api/postsApi";

function Posts({ info }) {
  let { id } = useParams();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  const react = async (postId) => {
    // unlike post
    const response = await postsApi.sendReaction(postId, {
      type: "react",
      action: "like",
    });
    if (response.success) {
      dispatch(reactPost(postId));
    }
  };
  const unReact = async (postId) => {
    // unlike post
    const response = await postsApi.sendReaction(postId, {
      type: "react",
      action: "unlike",
    });
    if (response.success) {
      dispatch(unReactPost(postId));
    }
  };
  // chua fix
  const deletePost = function (postId) {
    console.log("delete " + postId);
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await profileApi.getPosts({ _id: id });
        if (response.success) {
          // console.log(response);
          dispatch(setProfilePosts(response.posts));
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getPosts();
  }, [id, dispatch]);

  return (
    <div className="profile-posts">
      {profile.posts.length > 0 ? (
        profile.posts.map((post) => {
          post = {
            ...post,
            name: info.name,
            avatar: info.avatar,
            blueTick: info.blueTick,
          };
          return (
            <Post
              key={post.postId}
              postData={post}
              reactPost={react}
              unReactPost={unReact}
              deletePost={deletePost}
            />
          );
        })
      ) : (
        <span style={{ color: "#fff" }}>No data</span>
      )}
    </div>
  );
}

export default Posts;
