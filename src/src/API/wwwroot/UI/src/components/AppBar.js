import React from "react";
import classNames from "classnames";
import { compose, withState } from "recompose";
import { map } from "lodash";
import { withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/icons/Menu";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Button, FlagIcon, Modal, DropDown } from ".";
import { languages, languagesEnum } from "../enums";
import { logout } from "../actions";

const AppBarComponent = ({
  history,
  items,
  setDrawerOpen,
  texts,
  language,
  modalOpen,
  setModalOpen,
  changeLanguage,
  user,
  updateAppState,
  loadingUser
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
          <div {...{ className: "flex-centered" }}>
            {loadingUser ? (
              <CircularProgress
                {...{
                  size: 24,
                  color: "secondary",
                  className: "margin-right"
                }}
              />
            ) : user ? (
              <DropDown
                {...{
                  color: "inherit",
                  className: "margin-right text-transform-none",
                  label: user.username,
                  items: [
                    {
                      label: texts.LOGOUT,
                      onClick: () => {
                        logout();
                        updateAppState({ user: null });
                      }
                    }
                  ]
                }}
              />
            ) : (
              <Button
                {...{
                  color: "inherit",
                  className: "margin-right",
                  onClick: () => history.push("/login"),
                  label: texts.LOGIN
                }}
              />
            )}
            <FlagIcon
              {...{
                language,
                className: "with-hover",
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
                  className: classNames("big with-hover", {
                    "with-border": id === languages.CZ || id === languages.SK
                  }),
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
