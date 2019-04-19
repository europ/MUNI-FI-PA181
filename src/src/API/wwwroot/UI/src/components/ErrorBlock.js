import React from "react";

const ErrorBlock = ({ error }) =>
  error ? <div {...{ className: "color-red" }}>{error}</div> : <div />;

export default ErrorBlock;
