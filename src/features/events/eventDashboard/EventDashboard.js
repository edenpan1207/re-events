import React, {useState} from 'react';
import {Grid} from 'semantic-ui-react';
import EventList from './EventList';
import EventForm from '../eventForm/EventForm';
import {sampleData} from '../../../App/api/sampleData';

const EventDashboard = ({ formOpen, setFormOpen, selectEvent, selectedEvent }) => {
  const [events, setEvents] = useState(sampleData);

  function handleCreateEvent(event) {
    setEvents([...events, event])
  }

  function handleUpdateEvent(event) {
    setEvents(events.map(evt => evt.id === event.id ? event : evt));
  }

  function handleDeleteEvent(eventId) {
    setEvents(events.filter(evt => evt.id !== eventId))
  }
  
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList 
          events={events} 
          selectEvent={selectEvent} 
          deleteEvent={handleDeleteEvent} 
        />
      </Grid.Column>

      <Grid.Column width={6}>
        { formOpen && <EventForm 
                        setFormOpen={setFormOpen} 
                        setEvents={setEvents} 
                        handleCreateEvent={handleCreateEvent} 
                        selectedEvent={selectedEvent}
                        updateEvent={handleUpdateEvent}
                        key={selectedEvent ? selectedEvent.id : null}
                      /> }
      </Grid.Column>
    </Grid>
  )
}

export default EventDashboard;