import React, { useState, useRef, useEffect } from "react";
import ImageUploading from "react-images-uploading";
import "./NewfeedPanel.css";
//components
import Avatar from "./Avatar";

// redux store
import { useSelector } from "react-redux";
import postsApi from "../../store/api/postsApi";
import imageUploadApi from "../../store/api/imageUploadApi";

function PostCreater() {
  const user = useSelector((state) => state.user);
  const initialNewPostState = {
    userId: null,
    content: "",
    imageLinks: [],
  };
  const textInput = useRef(null);
  const [editorState, setEditorState] = useState("pe-hide");
  const [images, setImages] = useState();
  const [newPost, setNewPost] = useState(initialNewPostState);

  const createPostHandler = async (e) => {
    e.preventDefault();
    const callCreateNewPostApi = async (e) => {
      try {
        const response = await postsApi.createNewPost(newPost);
        if (response.success) {
          alert(response.message);
          setNewPost(initialNewPostState);
          setEditorState("pe-hide");
          setImages([]);
        } else {
          alert(response.message);
        }
      } catch (error) {
        console.log("Fail to create post: " + error);
      }
    };
    if (images.length > 0) {
      // upload image and get link first
      try {
        var img_base64 = images[0].data_url.replace(
          /^data:image\/(png|jpg|jpeg|gif);base64,/,
          ""
        );
        const response = await imageUploadApi.getImageLink(img_base64);
        // console.log(response);
        if (response.status === 200) {
          console.log(
            "🚀 ~ file: PostCreater.js ~ line 51 ~ createPostHandler ~ response",
            response
          );
          alert("Image uploaded !");
          setNewPost({
            ...newPost,
            userId: user.userId,
            imageLinks: response.data.data.url,
          });
          // newPost.imageLinks && callCreateNewPostApi();
          console.log(
            "🚀 ~ file: PostCreater.js ~ line 59 ~ createPostHandler ~ newPost.imageLinks",
            newPost.imageLinks
          );
        }
      } catch (error) {
        console.log("Fail to upload: " + error);
      }
    } else {
      if (newPost.content) {
        // callCreateNewPostApi();
        console.log(
          "🚀 ~ file: PostCreater.js ~ line 67 ~ createPostHandler ~ callCreateNewPostApi"
        );
      }
    }
  };

  const inputHandleChange = (e) => {
    setNewPost({
      ...newPost,
      userId: user.userId,
      content: e.target.value,
    });
  };

  const imageChange = async (imageList) => {
    setImages(imageList);
    // console.log("image: " + images);
    setNewPost({
      ...newPost,
      userId: user.userId,
    });
  };

  const togglePostCreateEditor = () => {
    console.log("click");
    editorState === "pe-show"
      ? setEditorState("pe-hide")
      : setEditorState("pe-show");
    textInput.current.focus();
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
                onChange={(e) => inputHandleChange(e)}
                value={newPost.content}
                ref={textInput}
              />
            </div>
            <button type="submit" className="btn btn-default btn-success">
              Đăng
            </button>
          </form>
        </div>
        <ImageUploading
          multiple
          value={images}
          maxNumber={1}
          onChange={(imageList) => imageChange(imageList)}
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
              <div className="image-panel-loaded">
                {imageList.map((image, index) => (
                  <div key={index} className="image-item-loaded">
                    <img src={image.data_url} alt="" />
                    <span
                      onClick={() => onImageRemove(index)}
                      className="image-item-remove"
                    >
                      <i className="fas fa-times"></i>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </ImageUploading>
      </div>
    </div>
  );
}

export default PostCreater;
