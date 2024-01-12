import { useDispatch } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { setKeyword } from "../../state/actions";

const ClearButton = () => {
  const dispatch = useDispatch();

  const handleClearKeyword = () => {
    dispatch(setKeyword(""));
  };

  return (
    <button className="clear-button" onClick={handleClearKeyword}>
      <FaTimes className="clear-icon" />
    </button>
  );
};

export default ClearButton;
