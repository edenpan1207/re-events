import React from "react";
import { useField } from 'formik';
import { FormField, Label } from 'semantic-ui-react';

const TextAreaInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormField>
      <label>
        {label}
        <textarea {...field} {...props} />
      </label>
      {meta.touched && meta.error ? (
        <Label basic color="red" content={meta.error} />
      ) : null}
    </FormField>
  );
};

export default TextAreaInput;
