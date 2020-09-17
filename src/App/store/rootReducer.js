import { combineReducers } from 'redux';
import { testReducer } from '../../features/sandbox/testReducer';
import eventReducer from '../../features/events/eventReducer';
import modalReducer from '../../App/common/modal/modalReducer';
import authReducer from '../../features/auth/authReducer';
import asyncReducer from '../../App/async/asyncReducer';
import ProfileReducer from '../../features/profiles/ProfileReducer';

const rootReducer = combineReducers({
  test: testReducer,
  event: eventReducer,
  modals: modalReducer,
  auth: authReducer,
  async: asyncReducer,
  profile: ProfileReducer
})

export default rootReducer;