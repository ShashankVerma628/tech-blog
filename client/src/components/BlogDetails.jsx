import "../styles/blog.css";
import moment from "moment";

const BlogDetails = ({ blog }) => {
  let date = moment(blog?.createdAt);
  date = date.format("MMM Do, YYYY");

  return (
    <div className="blog-container">
      <div className="blog-header">
        <h3 className="blog-title">{blog?.title}</h3>
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
