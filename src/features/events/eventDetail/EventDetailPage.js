import React from 'react';
import {Grid} from 'semantic-ui-react';
import EventDetailHeader from './EventDetailHeader';
import EventDetailInfo from './EventDetailInfo';
import EventDetailChat from './EventDetailChat';
import EventDetailSidebar from './EventDetailSidebar';
import { useSelector } from 'react-redux';

const EventDetailPage = ({ match }) => {
  const event = useSelector(state => state.event.events.find(evt => evt.id === match.params.id));
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader event={event} />
        <EventDetailInfo event={event} />
        <EventDetailChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailSidebar attendees={event.attendees} />
      </Grid.Column>
    </Grid>
  )
}

export default EventDetailPage;