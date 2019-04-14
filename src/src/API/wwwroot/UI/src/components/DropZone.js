import React from "react";
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

export default DropZone;
