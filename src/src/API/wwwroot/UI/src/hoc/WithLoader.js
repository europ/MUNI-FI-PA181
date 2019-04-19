import React from "react";
import { compose, withState, withHandlers } from "recompose";

import { Loader } from "../components";

const enhance = compose(
  withState("loaderVisible", "setLoaderVisible", false),
  withHandlers({
    showLoader: ({ setLoaderVisible, loaderVisible }) => (show = true) => {
      const newLoaderVisibility = !!show;
      if (loaderVisible !== newLoaderVisibility) {
        setLoaderVisible(newLoaderVisibility);
      }
    }
  })
);

const WithLoader = BaseComponent =>
  enhance(({ loaderVisible, setLoaderVisible, ...props }) => (
    <>
      <BaseComponent {...props} />
      {loaderVisible && <Loader />}
    </>
  ));

export default WithLoader;
