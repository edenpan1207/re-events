import React from 'react';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "semantic-ui-react";
import ModalWrapper from '../../App/common/modal/ModalWrapper';
import TextInput from '../../App/common/form/textInput';
import { useDispatch } from 'react-redux';
import { signInUser } from './authAction';
import { closeModal } from '../../App/common/modal/modalReducer';

const LoginForm = () => {
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
    password: ''
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Required Email'),
    password: Yup.string().required('Required Password')
  })

  return (
    <ModalWrapper size="mini" header="Sign in to Re-invent">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          dispatch(signInUser(values));
          actions.setSubmitting(false);
          dispatch(closeModal());
        }}
      >
        {
          ({ dirty, isSubmitting, isValid }) => (
            <Form className="ui form">
              <TextInput name="email" placeholder="Address Email" />
              <TextInput type="password" name="password" placeholder="Password" />
              <Button 
                type="submit" 
                loading={isSubmitting}
                disabled={!dirty || isSubmitting || !isValid}
                fluid
                size="large"
                color="teal"
                content="Login" 
              />
            </Form>
          )
        }

      </Formik>
      
    </ModalWrapper>
  )
}

export default LoginForm