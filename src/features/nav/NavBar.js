import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

export default function NavBar({ setFormOpen }) {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 15 }} />
          Re-vents
          </Menu.Item>
        <Menu.Item name="events" />

        <Menu.Item header>
          <Button onClick={() => setFormOpen(true)} positive inverted content='Create Event' />
        </Menu.Item>

        <Menu.Item header>
          <Button basic inverted content='Login' />
          <Button basic inverted content='Register' style={{ marginLeft: '0.5em' }} />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
