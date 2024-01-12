import { useSelector, useDispatch } from "react-redux";
import { setKeyword } from "../../state/actions";
import ClearButton from "./ClearButton";

const InputKeyword = () => {
  const keyword = useSelector((state) => state.keyword);
  const dispatch = useDispatch();

  const handleKeywordChange = (e) => {
    const newKeyword = e.target.value;
    dispatch(setKeyword(newKeyword));
  };

  return (
    <div className="input-container">
      <input
        className="search-input"
        type="text"
        value={keyword}
        onChange={handleKeywordChange}
        placeholder={
          keyword.length > 0 ? "Click to Clear" : "Enter Keywords..."
        }
      />
      {keyword.length > 0 && <ClearButton />}
    </div>
  );
};

export default InputKeyword;
