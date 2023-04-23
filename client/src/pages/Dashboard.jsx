import "../styles/dashboard.css";
import "../styles/form.css";

import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import { AddBlog, Blog } from "../components";

const Dashboard = () => {
  const { getAllBlogs, user, userBlogs } = useAppContext();

  // Fetch all the blogs of a user whenever there's a change of user
  useEffect(() => {
    getAllBlogs();
  }, [user]);

  return (
    <div className="dashboard-page-wrapper page-wrapper">
      <div className="add-blog-container">
        <AddBlog />
      </div>
      <div className="blogs-wrapper">
        <h3>{userBlogs?.length} Blogs Found : </h3>
        {userBlogs?.map((blog) => (
          <Blog key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
