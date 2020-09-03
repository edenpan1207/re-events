import React from 'react';
import { Modal } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { closeModal } from './modalReducer';

const ModalWrapper = ({ size, header, children }) => {
  const dispatch = useDispatch();

  return (
    <Modal open={true} size={size} onClose={() => dispatch(closeModal())}>
      {header && <Modal.Header>{header}</Modal.Header>}
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  )
}

export default ModalWrapper;