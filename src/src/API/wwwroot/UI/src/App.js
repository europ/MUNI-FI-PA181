import React from "react";
import jwt_decode from "jwt-decode";
import { Provider } from "react-redux";
import {
  compose,
  withState,
  withHandlers,
  withProps,
  lifecycle
} from "recompose";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { map, find, isEmpty, get } from "lodash";
import { MuiThemeProvider } from "@material-ui/core/styles";

import { theme } from "./theme";
import { AppWrapper } from "./components";
import { Login, About, Tests, Question, NewTest, Help } from "./modules";
import { languages, languagesEnum, textsEnum } from "./enums";
import { storage } from "./utils";
import { getUser } from "./actions";

const App = ({ store, menuItems, componentProps }) => (
  <Provider {...{ store }}>
    <MuiThemeProvider {...{ theme }}>
      <BrowserRouter>
        <AppWrapper {...{ items: menuItems, ...componentProps }}>
          <Switch>
            {map(
              [
                ...map(menuItems, ({ url, exact, component }) => ({
                  path: url,
                  exact,
                  component
                })),
                { path: "/login", component: Login },
                { path: "/tests/:test/:question", component: Question }
              ],
              ({ component: Component, ...route }, key) => (
                <Route
                  {...{
                    key,
                    ...route,
                    render: routeProps => (
                      <Component {...{ ...routeProps, ...componentProps }} />
                    )
                  }}
                />
              )
            )}
          </Switch>
        </AppWrapper>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
);

export default compose(
  withState("appState", "setAppState", {
    language: languages.CZ,
    user: null,
    loadingUser: false
  }),
  withHandlers({
    updateAppState: ({ appState, setAppState }) => patch =>
      setAppState({ ...appState, ...patch })
  }),
  withHandlers({
    changeLanguage: ({ updateAppState }) => language => {
      updateAppState({ language });
      storage.put("language", language);
    }
  }),
  lifecycle({
    async componentWillMount() {
      const { changeLanguage, updateAppState } = this.props;

      const language = storage.get("language");

      if (find(languagesEnum, ({ id }) => id === language)) {
        changeLanguage(language);
      }

      const token = storage.get("token");

      updateAppState({ loadingUser: true });

      if (!isEmpty(token) && token !== "null" && token !== "undefined") {
        const tokenUser = jwt_decode(token);
        if (get(tokenUser, "unique_name")) {
          const user = await getUser(get(tokenUser, "unique_name"));
          updateAppState({ user });
        }
      }

      updateAppState({ loadingUser: false });
    }
  }),
  withProps(({ appState }) => ({
    texts: textsEnum[appState.language],
    language: appState.language,
    user: appState.user,
    loadingUser: appState.loadingUser
  })),
  withProps(
    ({
      texts,
      language,
      updateAppState,
      changeLanguage,
      user,
      loadingUser
    }) => ({
      menuItems: [
        { label: texts.TESTS, url: "/", exact: true, component: Tests },
        { label: texts.ADD_NEW_TEST, url: "/new-test", component: NewTest },
        { label: texts.HELP, url: "/help", component: Help },
        { label: texts.ABOUT, url: "/about", component: About }
      ],
      componentProps: {
        texts,
        language,
        updateAppState,
        changeLanguage,
        user,
        loadingUser
      }
    })
  )
)(App);
