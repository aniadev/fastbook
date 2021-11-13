import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/reducers/userSlice";

import ImageUploading from "react-images-uploading";
import "./AvatarUploader.css";
import imageUploadApi from "../../api/imageUploadApi";
import profileApi from "../../api/profileApi";

function AvatarUploader() {
  const [rawAvatar, setRawAvatar] = useState(null);
  const [progressValue, setProgressValue] = useState(0);
  const dispatch = useDispatch();
  // img selector
  const handleImgInputChange = (imageList) => {
    setRawAvatar(imageList);
  };
  const clearAvatar = () => {
    setRawAvatar(null);
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
        const response = await profileApi.uploadAvatar({ avatarLink });
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
  return (
    <div
      className="modal fade"
      id={`avatarUploaderModal`}
      tabIndex="-2"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-md"
        role="document"
      >
        <div className="modal-content bg-dark text-light">
          <div className="modal-header">
            <h5 className="modal-title " id="exampleModalLongTitle">
              Change avatar
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <ImageUploading
              value={rawAvatar}
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
                <div className="upload__avatar-wrapper">
                  <button
                    style={isDragging ? { borderColor: "red" } : null}
                    className="btn btn-primary btn-sm"
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Select <i className="fas fa-image"></i>
                  </button>
                  <span className="ml-3">Best choice with square image</span>
                  <div
                    style={{ backgroundColor: "transparent" }}
                    className="progress mt-2"
                  >
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated"
                      role="progressbar"
                      style={{ width: `${progressValue}%` }}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {progressValue === 100 && "Upload completed !"}
                    </div>
                  </div>
                  <div className="avatar-loaded_container">
                    {imageList.map((image, index) => (
                      <div key={index} className="avatar-loaded_item">
                        <img src={image.data_url} alt="" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </ImageUploading>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-link btn-sm"
              data-dismiss="modal"
              onClick={() => clearAvatar()}
              ref={closeAvatarModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={(e) => UploadAvatar(e)}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AvatarUploader;
