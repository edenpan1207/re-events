import React from 'react';
import {Grid} from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import EventDetailHeader from './EventDetailHeader';
import EventDetailInfo from './EventDetailInfo';
import EventDetailChat from './EventDetailChat';
import EventDetailSidebar from './EventDetailSidebar';
import useFirestoreDoc from '../../../App/hooks/useFirestoreDoc';
import { listenToEventFromFirestore } from '../../../App/firestore/firestoreService';
import LoadingComponent from '../../../App/layout/LoadingComponent';
import { listenToEvents } from '../eventAction';
import { Redirect } from 'react-router-dom';

const EventDetailPage = ({ match }) => {
  const dispatch = useDispatch();
  const event = useSelector(state => state.event.events.find(evt => evt.id === match.params.id));
  const { loading, error } = useSelector(state => state.async);
  
  useFirestoreDoc({
    query: () => listenToEventFromFirestore(match.params.id),
    data: (evt) => dispatch(listenToEvents([evt])),
    deps: [match.params.id, dispatch]
  })

  if (loading || (!event && !error)) return <LoadingComponent content="Loading Event ..." />;

  if (error) return <Redirect to="/error" />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader event={event} />
        <EventDetailInfo event={event} />
        <EventDetailChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailSidebar attendees={event?.attendees} />
      </Grid.Column>
    </Grid>
  )
}

export default EventDetailPage;