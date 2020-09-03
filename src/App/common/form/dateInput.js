import React from "react";
import { FormField, Label } from "semantic-ui-react";
import { useField, useFormikContext } from "formik";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const {setFieldValue} = useFormikContext();

  return (
    <FormField>
      <label>{label}</label>
      <DatePicker
        {...props}
        {...field}
        selected={(field.value && new Date(field.value)) || null}
        onChange={value => setFieldValue(field.name, value)}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red" content={meta.error} />
      ) : null}
    </FormField>
  );
};

export default DateInput;
