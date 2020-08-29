import React from 'react';
import EventListItem from './EventListItem';

const EventList = ({ events }) => {
  return (
    <>
      {events.map(event => {
        return <EventListItem event={event} key={event.id} />
      })}
    </>
  )
}

export default EventList;