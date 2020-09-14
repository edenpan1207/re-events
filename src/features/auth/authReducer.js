import { SIGN_IN_USER, SIGN_OUT_USER } from './authConstant';

const initialValue = {
  authenticated: false,
  currentUser: null
}

const authReducer = (state = initialValue, { type, payload }) => {
  switch(type) {
    case SIGN_IN_USER:
      return {
        ...state, 
        authenticated: true, 
        currentUser: {
          email: payload.email,
          photoURL: payload.photoURL,
          displayName: payload.displayName,
          uid: payload.uid,
          providerId: payload.providerData[0].providerId
        }
      }
    case SIGN_OUT_USER:
      return {
        ...state, 
        authenticated: false,
        currentUser: null
      }
    default:
      return state;
  }
}

export default authReducer;