import { SIGN_IN_USER, SIGN_OUT_USER } from './authConstant';
import firebase from '../../App/config/firebase';
import { APP_LOADED } from '../../App/async/asyncReducer';

export const signInUser = user => ({
  type: SIGN_IN_USER,
  payload: user
})

export const verifyAuth = () => {
  return dispatch => {
    return firebase.auth().onAuthStateChanged(user => {
      if(user) {
        dispatch(signInUser(user))
        dispatch({type: APP_LOADED})
      } else {
        dispatch(signOutUser())
        dispatch({type: APP_LOADED})
      }
    })
  }
} 

export const signOutUser = () => ({
  type: SIGN_OUT_USER
})