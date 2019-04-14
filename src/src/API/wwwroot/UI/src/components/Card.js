import React from "react";
import { compose, renameProp, mapProps } from "recompose";
import Card from "@material-ui/core/Card";

const CardComponent = props => <Card {...props} />;

export default compose(
  renameProp("content", "children"),
  mapProps(({ content, ...rest }) => rest)
)(CardComponent);
