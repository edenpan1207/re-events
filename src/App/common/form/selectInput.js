import React from "react";
import { FormField, Label, Select } from "semantic-ui-react";
import { useField } from "formik";

const SelectInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  return (
    <FormField>
      <label>{label}</label>
      <Select
        value={field.value || null}
        onChange={(e, data) => helpers.setValue(data.value)}
        onBlur={() => helpers.setTouched(true)}
        {...props}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red" content={meta.error} />
      ) : null}
    </FormField>
  );
};

export default SelectInput;
