import React from "react";
import { withRouter } from "react-router-dom";
import { compose, withHandlers } from "recompose";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { map } from "lodash";
import CardContent from "@material-ui/core/CardContent";

import { FormInput, Button, Card } from "../components";
import { withLoader } from "../hoc";
import { login } from "../actions";
import { validation } from "../utils";

const Login = ({ handleSubmit, texts, language }) => (
  <form {...{ onSubmit: handleSubmit }}>
    <div {...{ className: "form" }}>
      <Card
        {...{
          className: "width-full",
          content: (
            <CardContent>
              <Field
                {...{
                  component: FormInput,
                  label: texts.USERNAME,
                  name: "username",
                  fullWidth: true,
                  containerClassName: "margin-bottom",
                  validate: [validation.required[language]]
                }}
              />
              <Field
                {...{
                  component: FormInput,
                  label: texts.PASSWORD,
                  name: "password",
                  type: "password",
                  fullWidth: true,
                  containerClassName: "margin-bottom-small",
                  validate: [validation.required[language]]
                }}
              />
              <div {...{ className: "flex-row-end" }}>
                {map(
                  [
                    {
                      label: texts.LOGIN,
                      raised: true,
                      color: "primary",
                      className: "margin-left",
                      type: "submit"
                    }
                  ],
                  (button, key) => (
                    <Button {...{ key, ...button }} />
                  )
                )}
              </div>
            </CardContent>
          )
        }}
      />
    </div>
  </form>
);

export default compose(
  withRouter,
  withLoader,
  withHandlers({
    onSubmit: ({
      showLoader,
      history,
      texts,
      updateAppState
    }) => async formData => {
      showLoader();
      const user = await login(formData);
      showLoader(false);
      if (user) {
        updateAppState({ user });
        history.push("/");
      } else {
        throw new SubmissionError({
          password: texts.INCORRECT_USERNAME_OR_PASSWORD
        });
      }
    }
  }),
  reduxForm({
    form: "login",
    enableReinitialize: true
  })
)(Login);
