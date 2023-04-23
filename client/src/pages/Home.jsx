import { Blog } from "../components";
import "../styles/dashboard.css";
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";

const Home = () => {
  const { getBlogs, allBlogs } = useAppContext();

  useEffect(() => {
    getBlogs();
  }, [allBlogs]);

  return (
    <div className="dashboard-page-wrapper page-wrapper">
      <div className="blogs-wrapper">
        {allBlogs.map((blog) => (
          <Blog key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Home;
