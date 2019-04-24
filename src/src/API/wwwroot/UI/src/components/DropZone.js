import React from "react";
import { compose, defaultProps, withHandlers } from "recompose";
import { noop } from "lodash";
import ReactDropzone from "react-dropzone";
import CloudUpload from "@material-ui/icons/CloudUpload";

const DropZone = ({ label, ...props }) => (
  <ReactDropzone {...props}>
    {({ getRootProps, getInputProps }) => (
      <div {...{ ...getRootProps(), className: "drop-zone" }}>
        <input {...getInputProps()} />
        <CloudUpload {...{ className: "icon" }} />
        <h3 {...{ className: "label" }}>{label}</h3>
      </div>
    )}
  </ReactDropzone>
);

export default compose(
  defaultProps({ onDrop: noop }),
  withHandlers({
    onDrop: ({ onDrop }) => files => {
      const file = files[0];
      if (file) {
        onDrop(file);
      }
    }
  })
)(DropZone);
