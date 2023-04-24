import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Blog } from "../components";

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
        <Blog blog={singleBlog} />
        </div>
      <div className="blogs-wrapper"></div>
    </div>
  );
};

export default BlogPage;
