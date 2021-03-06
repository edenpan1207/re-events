/* global google */
import React, {useState} from "react";
import { Segment, Button, Header, Confirm } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Redirect } from 'react-router-dom';
import TextInput from "../../../App/common/form/textInput";
import TextAreaInput from "../../../App/common/form/textAreaInput";
import SelectInput from "../../../App/common/form/selectInput";
import { categoryData } from "../../../App/api/categoryData";
import DateInput from "../../../App/common/form/dateInput";
import PlaceInput from '../../../App/common/form/placeInput';
import useFirestoreDoc from '../../../App/hooks/useFirestoreDoc';
import { listenToEventFromFirestore, addEventToFirestore, updateEventInFirestore, cancelEventToggle } from '../../../App/firestore/firestoreService';
import LoadingComponent from '../../../App/layout/LoadingComponent';
import { listenToEvents } from '../eventAction';

const EventForm = ({ match, history }) => {
  const dispatch = useDispatch();
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const selectedEvent = useSelector((state) =>
    state.event.events.find((evt) => evt.id === match.params.id)
  );
  const { loading, error } = useSelector(state => state.async);

  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: {
      address: '', 
      latLng: null
    },
    venue: {
      address: '', 
      latLng: null
    },
    date: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You Must Provide title"),
    category: Yup.string().required("You Must Provide category"),
    description: Yup.string().required(),
    city: Yup.object().shape({
      address: Yup.string().required('City is required')
    }),
    venue: Yup.object().shape({
      address: Yup.string().required('Vanue is required')
    }),
    date: Yup.string().required(),
  });

  const handleCancelToggle = async (event) => {
    setLoadingCancel(true);
    setConfirmOpen(false);
    try {
      await cancelEventToggle(event)
      setLoadingCancel(false);
    } catch(error) {
      console.log(error);
      setLoadingCancel(true);
    }
  }

  useFirestoreDoc({
    shouldExecute: !!match.params.id,
    query: () => listenToEventFromFirestore(match.params.id),
    data: (evt) => dispatch(listenToEvents([evt])),
    deps: [match.params.id, dispatch],
  })

  if (loading) return <LoadingComponent content="Loading Event ..." />;

  if (error) return <Redirect to="/error" />;

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          try {
            selectedEvent ? await updateEventInFirestore(values) : await addEventToFirestore(values);
            actions.setSubmitting(false);
            history.push("/events");
          } catch(error) {
            console.log(error);
            actions.setSubmitting(false);
          }
        }}
      >
        {({ dirty, isSubmitting, isValid, values }) => (
          <Form className="ui form">
            <Header sub color="teal" content="Event Detail" />
            <TextInput name="title" placeholder="Event title" />
            <SelectInput
              name="category"
              placeholder="Event Category"
              options={categoryData}
            />
            <TextAreaInput
              name="description"
              placeholder="Description"
              row="3"
            />

            <Header sub color="teal" content="Event Location Detail" />
            <PlaceInput name="city" placeholder="City" />
            <PlaceInput 
              name="venue" 
              placeholder="Venue" 
              disabled={!values.city.latLng}
              options={{
                location: new google.maps.LatLng(values.city.latLng),
                radius: 1000,
                types: ['establishment']
              }} 
            />
            <DateInput
              name="date"
              placeholderText="Date"
              showTimeSelect
              timeCaption="time"
              timeFormat="HH:mm"
              dateFormat="MMMM d, yyyy h:mm a"
            />

            {/* <Form.Field>
              <input
                type="text"
                name="title"
                placeholder="Event title"
                value={values.title}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={values.category}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={values.description}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={values.city}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <input
                type="text"
                name="venue"
                placeholder="venue"
                value={values.venue}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <input
                type="date"
                name="date"
                placeholder="Date"
                value={values.date}
                onChange={handleChange}
              />
            </Form.Field> */}
            {
              selectedEvent && <Button 
                                  loading={loadingCancel}
                                  type="button" 
                                  floated="left" 
                                  color={selectedEvent.isCancelled ? 'green' : 'red'}
                                  content={selectedEvent.isCancelled ? 'Reactivate Event' : 'Cancel Event'}
                                  onClick={() => setConfirmOpen(true)}
                                />
            }
            <Button 
              type="submit" 
              loading={isSubmitting}
              disabled={!dirty || isSubmitting || !isValid}
              floated="right" 
              positive 
              content="Submit" 
            />
            <Button
              as={Link}
              disabled={isSubmitting}
              to="/events"
              type="submit"
              floated="right"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
      <Confirm
        content={selectedEvent?.isCancelled ? 'Reactivate event ?' : 'Cancel event ?'}
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => handleCancelToggle(selectedEvent)}
      />
    </Segment>
  );
};

export default EventForm;
