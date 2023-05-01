import "../styles/blog.css";
import moment from "moment";
import { FaEdit, FaTrash } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const BlogDetails = ({ blog }) => {
  const { deleteBlog } = useAppContext();

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  let date = moment(blog?.createdAt);
  date = date.format("MMM Do, YYYY");

  const handleBlogDelete = () => {
    deleteBlog(blog?._id);

    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="blog-container">
      <div className="blog-header">
        <h3 className="blog-title">{blog?.title}</h3>
        {user?._id === blog?.createdBy && user?.username === blog?.username ? (
          <>
            <Link to={`/blog/edit-blog/${blog?._id}`}>
              <FaEdit />
            </Link>
            <button type="button" className="btn" onClick={handleBlogDelete}>
              <FaTrash />
            </button>
          </>
        ) : null}
        <p className="blog-details">
          <span className="blog-author">Posted By : {blog?.username}</span>
          <span className="blg-date">{date}</span>
        </p>
      </div>
      <div className="blog-content-container">
        <p className="blog-content">{blog?.content}</p>
      </div>
    </div>
  );
};

export default BlogDetails;
