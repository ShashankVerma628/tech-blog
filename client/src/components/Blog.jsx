import "../styles/blog.css";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <Link to={`/blog/${blog?._id}`} className="blog-container">
      <div className="blog-header">
        <h3 className="blog-title">{blog?.title}</h3>
        <p className="blog-details">
          <span className="blog-author">Posted By: kraken</span>
          <span className="blg-date">23/43/12</span>
        </p>
      </div>
      <div className="blog-content-container">
        <p className="blog-content">{blog?.content}</p>
      </div>
    </Link>
  );
};

export default Blog;
