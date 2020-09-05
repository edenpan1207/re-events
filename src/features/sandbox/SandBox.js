import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { decrementCounter, incrementCounter } from './testReducer';
import { openModal } from '../../App/common/modal/modalReducer';
import TestPlaceInput from './testPlaceInput';
import TestMap from './testMap';

const SandBox = () => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.test.data);

  return (
    <>
      <h1>the data is {data}</h1>  
      <Button onClick={() => dispatch(incrementCounter(1))} color="green" content="Increment" />
      <Button onClick={() => dispatch(decrementCounter(1))} color="red" content="Decrement" />
      <Button onClick={() => dispatch(openModal({ modalType: 'TestModal', modalProps: {data}  }))} color="pink" content="Open Modal" />
      <TestPlaceInput />
      <TestMap />
    </>
  )
}

export default SandBox;