import { useAppContext } from "../context/appContext";
import "../styles/form.css";

const Alert = () => {
  const { alertType, alertText } = useAppContext();
  return <div className={`alert ${alertType}`}>{alertText}</div>;
};

export default Alert;
