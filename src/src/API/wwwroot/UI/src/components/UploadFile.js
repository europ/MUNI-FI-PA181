import React from "react";
import { compose, withProps } from "recompose";
import Divider from "@material-ui/core/Divider";

import { ModalButton, Button, DropZone } from ".";

const UploadFile = props => <ModalButton {...props} />;

export default compose(
  withProps(({ closeButtonLabel, dropZoneLabel }) => ({
    content: ({ modalProps: { onClose } }) => (
      <div {...{ className: "upload-file" }}>
        <DropZone {...{ label: dropZoneLabel, onDrop: onClose }} />
        <Divider />
        <div {...{ className: "button-row" }}>
          <Button
            {...{ label: closeButtonLabel, outlined: true, onClick: onClose }}
          />
        </div>
      </div>
    )
  }))
)(UploadFile);
