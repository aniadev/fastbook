import ReactDOM from "react-dom";
import React, {useState, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import {deletePost} from "../../store/reducers/newfeedSlice";
import postsApi from "../../store/api/postsApi";

import "./Style/ModalAvatarUploader.css";

function ModalPostDelete({isShowing, hideModal}) {
  const currentPostDelete = useSelector(
    (state) => state.newfeedPost.currentPostDelete
  );
  const dispatch = useDispatch();
  const handleDeletePost = async (e) => {
    // alert("DELETE: " + currentPostDelete);
    e.target.disabled = true;
    try {
      const response = await postsApi.deletePost({postId: currentPostDelete});
      if (response.success) {
        hideModal();
        dispatch(deletePost(currentPostDelete));
        e.target.disabled = false;
      } else {
        e.target.disabled = false;
      }
    } catch (error) {
      alert(error);
    }
  };
  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className='modal-avatar-uploader'>
            <div className='modal-avatar-uploader__wrapper'>
              <div className='modal-avatar-uploader__header'>
                <p className='modal-avatar-uploader__header-title '>
                  Bạn chắc chắn muốn xóa ?
                </p>
                <span
                  className='modal-avatar-uploader__header-btn_close'
                  onClick={() => hideModal()}>
                  <span aria-hidden='true'>&times;</span>
                </span>
              </div>
              <div className='modal-avatar-uploader__body'>
                <p className='modal-avatar-uploader__header-title warning'>
                  Thao tác này sẽ không thể hoàn tác
                </p>
              </div>
              <div className='modal-avatar-uploader__footer'>
                <button
                  type='button'
                  className='btn btn-link'
                  onClick={() => hideModal()}>
                  Hủy
                </button>
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={(e) => handleDeletePost(e)}>
                  Xóa <i className='fas fa-trash-alt'></i>
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

export default ModalPostDelete;
