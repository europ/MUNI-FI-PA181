import React from "react";
import { compose, withProps, mapProps, defaultProps } from "recompose";
import Modal from "@material-ui/core/Modal";

import { Card } from ".";

const ModalComponent = props => <Modal {...props} />;

export default compose(
  defaultProps({ content: () => <div /> }),
  withProps(({ content: Component, ...props }) => ({
    children: (
      <Card
        {...{
          className: "modal-content",
          content: <Component {...{ modalProps: props }} />
        }}
      />
    )
  })),
  mapProps(({ content, ...rest }) => rest)
)(ModalComponent);
