import ReactModal from "react-modal";
import { useSelector } from "react-redux";

const LoadingModal = () => {
  const isLoading = useSelector((state) => state.loading);

  return (
    <ReactModal
      isOpen={isLoading}
      className="loading-modal"
      overlayClassName="loading-overlay"
      ariaHideApp={false}
    >
      <div className="loading-spinner">Loading recipes...</div>
    </ReactModal>
  );
};

export default LoadingModal;
