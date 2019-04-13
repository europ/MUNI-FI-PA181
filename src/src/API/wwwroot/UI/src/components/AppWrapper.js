import React from "react";
import { compose, withState } from "recompose";

import { AppBar, Drawer } from ".";

const AppWrapper = ({
  children,
  drawerOpen,
  setDrawerOpen,
  items,
  texts,
  language,
  changeLanguage
}) => (
  <div>
    <AppBar {...{ items, setDrawerOpen, texts, language, changeLanguage }} />
    <Drawer
      {...{
        open: drawerOpen,
        items,
        texts,
        onClose: () => setDrawerOpen(false)
      }}
    />
    <div
      {...{
        className: "page-wrapper"
      }}
    >
      <div
        {...{
          className: "page-wrapper-inner"
        }}
      >
        {children}
      </div>
    </div>
  </div>
);

export default compose(withState("drawerOpen", "setDrawerOpen", false))(
  AppWrapper
);
