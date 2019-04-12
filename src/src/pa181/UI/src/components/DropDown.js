import React from "react";
import { compose, withState, withProps, renameProp } from "recompose";
import IconButton from "@material-ui/core/IconButton";

import { Button, Menu } from ".";

const DropDownComponent = ({
  anchorEl,
  setAnchorEl,
  items,
  ButtonComponent,
  ...props
}) => (
  <>
    <ButtonComponent
      {...{
        ariaOwns: anchorEl ? "render-props-menu" : undefined,
        ariaHaspopup: "true",
        onClick: event => setAnchorEl(event.currentTarget),
        ...props
      }}
    />
    <Menu
      {...{
        anchorEl,
        open: !!anchorEl,
        onClose: () => setAnchorEl(null),
        closeOnItemClick: true,
        items
      }}
    />
  </>
);

export default compose(
  withState("anchorEl", "setAnchorEl", null),
  withProps(({ icon }) => ({ ButtonComponent: icon ? IconButton : Button })),
  renameProp("icon", "children")
)(DropDownComponent);
