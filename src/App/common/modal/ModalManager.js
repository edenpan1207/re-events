import React from "react";
import { useSelector } from "react-redux";
import TestModal from '../../../features/sandbox/testModal'; 
import LoginForm from '../../../features/auth/LoginForm';
import RegisterForm from '../../../features/auth/RegisterForm';

// modalType, modalProps
const ModalManager = () => {
  const modalLookup = {
    TestModal,
    LoginForm,
    RegisterForm
    // put modalType inside
  };
  const currentModal = useSelector((state) => state.modals);
  let renderedModal;

  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];
    renderedModal = <ModalComponent {...modalProps} />;
  }

  return <span>{renderedModal}</span>;
};

export default ModalManager;