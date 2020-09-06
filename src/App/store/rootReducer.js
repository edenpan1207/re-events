import { combineReducers } from 'redux';
import { testReducer } from '../../features/sandbox/testReducer';
import eventReducer from '../../features/events/eventReducer';
import modalReducer from '../../App/common/modal/modalReducer';
import authReducer from '../../features/auth/authReducer';
import asyncReducer from '../../App/async/asyncReducer';

const rootReducer = combineReducers({
  test: testReducer,
  event: eventReducer,
  modals: modalReducer,
  auth: authReducer,
  async: asyncReducer
})

export default rootReducer;