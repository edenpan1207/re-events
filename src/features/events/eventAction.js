import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENTS } from "./eventConstant";
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../../App/async/asyncReducer';
import { fetchSampleData } from '../../App/api/mockApi';

export const loadEvents = () => {
  // return async function (dispatch) {
  //   dispatch(asyncActionStart());
  //   try {
  //     const events = await fetchSampleData();
  //     dispatch({ type: FETCH_EVENTS, payload: events });
  //     dispatch(asyncActionFinish());
  //   } catch(error) {
  //     dispatch(asyncActionError(error));
  //   }
  // }

  return dispatch => {
    dispatch(asyncActionStart());
    fetchSampleData().then(data => {
      dispatch({ type: FETCH_EVENTS, payload: data });
      dispatch(asyncActionFinish());
    }).catch(error => {
      dispatch(asyncActionError(error));
    })
  }
}

export const createEvent = event => ({
  type: CREATE_EVENT,
  payload: event
}) 

export const updateEvent = event => ({
  type: UPDATE_EVENT,
  payload: event
}) 

export const deleteEvent = eventId => ({
  type: DELETE_EVENT,
  payload: eventId
}) 