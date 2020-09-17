import React from 'react';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "semantic-ui-react";
import TextInput from '../../../App/common/form/textInput';
import TextAreaInput from '../../../App/common/form/textAreaInput';
import { updateUserProfile } from '../../../App/firestore/firestoreService';

const ProfileForm = ({ profile }) => {
  const initialValues = {
    displayName: profile.displayName,
    description: profile.description
  }

  const validationSchema = Yup.object().shape({
    displayName: Yup.string().required(),
  })

  return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          try {
            await updateUserProfile(values);
          } catch(error) {
            console.log(error);
          } finally {
            actions.isSubmitting(false);
          }
        }}
      >
        {
          ({ dirty, isSubmitting, isValid, errors }) => (
            <Form className="ui form">
              <TextInput name="displayName" placeholder="Display Name" />
              <TextAreaInput name="description" placeholder="Description" />
              <Button 
                type="submit" 
                loading={isSubmitting}
                disabled={!dirty || isSubmitting || !isValid}
                floated="right"
                size="large"
                positive
                content="Update Profile" 
              />
            </Form>
          )
        }

      </Formik>
  )
}

export default ProfileForm;