import React from "react";
import {Container} from 'semantic-ui-react';
import {Route, useLocation} from 'react-router-dom';
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import NavBar from '../../features/nav/NavBar';
import HomePage from '../../features/home/HomePage';
import EventDetailPage from '../../features/events/eventDetail/EventDetailPage';
import EventForm from '../../features/events/eventForm/EventForm';
import SandBox from '../../features/sandbox/SandBox';
import ModalManager from '../common/modal/ModalManager';

function App() {
  const location = useLocation();
  
  return (
    <>
      <ModalManager />
      <Route exact path="/" component={HomePage} />
      <Route path={'/(.+)'} render={() => (
        <>
          <NavBar />
          <Container className="main">
            <Route exact path="/events" component={EventDashboard} />
            <Route exact path="/sandbox" component={SandBox} />
            <Route path="/events/:id" component={EventDetailPage} />
            <Route path={[`/createEvent`, `/manage/:id`]} component={EventForm} key={location.key} />
          </Container>
        </>
      )} />
    </>
  );
}

export default App;
