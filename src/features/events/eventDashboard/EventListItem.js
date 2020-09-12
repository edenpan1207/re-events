import React from "react";
import { Segment, Item, Icon, List, Button, Label } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { format } from 'date-fns'
import EventListAttendee from "./EventListAttendee";
import { deleteEvent } from '../eventAction';
import { deleteEventFirestore } from '../../../App/firestore/firestoreService';

const EventListItem = ({ event }) => {
  const dispatch = useDispatch();
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src={event.hostPhotoURL} />
            <Item.Content>
              <Item.Header content={event.title} />
              <Item.Description>
                Host By {event.hostedBy}
              </Item.Description>
              {
                event.isCancelled && (
                  <Label 
                    style={{ top: '-40px' }}
                    ribbon="right"
                    color="red"
                    content="this event has been cancel"
                  />
                )
              }
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {format(event.date, 'MMMM d, yyyy h:mm a')}
          <Icon name="marker" /> {event.venue.address}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal> 
          {event.attendees.map(attendee => {
            return <EventListAttendee attendee={attendee} key={attendee.id} />
          })}
        </List>
      </Segment>
      <Segment clearing>
        <div>{event.description}</div>
        <Button 
          onClick={() => deleteEventFirestore(event.id)}
          color="red" 
          floated="right" 
          content="Delete" 
        />
        <Button 
          // onClick={() => selectEvent(event)}
          as={Link}
          to={`/events/${event.id}`}
          color="teal" 
          floated="right" 
          content="View" 
        />
      </Segment>
    </Segment.Group>
  );
};

export default EventListItem;
