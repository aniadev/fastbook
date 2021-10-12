import React from "react";
import "./NewfeedPanel.css";
// components
import PostCreater from "./PostCreater";
import NewfeedPost from "./NewfeedPost";
// redux store
import { useSelector } from "react-redux";

function NewfeedPanel() {
  const allPostData = useSelector((state) => state.newfeedPost);
  return (
    <div className="NewfeedPanel">
      <PostCreater />
      {allPostData.map((post) => {
        return <NewfeedPost key={post.id} postData={post} />;
      })}
    </div>
  );
}

export default NewfeedPanel;
