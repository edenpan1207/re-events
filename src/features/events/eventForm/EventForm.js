import React, {useState} from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateEvent, createEvent } from '../../events/eventAction';

const EventForm = ({ match, history }) => {
  const dispatch = useDispatch();
  const selectedEvent = useSelector(state => state.event.events.find(evt => evt.id === match.params.id));
  const initialValues = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    city: '',
    venue: '',
    date: ''
  };
  const [values, setValues] = useState(initialValues);

  function handleFormSubmit() {
    selectedEvent ? dispatch(updateEvent({...selectedEvent, ...values}))
    : dispatch(createEvent({
      ...values, 
      id: (Math.random + 1),
      hostPhotoURL: '/assets/user.png',
      hostedBy: 'Eden',
      attendees: []
    }))
    history.push('/events');
  }

  function handleInputChange(e) {
    const {name, value} = e.target;
    setValues({...values, [name]: value})
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleFormSubmit}>
        <Form.Field>
          <input 
            type="text" 
            name="title"
            placeholder="Event title"
            value={values.title}
            onChange={e =>  handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input 
            type="text" 
            name="category"
            placeholder="Category"
            value={values.category}
            onChange={e =>  handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input 
            type="text" 
            name="description"
            placeholder="Description"
            value={values.description}
            onChange={e =>  handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input 
            type="text" 
            name="city"
            placeholder="City"
            value={values.city}
            onChange={e =>  handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input 
            type="text" 
            name="venue"
            placeholder="venue"
            value={values.venue}
            onChange={e =>  handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input 
            type="date" 
            name="date"
            placeholder="Date"
            value={values.date}
            onChange={e =>  handleInputChange(e)}
          />
        </Form.Field>
        <Button type="submit" floated="right" positive content="Submit" />
        <Button as={Link} to="/events" type="submit" floated="right" content="Cancel" />
      </Form>
    </Segment>
  )
}

export default EventForm;