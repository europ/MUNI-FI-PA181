import React from "react";

import { Input, ErrorBlock } from "..";

const FormInput = ({
  meta: { touched, error },
  input,
  containerClassName,
  ...props
}) => (
  <div {...{ className: containerClassName }}>
    <Input {...{ ...input, ...props }} />
    {touched && <ErrorBlock {...{ error }} />}
  </div>
);

export default FormInput;
