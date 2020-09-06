import React from 'react';
import { Menu, Header } from 'semantic-ui-react';
import Calendar from 'react-calendar';

const EventFilters = () => {
  return (
    <>
      <Menu vertical size="large" style={{ width: '100%' }}>
        <Header icon="filter" attached color="teal" content="Filters" />
        <Menu.Item content="All Events" />
        <Menu.Item content="I'm Going" />
        <Menu.Item content="I'm Hosting" />
      </Menu>
      <Header icon="calendar" attached color="teal" content="Select Date" />
      <Calendar />
    </>
  )
}

export default EventFilters;