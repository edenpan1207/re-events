const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = payload => ({
  type: OPEN_MODAL,
  payload
})

export const closeModal = () => ({
  type: CLOSE_MODAL
})

const initialValue = null;

const modalReducer = (state = initialValue, { type, payload }) => {
  switch(type) {
    case OPEN_MODAL:
      const { modalType, modalProps } = payload; 
      return { modalType, modalProps };
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }
}

export default modalReducer;