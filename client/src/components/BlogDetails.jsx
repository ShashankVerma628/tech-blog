import "../styles/blog.css";
import moment from "moment";

import { useAppContext } from "../context/appContext";
import { useEffect, useState } from "react";

const BlogDetails = ({ blog }) => {
  const [userName, setUserName] = useState("");

  const { getUserBlog } = useAppContext();

  let date = moment(blog?.createdAt);
  date = date.format("MMM Do, YYYY");

  useEffect(() => {
    const getUsername = async () => {
      const user = await getUserBlog(blog?._id);
      setUserName(user);
    };

    getUsername();

    return () => {};
  });

  return (
    <div className="blog-container">
      <div className="blog-header">
        <h3 className="blog-title">{blog?.title}</h3>
        <p className="blog-details">
          <span className="blog-author">Posted By : {userName}</span>
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