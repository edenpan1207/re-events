import React from "react";
import { Menu, Image, Dropdown } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOutFirebase } from "../../App/firestore/firebaseService";

const SignInMenu = () => {
  const history = useHistory();
  const { currentUserProfile } = useSelector(state => state.profile);

  const handleSignOut = async () => {
    try {
      await signOutFirebase();
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Menu.Item position="right">
      <Image
        avatar
        spaced="right"
        src={currentUserProfile.photoURL || "/assets/user.png"}
      />
      <Dropdown pointing="top left" text={currentUserProfile.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="/createEvent"
            text="Create Event"
            icon="plus"
          />
          <Dropdown.Item as={Link} to={`/profile/${currentUserProfile.id}`} text="My Profile" icon="user" />
          <Dropdown.Item as={Link} to="/account" text="My Account" icon="setting" />
          <Dropdown.Item
            onClick={handleSignOut}
            text="Sign Out"
            icon="power"
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default SignInMenu;
