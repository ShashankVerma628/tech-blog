import "../styles/comment.css";
import moment from "moment";
import { FaEdit, FaTrash } from "react-icons/fa";

import FormInput from "./FormInput";
import Alert from "./Alert";

import { useAppContext } from "../context/appContext";
import { useState } from "react";

const Comment = ({ comment }) => {
  let date = moment(comment?.createdAt);
  date = date.format("MMM Do, YYYY");

  const [isEdit, setIsEdit] = useState(false);
  const [commentContent, setCommentContent] = useState(comment?.commentContent);

  const { deleteComment, showAlert, displayAlert, editComment } =
    useAppContext();

  const handleChange = (e) => {
    setCommentContent(e.target.value);
  };
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!commentContent) {
      displayAlert();
    } else {
      editComment(comment?._id, commentContent);
      setTimeout(() => {
        setIsEdit(false);
      }, 4000);
      // clearCommentForm();
    }
  };

  return (
    <>
      <div className="comment-container">
        <div className="comment-content">{comment?.commentContent}</div>
        <div className="comment-action-container">
          {user?.username === comment?.username ? (
            <>
              <button
                type="button"
                onClick={() => setIsEdit(true)}
                className="btn"
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => deleteComment(comment?._id)}
              >
                <FaTrash />
              </button>
            </>
          ) : null}
        </div>
        <div className="comment-details">
          <div className="posted-by">Commented By : {comment?.username}</div>
          <div className="posted-date">{date}</div>
        </div>
      </div>
      {isEdit ? (
        <div className="comment-edit-container">
          <form className="comment-edit-form" onSubmit={handleSubmit}>
            <Alert />
            <FormInput
              labelText="Edit Comment"
              type="text"
              onChange={handleChange}
              value={commentContent}
              name="comment"
            />
            <button className="btn btn-submit" type="submit">
              Submit
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default Comment;
