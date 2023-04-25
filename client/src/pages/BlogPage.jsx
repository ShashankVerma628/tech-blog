import "../styles/blogPage.css";

import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BlogDetails } from "../components";


import { useAppContext } from "../context/appContext";

const BlogPage = () => {
  const { getSingleBlog, singleBlog } = useAppContext();

  const { id } = useParams();

  useEffect(() => {
    getSingleBlog(id);
  }, []);

  console.log(singleBlog);

  return (
    <div className="dashboard-page-wrapper page-wrapper">
      <div className="blogs-wrapper">
        <BlogDetails blog={singleBlog} />
      </div>
      <div className="comment-btn-container">
        <Link className="btn" to={`/add-comment/${id}`}>Add Comment</Link>
      </div>
      <div className="comments-container"></div>
    </div>
  );
};

export default BlogPage;
