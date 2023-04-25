import "../styles/commentPage.css";
import { useState } from "react";
import { Alert } from "../components";
import { useParams, useNavigate } from "react-router-dom";

import { useAppContext } from "../context/appContext";

const CommentPage = () => {
  const [commentContent, setCommentContent] = useState("");

  const { showAlert, addComment, displayAlert } = useAppContext();

  const navigate = useNavigate();

  const { blogId } = useParams();

  const handleCommentInputChange = (e) => {
    setCommentContent(e.target.value);
  };

  const clearForm = () => {
    setCommentContent("");
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const comment = {
      commentContent,
      blogId,
    };

    if (!commentContent) {
      displayAlert();
    } else {
      addComment(comment);
      clearForm();
      setTimeout(() => {
        navigate(`/blog/${blogId}`);
      }, 4000);
    }
  };

  return (
    <div className="comment-page-wrapper page-wrapper">
      <h2 className="page-title">Add Comment</h2>
      <div className="blog-comment-container">
        {showAlert && <Alert />}
        <form className="comment-form">
          <div className="comment-input-container">
            <label htmlFor="comment"> Add a Comment</label>
            <textarea
              placeholder="Please enter a comment..."
              name="comment"
              id="comment"
              rows="2"
              onChange={handleCommentInputChange}
              value={commentContent}
            ></textarea>
          </div>
          <button type="submit" onClick={handleCommentSubmit} className="btn">
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentPage;
