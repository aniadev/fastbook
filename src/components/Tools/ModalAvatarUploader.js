import ReactDOM from "react-dom";
import React, {useState, useRef} from "react";
import {useDispatch} from "react-redux";
import {setUserData} from "../../store/reducers/userSlice";

import ImageUploading from "react-images-uploading";
import "./Style/ModalAvatarUploader.css";
import imageUploadApi from "../../store/api/imageUploadApi";
import profileApi from "../../store/api/profileApi";

function ModalAvatarUploader({isShowing, hide}) {
  const [rawAvatar, setRawAvatar] = useState(null);
  const [progressValue, setProgressValue] = useState(0);
  const dispatch = useDispatch();
  // img selector
  const handleImgInputChange = (imageList) => {
    setRawAvatar(imageList);
  };
  const clearAvatar = () => {
    setRawAvatar(null);
    hide();
  };
  const closeAvatarModal = useRef(null);
  const UploadAvatar = async (e) => {
    // alert("upload");
    if (rawAvatar) {
      e.target.disabled = true;
      setProgressValue(20);
      let img_base64 = rawAvatar[0].data_url.replace(
        /^data:image\/(png|jpg|jpeg|gif);base64,/,
        ""
      );
      const imgResponse = await imageUploadApi.getImageLink(img_base64);
      if (imgResponse) {
        setProgressValue(50);
        let avatarLink = imgResponse.data.data.url;
        const response = await profileApi.uploadAvatar({avatarLink});
        if (response.success) {
          let newAvatar = {
            avatar: avatarLink,
          };
          dispatch(setUserData(newAvatar));
          setProgressValue(100);
          setTimeout(() => {
            closeAvatarModal.current.click();
            setProgressValue(0);
            e.target.disabled = false;
            window.location.reload();
          }, 2000);
        }
      }
    }
  };
  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className='modal-avatar-uploader'>
            <div className='modal-avatar-uploader__wrapper'>
              <div className='modal-avatar-uploader__header'>
                <p className='modal-avatar-uploader__header-title '>
                  Thay đổi ảnh đại diện
                </p>
                <span
                  className='modal-avatar-uploader__header-btn_close'
                  onClick={() => clearAvatar()}>
                  <span aria-hidden='true'>&times;</span>
                </span>
              </div>
              <div className='modal-avatar-uploader__body'>
                <ImageUploading
                  value={rawAvatar}
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
                    <div className='img-upload__wrapper'>
                      <button
                        style={isDragging ? {borderColor: "red"} : null}
                        className='btn btn-primary btn-sm'
                        onClick={onImageUpload}
                        {...dragProps}>
                        Chọn ảnh <i className='fas fa-image'></i>
                      </button>
                      <span className='ml-3'>Chọn ảnh tỉ lệ 1:1</span>
                      <div
                        style={{backgroundColor: "transparent"}}
                        className='progress mt-2'>
                        <div
                          className='progress-bar progress-bar-striped progress-bar-animated'
                          role='progressbar'
                          style={{width: `${progressValue}%`}}
                          aria-valuemin='0'
                          aria-valuemax='100'>
                          {progressValue === 100 && "Upload completed !"}
                        </div>
                      </div>
                      <div className='avatar-loaded_container'>
                        {imageList.map((image, index) => (
                          <div key={index} className='avatar-loaded_item'>
                            <img src={image.data_url} alt='' />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </ImageUploading>
              </div>
              <div className='modal-avatar-uploader__footer'>
                <button
                  type='button'
                  className='btn btn-link btn-sm'
                  onClick={() => clearAvatar()}
                  ref={closeAvatarModal}>
                  Hủy
                </button>
                <button
                  type='button'
                  className='btn btn-primary btn-sm'
                  onClick={(e) => UploadAvatar(e)}>
                  Tải lên <i className='fas fa-upload'></i>
                </button>
              </div>
            </div>
            <div className='modal-overlay'></div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
}

export default ModalAvatarUploader;
