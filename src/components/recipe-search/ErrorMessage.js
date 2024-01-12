import { useSelector } from "react-redux";

const ErrorMessage = ({ displayErrorMessage }) => {
  const error = useSelector((state) => state.error);
  return (
    error !==
      "Failed to fetch recipes. Please check your API credentials or your network connection" && (
      <p className="error-message">{displayErrorMessage}</p>
    )
  );
};

export default ErrorMessage;
