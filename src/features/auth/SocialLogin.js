import React from 'react';
import { Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { socialLogin } from '../../App/firestore/firebaseService';
import { closeModal } from '../../App/common/modal/modalReducer';

const SocialLogin = () => {
  const dispatch = useDispatch();

  const handleSocialLogin = (provider) => {
    dispatch(closeModal());
    socialLogin(provider);
  }

  return (
    <>
      <Button onClick={() => handleSocialLogin('facebook')} icon="facebook" fluid color="facebook" style={{ marginBottom: 10 }} content="Login With Facebook" />
      <Button onClick={() => handleSocialLogin('google')} icon="google" fluid color="google plus" content="Login With Google" />
    </>
  )
}

export default SocialLogin;