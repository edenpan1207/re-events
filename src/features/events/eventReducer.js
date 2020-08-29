import {sampleData} from '../../App/api/sampleData';
import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from "./eventConstant";

const initialState = {
  events: sampleData
}

const eventReducer = (state = initialState, {type, payload}) => {
  switch(type) {
    case CREATE_EVENT:
      return {
        ...state, 
        events: [...state.events, payload]
      }
    case UPDATE_EVENT:
      return {
        ...state,
        events: [...state.events.filter(evt => evt.id !== payload.id), payload]
      }
    case DELETE_EVENT:
      return {
        ...state,
        events: [...state.events.filter(evt => evt.id !== payload)]
      }
    default:
      return state;
  }
}

export default eventReducer;
