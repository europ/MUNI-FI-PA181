import React from "react";
import { compose } from "recompose";
import { map } from "lodash";
import { withRouter } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

const DrawerComponent = ({ history, items, open, onClose, texts }) => (
  <Drawer {...{ open, onClose, className: "drawer" }}>
    <div
      {...{
        className: "drawer-header",
        onClick: onClose
      }}
    >
      <Typography {...{ variant: "h5" }}>{texts.APP_NAME}</Typography>
    </div>
    <List {...{ className: "drawer-list" }}>
      {map(items, ({ label, url }, key) => (
        <ListItem {...{ key, button: true }}>
          <ListItemText
            {...{
              primary: label,
              onClick: () => {
                history.push(url);
                onClose();
              }
            }}
          />
        </ListItem>
      ))}
    </List>
  </Drawer>
);

export default compose(withRouter)(DrawerComponent);
