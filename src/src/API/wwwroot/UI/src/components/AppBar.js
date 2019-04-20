import React from "react";
import { compose, withState } from "recompose";
import { map } from "lodash";
import { withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/icons/Menu";

import { Button, FlagIcon, Modal } from ".";
import { languages, languagesEnum } from "../enums";

const AppBarComponent = ({
  history,
  items,
  setDrawerOpen,
  texts,
  language,
  modalOpen,
  setModalOpen,
  changeLanguage
}) => (
  <>
    <AppBar {...{ className: "appbar" }}>
      <Toolbar>
        <div {...{ className: "flex-row-space-between" }}>
          <div {...{ className: "flex-centered" }}>
            <IconButton
              {...{
                onClick: () => setDrawerOpen(true),
                color: "inherit",
                className: "not-big-desktop-only"
              }}
            >
              <Menu />
            </IconButton>
            <Typography
              {...{ variant: "h6", color: "inherit", className: "title" }}
            >
              {texts.APP_NAME}
            </Typography>
            <div {...{ className: "flex-centered" }}>
              {map(items, ({ url, label }, key) => (
                <Button
                  {...{
                    key,
                    color: "inherit",
                    className: "big-desktop-only margin-left-big",
                    onClick: () => history.push(url),
                    label
                  }}
                />
              ))}
            </div>
          </div>
          <div>
            <FlagIcon
              {...{
                language,
                onClick: () => setModalOpen(true)
              }}
            />
          </div>
        </div>
      </Toolbar>
    </AppBar>
    <Modal
      {...{
        open: modalOpen,
        onClose: () => setModalOpen(false),
        content: () => (
          <div {...{ className: "flex-col-centered modal-languages" }}>
            {map(languagesEnum, ({ id }, key) => (
              <FlagIcon
                {...{
                  key,
                  language: id,
                  className: `big ${
                    id === languages.CZ || id === languages.SK
                      ? "with-border"
                      : ""
                  }`,
                  onClick: () => {
                    changeLanguage(id);
                    setModalOpen(false);
                  }
                }}
              />
            ))}
          </div>
        )
      }}
    />
  </>
);

export default compose(
  withRouter,
  withState("modalOpen", "setModalOpen", false)
)(AppBarComponent);
