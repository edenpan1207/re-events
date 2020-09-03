import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink } from 'react-router-dom';
import SignOutMenu from "./SignOutMenu";
import SignInMenu from "./SignInMenu";
import { useSelector } from "react-redux";

export default function NavBar({ setFormOpen }) {
  const {authenticated} = useSelector(state => state.auth)

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} exact to="/" header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 15 }} />
          Re-vents
          </Menu.Item>
        <Menu.Item name="Events" as={NavLink} to="/events" />
        <Menu.Item name="Sandbox" as={NavLink} to="/sandbox" />
        {
          authenticated && <Menu.Item as={NavLink} to="/createEvent">
            <Button onClick={setFormOpen} positive inverted content='Create Event' />
          </Menu.Item>
        }
        {authenticated ? 
          <SignInMenu /> 
          : <SignOutMenu />
        }
      </Container>
    </Menu>
  );
}
