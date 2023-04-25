import "../styles/blogPage.css";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BlogDetails, Comment } from "../components";

import { useAppContext } from "../context/appContext";

const BlogPage = () => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const { getSingleBlog, singleBlog, getComments } = useAppContext();

  const { id } = useParams();

  useEffect(() => {
    getSingleBlog(id);
  }, []);

  const handleViewComment = () => {
    setShowComments(true);
    (async () => {
      console.log(await getComments(id));
      setComments(await getComments(id));
    })();
  };

  return (
    <div className="dashboard-page-wrapper page-wrapper">
      <div className="blogs-wrapper">
        <BlogDetails blog={singleBlog} />
      </div>
      <div className="comment-btn-container">
        <Link className="btn" to={`/add-comment/${id}`}>
          Add Comment
        </Link>
      </div>
      <div className="comments-wrapper">
        {showComments ? (
          <h3>
            {comments.length} comment{comments.length > 1 ? "s" : ""} found
          </h3>
        ) : (
          ""
        )}
        <span>
          <button
            type="button"
            onClick={handleViewComment}
            className="view-comment-btn btn"
          >
            View Comments
          </button>
        </span>
        <div className="comments-container">
          {comments.map((item) => (
            <Comment key={item?._id} comment={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
