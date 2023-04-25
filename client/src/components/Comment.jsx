import "../styles/comment.css";
import moment from "moment";

import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";

const Comment = ({ comment }) => {
  const [username, setUsername] = useState("");

  const { getUserComment } = useAppContext();

  let date = moment(comment?.createdAt);
  date = date.format("MMM Do, YYYY");

  useEffect(() => {
    const getUsername = async () => {
      const user = await getUserComment(comment?._id);
      setUsername(user);
    };

    getUsername();

    return () => {};
  });
  return (
    <div className="comment-container">
      <div className="comment-content">{comment?.commentContent}</div>
      <div className="comment-details">
        <div className="posted-by">Commented By : {username}</div>
        <div className="posted-date">{date}</div>
      </div>
    </div>
  );
};

export default Comment;
