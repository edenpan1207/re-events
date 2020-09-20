import React from "react";
import { Tab } from "semantic-ui-react";
import AboutTab from "./AboutTab";
import PhotosTab from "./PhotosTab";

const ProfileContent = ({ profile, isCurrentUser }) => {
  const panes = [
    {
      menuItem: "About",
      render: () => {
        return (
          <Tab.Pane>
            <AboutTab profile={profile} isCurrentUser={isCurrentUser} />
          </Tab.Pane>
        );
      },
    },
    {
      menuItem: "Photos",
      render: () => {
        return (
          <Tab.Pane>
            <PhotosTab profile={profile} isCurrentUser={isCurrentUser}  />
          </Tab.Pane>
        )
      }
    },
    {
      menuItem: "Events",
      render: () => <Tab.Pane>Events</Tab.Pane>,
    },
    {
      menuItem: "Followers",
      render: () => <Tab.Pane>Followers</Tab.Pane>,
    },
    {
      menuItem: "Following",
      render: () => <Tab.Pane>Following</Tab.Pane>,
    },
  ];

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
    />
  );
};

export default ProfileContent;
