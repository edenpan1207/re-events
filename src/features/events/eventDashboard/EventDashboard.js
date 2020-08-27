import React, {useState} from 'react';
import {Grid} from 'semantic-ui-react';
import EventList from './EventList';
import {sampleData} from '../../../App/api/sampleData';

const EventDashboard = () => {
  const [events, setEvents] = useState(sampleData);

  // function handleCreateEvent(event) {
  //   setEvents([...events, event])
  // }

  // function handleUpdateEvent(event) {
  //   setEvents(events.map(evt => evt.id === event.id ? event : evt));
  // }

  function handleDeleteEvent(eventId) {
    setEvents(events.filter(evt => evt.id !== eventId))
  }
  
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList 
          events={events} 
          deleteEvent={handleDeleteEvent} 
        />
      </Grid.Column>

      <Grid.Column width={6}>
        <h2>Event Filter</h2>
      </Grid.Column>
    </Grid>
  )
}

export default EventDashboard;