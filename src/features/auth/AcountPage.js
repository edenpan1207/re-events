import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Segment, Header, Button, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import TextInput from "../../App/common/form/textInput";
import { useSelector } from "react-redux";
import { updateUserPassword } from '../../App/firestore/firebaseService';

const AccountPage = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const initialValues = {
    newPassword1: "",
    newPassword2: "",
  };

  const validationSchema = Yup.object().shape({
    newPassword1: Yup.string().required("Password is Required"),
    newPassword2: Yup.string().oneOf(
      [Yup.ref("newPassword1"), null],
      "Password is not match"
    ),
  });

  return (
    <Segment>
      <Header dividing size="large" content="Account" />
      {currentUser.providerId === "password" && (
        <>
          <Header color="teal" sub content="Change Password" />
          <p>Use this form to change your password</p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
              try {
                await updateUserPassword(values);
              } catch(error) {
                actions.setErrors(error.message);
              } finally {
                actions.setSubmitting(false);
              }
            }}
          >
            {({ dirty, isSubmitting, isValid, errors }) => (
              <Form className="ui form">
                <TextInput
                  type="password"
                  name="newPassword1"
                  placeholder="New password"
                />
                <TextInput
                  type="password"
                  name="newPassword2"
                  placeholder="Confirm password"
                />
                {errors.auth && (
                  <Label
                    basic
                    color="red"
                    style={{ marginBottom: 10 }}
                    content={errors.auth}
                  />
                )}
                <Button
                  type="submit"
                  style={{display: 'block'}}
                  loading={isSubmitting}
                  disabled={!dirty || isSubmitting || !isValid}
                  positive
                  size="large"
                  content="Update password"
                />
              </Form>
            )}
          </Formik>
        </>
      )}
      {currentUser.providerId === "facebook.com" && (
        <>
          <Header color="teal" sub content="Facebook Account" />
          <p>Visit Facebook to update your account</p>
          <Button
            icon="facebook"
            as={Link}
            to="https://facebook.com"
            color="facebook"
            content="Go to Facebook"
          />
        </>
      )}
      {currentUser.providerId === "google.com" && (
        <>
          <Header color="teal" sub content="Google Account" />
          <p>Visit Google to update your account</p>
          <Button
            icon="google"
            as={Link}
            // === wait for change ===
            to="https://facebook.com"
            color="google plus"
            content="Go to Google"
          />
        </>
      )}
    </Segment>
  );
};

export default AccountPage;
