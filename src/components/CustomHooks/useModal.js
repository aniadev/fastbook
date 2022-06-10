import {useState} from "react";

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggleModal() {
    setIsShowing(!isShowing);
  }

  function hideModal() {
    setIsShowing(false);
  }

  function showModal(value) {
    setIsShowing(value);
  }

  return {
    isShowing,
    toggleModal,
    hideModal,
    showModal,
  };
};

export default useModal;
