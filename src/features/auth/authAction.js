import { SIGN_IN_USER, SIGN_OUT_USER } from './authConstant';

export const signInUser = payload => ({
  type: SIGN_IN_USER,
  payload
}) 

export const signOutUser = () => ({
  type: SIGN_OUT_USER
}) 