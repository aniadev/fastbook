import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../../store/reducers/newfeedSlice";
import postsApi from "../../api/postsApi";

function PostDeleteModal() {
  const currentPostDelete = useSelector(
    (state) => state.newfeedPost.currentPostDelete
  );
  const dispatch = useDispatch();
  const closeDeleteModal = useRef(null);
  const handleDeletePost = async (e) => {
    // alert("DELETE: " + currentPostDelete);
    e.target.disabled = true;
    try {
      const response = await postsApi.deletePost({ postId: currentPostDelete });
      if (response.success) {
        dispatch(deletePost(currentPostDelete));
        e.target.disabled = false;
        closeDeleteModal.current.click();
      } else {
        e.target.disabled = false;
      }
    } catch (error) {
      alert(error);
    }
    // setTimeout(() => {

    //   dispatch(deletePost(currentPostDelete));
    // }, 3000);
  };
  return (
    <div
      className="modal fade"
      id={`postDeleteModal`}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-sm"
        role="document"
      >
        <div className="modal-content bg-dark text-light">
          <div className="modal-header">
            <h5 className="modal-title " id="exampleModalLongTitle">
              Delete ?
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
            {/* <p>Delete postId : {currentPostDelete}</p> */}
            <p>Cannot restore !</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary "
              data-dismiss="modal"
              ref={closeDeleteModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={(e) => handleDeletePost(e)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDeleteModal;
