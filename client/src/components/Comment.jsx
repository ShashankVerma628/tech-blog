import "../styles/comment.css";
import moment from "moment";

const Comment = ({ comment }) => {
  let date = moment(comment?.createdAt);
  date = date.format("MMM Do, YYYY");

  return (
    <div className="comment-container">
      <div className="comment-content">{comment?.commentContent}</div>
      <div className="comment-details">
        <div className="posted-by">Commented By : kraken on</div>
        <div className="posted-date">{date}</div>
      </div>
    </div>
  );
};

export default Comment;
