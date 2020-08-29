import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { decrementCounter, incrementCounter } from './testReducer';

const SandBox = () => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.test.data);

  return (
    <>
      <h1>the data is {data}</h1>  
      <Button onClick={() => dispatch(incrementCounter(1))} color="green" content="Increment" />
      <Button onClick={() => dispatch(decrementCounter(1))} color="red" content="Decrement" />
    </>
  )
}

export default SandBox;