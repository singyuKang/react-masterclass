import { useLoadingState } from "../../contexts/LoadingContext";
import Modal from "../modal/Modal";

const Loading = () => {
  const loadingState = useLoadingState();

  return (
    <Modal isOpen={loadingState.isLoading}>
      <></>
    </Modal>
  );
};

export default Loading;
