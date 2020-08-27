import React, { useState } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, useHistory } from 'react-router-dom';
import SignOutMenu from "./SignOutMenu";
import SignInMenu from "./SignInMenu";

export default function NavBar({ setFormOpen }) {
  const history = useHistory();
  const [authenticated, setAuthenticated] = useState(false);

  function handleSignOut() {
    setAuthenticated(false);
    history.push('/');
  }

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} exact to="/" header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 15 }} />
          Re-vents
          </Menu.Item>
        <Menu.Item name="events" as={NavLink} to="/events" />
        {
          authenticated && <Menu.Item as={NavLink} to="/createEvent">
            <Button onClick={setFormOpen} positive inverted content='Create Event' />
          </Menu.Item>
        }
        {authenticated ? 
          <SignInMenu signOut={handleSignOut} /> 
          : <SignOutMenu setAuthenticated={setAuthenticated} />
        }
      </Container>
    </Menu>
  );
}
