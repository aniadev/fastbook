import ReactDOM from "react-dom";
import React, {useState, useRef, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {setUserData} from "../../store/reducers/userSlice";
import {createPost} from "../../store/reducers/newfeedSlice";
import postsApi from "../../store/api/postsApi";
import imageUploadApi from "../../store/api/imageUploadApi";

import ImageUploading from "react-images-uploading";
import "./Style/ModalPostCreater.css";

function ModalPostCreater({isShowing, hideModal}) {
  const user = useSelector((state) => state.user);
  const initialNewPostState = {
    content: "",
  };
  const [images, setImages] = useState([]);
  const [newPost, setNewPost] = useState(initialNewPostState);
  const [progressValue, setProgressValue] = useState(0);
  const dispatch = useDispatch();

  const imageUploadBtn = useRef(null);

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
  const submitFormHandle = async (e) => {
    e.target.disabled = true;
    if (images.length > 0) {
      setProgressValue(20);
      var img_base64 = images[0].data_url.replace(
        /^data:image\/(png|jpg|jpeg|gif);base64,/,
        ""
      );
      const imgResponse = await imageUploadApi.getImageLink(img_base64);
      setProgressValue(60);

      let post = {
        content: newPost.content || `Đã thêm ${images.length} ảnh mới`,
        imageLinks: imgResponse.data.data.url,
      };
      const postResponse = await postsApi.createNewPost(post);
      if (postResponse.success) {
        setProgressValue(100);
        let createdPost = {
          postId: postResponse.postCreated.postId,
          userId: user.userId,
          name: user.name,
          avatar: user.avatar,
          content: postResponse.postCreated.content,
          image: post.imageLinks,
          time: new Date().toUTCString(),
          likes: 0,
          comments: 0,
        };
        dispatch(createPost(createdPost));
        setImages([]);
        setNewPost({content: ""});
        clearPostCreater();
      } else {
        alert(postResponse.message);
        e.target.disabled = false;
      }
    } else if (newPost.content !== "" && images.length === 0) {
      console.log("no images, only content");
      // callPostsApi();
      let post = {
        content: newPost.content,
        imageLinks: "",
      };
      setProgressValue(20);
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
        setProgressValue(100);
        dispatch(createPost(createdPost));
        setImages([]);
        setNewPost({content: ""});
        clearPostCreater();
      } else {
        alert(postResponse.message);
        e.target.disabled = false;
      }
    } else {
      alert("Bạn đã nhập cái gì đâu mà đăng :((");
      e.target.disabled = false;
      setProgressValue(0);
    }
  };
  const createPostHandler = (e) => {
    submitFormHandle(e);
  };
  const clearPostCreater = () => {
    setImages([]);
    setNewPost(initialNewPostState);
    hideModal();
    setProgressValue(0);
  };

  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className='modal-post-creater'>
            <div className='mpc-main'>
              <div className='mpc-main__header'>
                <h4>Tạo bài viết</h4>
                <div
                  style={{backgroundColor: "transparent"}}
                  className='mpc-main__header-progress-bar progress'>
                  <div
                    className='progress-bar progress-bar-striped progress-bar-animated'
                    role='progressbar'
                    style={{width: `${progressValue}%`}}
                    aria-valuemin='0'
                    aria-valuemax='100'></div>
                </div>
              </div>
              <div className='mpc-main__body'>
                <div className='mpc-main__body-artist'>
                  <img
                    src={user.avatar}
                    alt='artist'
                    className='mpc-main__body-artist-avatar'
                  />
                  <span>
                    <span className='mpc-main__body-artist-name'>
                      {user.name}
                    </span>
                    <span className='mpc-main__body-artist-privacy'>
                      <span className='mpc-main__body-artist-privacy-public'>
                        <i className='fas fa-globe-asia'></i> Công khai{" "}
                        <i className='fas fa-caret-down'></i>
                      </span>
                    </span>
                  </span>
                </div>
                <textarea
                  name=''
                  id='textEditorInput'
                  rows='10'
                  className='mpc-main__body-input'
                  placeholder={`${user.name} ơi, bạn đang nghĩ gì thế?`}
                  autoFocus
                  onChange={(e) => handleContentInputChange(e)}
                  autoComplete='off'
                  value={newPost.content}
                />
                <div className='mpc-main__body-image'>
                  <ImageUploading
                    multiple
                    value={images}
                    maxNumber={1}
                    onChange={(imageList) => handleImgInputChange(imageList)}
                    dataURLKey='data_url'>
                    {({
                      imageList,
                      onImageUpload,
                      onImageRemove,
                      isDragging,
                      dragProps,
                    }) => (
                      // write your building UI
                      <div className='mpc-main__body-image-wrapper'>
                        <button
                          style={isDragging ? {borderColor: "red"} : null}
                          className='hidden'
                          ref={imageUploadBtn}
                          onClick={onImageUpload}
                          {...dragProps}>
                          Ảnh <i className='fas fa-image'></i>
                        </button>
                        <div className='mpc-main__body-images-loaded'>
                          {imageList.map((image, index) => (
                            <div
                              key={index}
                              className='mpc-main__body-images-loaded-item'>
                              <img src={image.data_url} alt='' />
                              <span className='mpc-main__body-images-loaded-item-remover'>
                                <i
                                  className='fas fa-times'
                                  onClick={() => onImageRemove(index)}></i>
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </ImageUploading>
                </div>
                <div className='mpc-main__body-option'>
                  <span>Thêm vào bài viết</span>
                  <span>
                    <span
                      className='mpc-main__body-option-img'
                      id='photo-upload-btn'
                      onClick={() => imageUploadBtn.current.click()}>
                      <i className='fas fa-photo-video'></i>
                    </span>
                    <span className='mpc-main__body-option-emoji'>
                      <i className='far fa-smile'></i>
                      <span className='mpc-main__body-option-emoji-board'>
                        <span className='emoji'>&#128512;</span>
                        <span className='emoji'>&#128513;</span>
                        <span className='emoji'>&#128514;</span>
                        <span className='emoji'>&#128515;</span>
                        <span className='emoji'>&#128516;</span>
                        <span className='emoji'>&#128517;</span>
                        <span className='emoji'>&#128518;</span>
                        <span className='emoji'>&#128519;</span>
                        <span className='emoji'>&#128520;</span>
                        <span className='emoji'>&#128521;</span>
                        <span className='emoji'>&#128522;</span>
                        <span className='emoji'>&#128523;</span>
                        <span className='emoji'>&#128524;</span>
                        <span className='emoji'>&#128525;</span>
                        <span className='emoji'>&#128526;</span>
                        <span className='emoji'>&#128527;</span>
                        <span className='emoji'>&#128528;</span>
                        <span className='emoji'>&#128529;</span>
                        <span className='emoji'>&#128530;</span>
                        <span className='emoji'>&#128531;</span>
                      </span>
                    </span>
                  </span>
                </div>
                <button
                  className='mpc-main__body-button'
                  onClick={(e) => createPostHandler(e)}>
                  Đăng
                </button>
              </div>
              <div
                className='mpc-main__exit-btn'
                onClick={() => clearPostCreater()}>
                <i className='fas fa-times'></i>
              </div>
            </div>
            <div className='modal__overlay' onClick={() => hideModal()}></div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
}

export default ModalPostCreater;
