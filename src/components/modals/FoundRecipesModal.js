import { useDispatch, useSelector } from "react-redux";
import ReactModal from "react-modal";
import { isRecipesModalOpen } from "../../state/actions";

const FoundRecipesModal = () => {
  const isModalOpen = useSelector((state) => state.isModalOpen);
  const foundRecipesCount = useSelector(
    (state) => state.recipesWithDetails
  ).length;
  const keyword = useSelector((state) => state.keyword);
  const error = useSelector((state) => state.error);

  const dispatch = useDispatch();

  const modalContent = error ? (
    <div className="loading-spinner">{error}</div>
  ) : foundRecipesCount ? (
    <div className="loading-spinner">
      Found <strong>{keyword}</strong> related recipe(s)
    </div>
  ) : (
    <div className="loading-spinner" style={{ paddingBottom: "20px" }}>
      <p>
        <strong>Oops!</strong>
      </p>
      No recipes found. Please try a different search
    </div>
  );

  const handleCloseModal = () => {
    dispatch(isRecipesModalOpen(false));
  };

  if (isModalOpen) {
    setTimeout(handleCloseModal, 3000);
  }

  return (
    <ReactModal
      isOpen={isModalOpen}
      className="loading-modal"
      overlayClassName="loading-overlay"
      ariaHideApp={false}
      onRequestClose={handleCloseModal}
    >
      {modalContent}
    </ReactModal>
  );
};

export default FoundRecipesModal;
