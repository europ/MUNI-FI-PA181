import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import { Select, ErrorBlock } from "..";

const FormSelect = ({
  meta: { touched, error },
  input,
  containerClassName,
  label,
  ...props
}) => (
  <div {...{ className: containerClassName }}>
    <FormControl {...{ fullWidth: props.fullWidth }}>
      <InputLabel {...{ htmlFor: input.name }}>{label}</InputLabel>
      <Select {...{ ...input, ...props }} />
      {touched && <ErrorBlock {...{ error }} />}
    </FormControl>
  </div>
);

export default FormSelect;
