import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loader = props => (
  <div {...{ className: "loader" }}>
    <CircularProgress {...props} />
  </div>
);

export default Loader;
