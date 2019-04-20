import React from "react";
import { Provider } from "react-redux";
import {
  compose,
  withState,
  withHandlers,
  withProps,
  lifecycle
} from "recompose";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { map, find } from "lodash";
import { MuiThemeProvider } from "@material-ui/core/styles";

import { theme } from "./theme";
import { AppWrapper } from "./components";
import { SignIn, About, Tests, Question, NewTest } from "./modules";
import { languages, languagesEnum, textsEnum } from "./enums";
import { storage } from "./utils";

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
                { path: "/sign-in", component: SignIn },
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
  withState("appState", "setAppState", { language: languages.CZ }),
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
    componentWillMount() {
      const { changeLanguage } = this.props;

      const language = storage.get("language");

      if (find(languagesEnum, ({ id }) => id === language)) {
        changeLanguage(language);
      }
    }
  }),
  withProps(({ appState }) => ({
    texts: textsEnum[appState.language],
    language: appState.language
  })),
  withProps(({ texts, language, updateAppState, changeLanguage }) => ({
    menuItems: [
      { label: texts.TESTS, url: "/", exact: true, component: Tests },
      { label: texts.ADD_NEW_TEST, url: "/new-test", component: NewTest },
      { label: texts.ABOUT, url: "/about", component: About }
    ],
    componentProps: { texts, language, updateAppState, changeLanguage }
  }))
)(App);
