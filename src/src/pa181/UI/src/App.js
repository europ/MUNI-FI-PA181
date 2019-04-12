import React from "react";
import { compose, withState, withHandlers, withProps } from "recompose";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { map } from "lodash";
import { MuiThemeProvider } from "@material-ui/core/styles";

import { theme } from "./theme";
import { AppWrapper } from "./components";
import { Home, SignIn, About, Tests, Question, AddTest } from "./modules";
import { languages, textsEnum } from "./enums";

const App = ({ menuItems, componentProps }) => (
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
);

export default compose(
  withState("appState", "setAppState", { language: languages.CZ }),
  withHandlers({
    updateAppState: ({ appState, setAppState }) => patch =>
      setAppState({ ...appState, ...patch })
  }),
  withHandlers({
    changeLanguage: ({ updateAppState }) => language =>
      updateAppState({ language })
  }),
  withProps(({ appState }) => ({
    texts: textsEnum[appState.language],
    language: appState.language
  })),
  withProps(({ texts, language, updateAppState, changeLanguage }) => ({
    menuItems: [
      { label: texts.HOME, url: "/", exact: true, component: Home },
      { label: texts.TESTS, url: "/tests", exact: true, component: Tests },
      { label: texts.ADD_NEW_TEST, url: "/add-test", component: AddTest },
      { label: texts.ABOUT, url: "/about", component: About }
    ],
    componentProps: { texts, language, updateAppState, changeLanguage }
  }))
)(App);
