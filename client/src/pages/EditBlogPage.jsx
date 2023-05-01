import { useAppContext } from "../context/appContext";
import { Alert, FormInput } from "../components";
import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

const EditBlogPage = () => {
  const { blogId } = useParams();

  const {
    showAlert,
    isLoading,
    singleBlog,
    editBlog,
    getSingleBlog,
    displayAlert,
  } = useAppContext();

  const navigate = useNavigate();

  const [values, setValues] = useState({
    title: singleBlog?.title,
    content: singleBlog?.content,
  });

  useEffect(() => {
    getSingleBlog(blogId);
  }, []);

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    setValues({ title: "", content: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, content } = values;

    if (!title || !content) {
      displayAlert();
    } else {
      editBlog(blogId, values);
      clearForm();
      setTimeout(() => {
        navigate(`/blog/${blogId}`);
      }, 4000);
    }
  };

  return (
    <div className="dashboard-page-wrapper page-wrapper">
      <div className="add-blog-container">
        <div className="form-wrapper">
          <form className="form-container">
            <h3 className="form-title">Edit Blog</h3>
            {showAlert && <Alert />}
            {/* Blog Title */}
            <FormInput
              name="title"
              labelText="Blog Title"
              onChange={handleInputChange}
              placeholder="Please enter Blog title"
              type="text"
              value={values.title}
            />
            {/* Blog Content */}
            <div className="form-input">
              <label htmlFor="content">Blog Content</label>
              <textarea
                onChange={handleInputChange}
                name="content"
                cols="30"
                placeholder="Please enter blog content"
                rows="6"
                value={values.content}
              ></textarea>
            </div>
            <div className="submit-btn-container">
              <button className="btn" type="button" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBlogPage;
