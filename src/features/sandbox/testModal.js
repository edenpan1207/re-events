import React from 'react';
import { useSelector } from 'react-redux';
import ModalWrapper from '../../App/common/modal/ModalWrapper';

const TestModal = ({ data }) => {
  return (
    <ModalWrapper size="mini" header="Test Modal">
      <div>this {data}</div>
    </ModalWrapper>
  )
}

export default TestModal;