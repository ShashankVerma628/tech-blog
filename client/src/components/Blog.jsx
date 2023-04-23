import "../styles/blog.css";

const Blog = ({ blog: { title, content } }) => {
  return (
    <div className="blog-container">
      <div className="blog-header">
        <h3 className="blog-title">{title}</h3>
        <p className="blog-details">
          <span className="blog-author">Posted By:  kraken</span>
          <span className="blg-date">23/43/12</span>
        </p>
      </div>
      <div className="blog-content-container">
        <p className="blog-content">{content}</p>
      </div>
    </div>
  );
};

export default Blog;
