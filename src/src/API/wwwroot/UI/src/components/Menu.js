import React from "react";
import { compose, withProps, mapProps, defaultProps } from "recompose";
import { map } from "lodash";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const MenuComponent = props => <Menu {...props} />;

export default compose(
  defaultProps({ id: "menu", closeOnItemClick: false }),
  withProps(({ items, onClose, closeOnItemClick }) => ({
    children: map(items, ({ label, onClick, ...item }) => (
      <MenuItem
        {...{
          key: label,
          onClick: () => {
            onClick();
            if (closeOnItemClick) {
              onClose();
            }
          },
          ...item
        }}
      >
        {label}
      </MenuItem>
    ))
  })),
  mapProps(({ items, closeOnItemClick, ...rest }) => rest)
)(MenuComponent);
