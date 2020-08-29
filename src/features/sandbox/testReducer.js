const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

export const decrementCounter = amount => ({
  type: DECREMENT_COUNTER,
  payload: amount
})

export const incrementCounter = amount => ({
  type: INCREMENT_COUNTER,
  payload: amount
})

const initialData = {
  data: 30
}

export const testReducer = (state = initialData, action) => {
  switch(action.type) {
    case INCREMENT_COUNTER:
      return {
        ...state, 
        data: state.data + action.payload
      }
    case DECREMENT_COUNTER:
      return {
        ...state, 
        data: state.data - action.payload
      }
    default:
      return state;
  }
}