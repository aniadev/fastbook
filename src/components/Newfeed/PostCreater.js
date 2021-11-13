import React, { useState, useRef } from "react";
import "./NewfeedPanel.css";
//components
import Avatar from "./Avatar";
import ImageUploading from "react-images-uploading";

// redux store
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../../store/reducers/newfeedSlice";
import postsApi from "../../api/postsApi";
import imageUploadApi from "../../api/imageUploadApi";

function PostCreater() {
  const user = useSelector((state) => state.user);
  const initialNewPostState = {
    content: "",
  };
  const textInput = useRef(null);

  const [editorState, setEditorState] = useState("pe-hide");
  const [images, setImages] = useState([]);
  const [newPost, setNewPost] = useState(initialNewPostState);
  const dispatch = useDispatch();
  // toggle editor
  const togglePostCreateEditor = () => {
    // console.log("click");
    editorState === "pe-show"
      ? setEditorState("pe-hide")
      : setEditorState("pe-show");
    textInput.current.focus();
  };
  // 2ways binding newPost content
  const handleContentInputChange = (e) => {
    setNewPost({
      ...newPost,
      content: e.target.value,
    });
  };
  // img selector
  const handleImgInputChange = (imageList) => {
    setImages(imageList);
  };

  const createPostHandler = async (e) => {
    e.preventDefault();
    console.log(e.target);
    // call api get img link
    // console.log(images);

    if (images.length > 0) {
      var img_base64 = images[0].data_url.replace(
        /^data:image\/(png|jpg|jpeg|gif);base64,/,
        ""
      );
      const imgResponse = await imageUploadApi.getImageLink(img_base64);
      let post = {
        content: newPost.content,
        imageLinks: imgResponse.data.data.url,
      };
      const postResponse = await postsApi.createNewPost(post);
      if (postResponse.success) {
        let createdPost = {
          postId: postResponse.postCreated.postId,
          userId: user.userId,
          name: user.name,
          avatar: user.avatar,
          content: newPost.content,
          image: post.imageLinks,
          time: new Date().toUTCString(),
          likes: 0,
          comments: 0,
        };
        dispatch(createPost(createdPost));
        setImages([]);
        setNewPost({ content: "" });
        setEditorState("pe-hide");
      } else {
        alert(postResponse.message);
      }
    }

    if (newPost.content !== "" && images.length === 0) {
      // console.log("no images, only content");
      // callPostsApi();
      let post = {
        content: newPost.content,
        imageLinks: "",
      };
      const postResponse = await postsApi.createNewPost(post);
      if (postResponse.success) {
        let createdPost = {
          postId: postResponse.postCreated.postId,
          userId: user.userId,
          name: user.name,
          avatar: user.avatar,
          content: newPost.content,
          image: "",
          time: new Date().toUTCString(),
          likes: 0,
          comments: 0,
        };
        dispatch(createPost(createdPost));
        setImages([]);
        setNewPost({ content: "" });
        setEditorState("pe-hide");
      } else {
        alert(postResponse.message);
      }
    }
  };
  //==========================================================
  return (
    <div className="post-creater">
      <div className="ml-3">
        <Avatar avatarLink={user.avatar} width="45" height="45" />
      </div>

      <div className="form-group create-post">
        <input
          className="form-control"
          type="text"
          name="newPost"
          placeholder="How do you feel ?"
          autoComplete="off"
          onClick={() => togglePostCreateEditor()}
        />
      </div>
      <div className={"nf-post-editor " + editorState}>
        <div className="modal-body">
          <div
            className="nf-post-editor-close-button"
            onClick={() => togglePostCreateEditor()}
          >
            <i className="fas fa-times"></i>
          </div>
          <form onSubmit={(e) => createPostHandler(e)}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Viết gì đó đi ...</label>
              <textarea
                type="text"
                rows="2"
                className="form-control"
                placeholder="Bạn đang nghĩ gì thế ?"
                autoComplete="off"
                onChange={(e) => handleContentInputChange(e)}
                value={newPost.content}
                ref={textInput}
              />
            </div>
            <button type="submit" className="btn btn-default btn-success">
              Đăng
            </button>
          </form>
          <ImageUploading
            multiple
            value={images}
            maxNumber={1}
            onChange={(imageList) => handleImgInputChange(imageList)}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                <button
                  style={isDragging ? { borderColor: "red" } : null}
                  className="btn btn-primary btn-sm"
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Ảnh <i className="fas fa-image"></i>
                </button>
                <div className="images-loaded_container">
                  {imageList.map((image, index) => (
                    <div key={index} className="image-loaded_item">
                      <img src={image.data_url} alt="" />
                      <span className="image-item-remove">
                        <i
                          className="fas fa-times"
                          onClick={() => onImageRemove(index)}
                        ></i>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ImageUploading>
        </div>
      </div>
    </div>
  );
}

export default PostCreater;
