import React from 'react';
import { Menu, Button } from "semantic-ui-react";
import { useDispatch } from 'react-redux';
import { openModal } from '../../App/common/modal/modalReducer';

const SignOutMenu = () => {
  const dispatch = useDispatch();

  return (
    <Menu.Item position="right">
      <Button onClick={() => dispatch(openModal({ modalType: 'LoginForm' }))} basic inverted content='Login' />
      <Button basic inverted content='Register' style={{ marginLeft: '0.5em' }} />
    </Menu.Item>
  )
}

export default SignOutMenu;