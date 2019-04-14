import React from "react";
import {
  compose,
  defaultProps,
  renameProp,
  withProps,
  mapProps
} from "recompose";
import Button from "@material-ui/core/Button";

const ButtonComponent = props => <Button {...props} />;

export default compose(
  defaultProps({ label: "" }),
  renameProp("label", "children"),
  withProps(({ raised, outlined }) => ({
    variant: raised ? "contained" : outlined ? "outlined" : "text"
  })),
  mapProps(({ label, raised, outlined, ...rest }) => rest)
)(ButtonComponent);
