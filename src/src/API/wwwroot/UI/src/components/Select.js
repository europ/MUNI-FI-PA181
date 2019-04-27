import React from "react";
import { noop, map, identity } from "lodash";
import { compose, defaultProps, withProps, mapProps } from "recompose";
import MUISelect from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const Select = props => <MUISelect {...props} />;

export default compose(
  defaultProps({
    items: [],
    onChange: noop,
    valueFunction: identity,
    labelFunction: identity,
    id: "select"
  }),
  withProps(({ items, valueFunction, labelFunction, name, id }) => ({
    inputProps: { name, id: `${id}-input` },
    children: map(items, (item, key) => (
      <MenuItem {...{ key, value: valueFunction(item) }}>
        {labelFunction(item)}
      </MenuItem>
    ))
  })),
  mapProps(({ items, valueFunction, labelFunction, name, ...rest }) => rest)
)(Select);
