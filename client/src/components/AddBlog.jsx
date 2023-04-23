import Alert from "./Alert";
import FormInput from "./FormInput";
import "../styles/form.css";

import { useAppContext } from "../context/appContext";
import { useState } from "react";

const AddBlog = () => {
  const { showAlert, isLoading, addBlog, displayAlert } = useAppContext();

  const [values, setValues] = useState({
    title: "",
    content: "",
  });

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
    }
    addBlog(values);
    clearForm();
  };
  return (
    <div className="form-wrapper">
      <form className="form-container">
        <h3 className="form-title">Add Blog</h3>
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
  );
};

export default AddBlog;
