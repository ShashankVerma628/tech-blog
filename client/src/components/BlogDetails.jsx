import "../styles/blog.css";
import moment from "moment";
import { FaEdit } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const BlogDetails = ({ blog }) => {
  const { editBlog } = useAppContext();

  const user = JSON.parse(localStorage.getItem("user"));

  let date = moment(blog?.createdAt);
  date = date.format("MMM Do, YYYY");

  return (
    <div className="blog-container">
      <div className="blog-header">
        <h3 className="blog-title">{blog?.title}</h3>
        {user?._id === blog?.createdBy && user?.username === blog?.username ? (
          <Link to={`/blog/edit-blog/${blog?._id}`}>
            <FaEdit />
          </Link>
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
