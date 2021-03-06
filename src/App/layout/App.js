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
import ErrorComponent from '../common/errors/ErrorComponent';
import AccountPage from '../../features/auth/AcountPage';
import { useSelector } from "react-redux";
import LoadingComponent from "./LoadingComponent";
import ProfilePage from "../../features/profiles/profilesPage/ProfilePage";

function App() {
  const location = useLocation();
  const { initialized } = useSelector(state => state.async);

  if(!initialized) return <LoadingComponent />
  
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
            <Route path="/account" component={AccountPage} />
            <Route path="/profile/:id" component={ProfilePage} />
            <Route path="/error" component={ErrorComponent} />
          </Container>
        </>
      )} />
    </>
  );
}

export default App;
