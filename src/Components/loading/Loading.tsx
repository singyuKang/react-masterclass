import { useLoadingState } from "../../contexts/LoadingContext";
import Modal from "../modal/Modal";

const Loading = () => {
  const loadingState = useLoadingState();

  return <Modal isOpen={loadingState.isLoading}>{/* <<div></div>> */}</Modal>;
};

export default Loading;
