import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const configStore = () => {
  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
}

export default configStore;