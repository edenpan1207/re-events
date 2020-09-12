import React from 'react';
import { Segment, Header, Button } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ErrorComponent = () => {
  const { error } = useSelector(state => state.async);

  return (
    <Segment placeholder>
      <Header textAlign="center" content={error?.message || 'We Have Error'} />
      <Button as={Link} to="/events" primary style={{ marginTop: 20 }} content="Return to Event Page" />
    </Segment>
  )
}

export default ErrorComponent;