import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../../store/reducers/newfeedSlice";

function PostDeleteModal() {
  const currentPostDelete = useSelector(
    (state) => state.newfeedPost.currentPostDelete
  );
  const dispatch = useDispatch();
  const handleDeletePost = () => {
    // alert("DELETE: " + currentPostDelete);
    dispatch(deletePost(currentPostDelete));
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
            <p>Delete postId : {currentPostDelete}</p>
            <p>Cannot restore !</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary "
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-dismiss="modal"
              onClick={() => handleDeletePost()}
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
