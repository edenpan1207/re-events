import React from 'react';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Label, Divider } from "semantic-ui-react";
import ModalWrapper from '../../App/common/modal/ModalWrapper';
import TextInput from '../../App/common/form/textInput';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../App/common/modal/modalReducer';
import { signInWithEmail } from '../../App/firestore/firebaseService';
import SocialLogin from './SocialLogin';

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
        onSubmit={async (values, actions) => {
          try {
            await signInWithEmail(values);
            actions.setSubmitting(false);
            dispatch(closeModal());
          } catch(error) {
            actions.setErrors({ auth: error.message })
            actions.setSubmitting(false);
          }
        }}
      >
        {
          ({ dirty, isSubmitting, isValid, errors }) => (
            <Form className="ui form">
              <TextInput name="email" placeholder="Address Email" />
              <TextInput type="password" name="password" placeholder="Password" />
              {
                errors.auth && <Label basic color="red" style={{ marginBottom: 10 }} content={errors.auth} />
              }
              <Button 
                type="submit" 
                loading={isSubmitting}
                disabled={!dirty || isSubmitting || !isValid}
                fluid
                size="large"
                color="teal"
                content="Login" 
              />
              <Divider horizontal>Or</Divider>
              <SocialLogin />
            </Form>
          )
        }

      </Formik>
      
    </ModalWrapper>
  )
}

export default LoginForm