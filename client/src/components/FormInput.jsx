import "../styles/formInput.css";

const FormInput = ({ onChange, labelText, type, name, placeholder, value }) => {
  return (
    <div className="form-input">
      <label htmlFor={name}>{labelText || name}</label>
      <input
        type={type}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default FormInput;
