import React from "react";
import { withRouter } from "react-router-dom";
import { compose, withHandlers } from "recompose";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { map, get } from "lodash";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";

import { FormInput, FormSelect, Button, UploadFile, Card } from "../components";
import { withLoader } from "../hoc";
import { postTest } from "../actions";
import { validation } from "../utils";
import { languagesEnum } from "../enums";

const NewTest = ({ texts, handleSubmit, language, change }) => (
  <form {...{ onSubmit: handleSubmit }}>
    <div {...{ className: "form" }}>
      <h1>{texts.NEW_TEST}</h1>
      <Card
        {...{
          className: "width-full",
          content: (
            <CardContent>
              <Field
                {...{
                  component: FormInput,
                  label: (
                    <span>
                      {texts.NAME}
                      <span {...{ className: "color-red" }}> *</span>
                    </span>
                  ),
                  name: "name",
                  fullWidth: true,
                  containerClassName: "margin-bottom",
                  validate: [validation.required[language]]
                }}
              />
              <Field
                {...{
                  component: FormSelect,
                  label: (
                    <span>
                      {texts.LANGUAGE}
                      <span {...{ className: "color-red" }}> *</span>
                    </span>
                  ),
                  name: "language",
                  items: languagesEnum,
                  labelFunction: o => get(o, "label"),
                  valueFunction: o => get(o, "id"),
                  fullWidth: true,
                  containerClassName: "margin-bottom",
                  validate: [validation.required[language]]
                }}
              />
              <Field
                {...{
                  component: FormInput,
                  label: (
                    <span>
                      {texts.TEST_JSON_STRUCTURE}
                      <span {...{ className: "color-red" }}> *</span>
                    </span>
                  ),
                  name: "questions",
                  fullWidth: true,
                  containerClassName: "margin-bottom-very-small",
                  multiline: true,
                  rows: 3,
                  rowsMax: 10,
                  validate: [
                    validation.required[language],
                    validation.json[language]
                  ]
                }}
              />
              <UploadFile
                {...{
                  label: texts.UPLOAD_FILE,
                  closeButtonLabel: texts.CANCEL,
                  dropZoneLabel: texts.DROP_FILE_HERE,
                  className: "margin-bottom width-full",
                  onDrop: (file, onClose) => {
                    const reader = new FileReader();
                    reader.readAsText(file);
                    reader.onloadend = () => {
                      change("questions", reader.result);
                      onClose();
                    };
                  }
                }}
              />
              <Field
                {...{
                  component: FormInput,
                  label: texts.DESCRIPTION,
                  name: "description",
                  fullWidth: true,
                  containerClassName: "margin-bottom-big",
                  multiline: true,
                  rows: 3,
                  rowsMax: 10
                }}
              />
              <Divider />
              <div
                {...{ className: "flex-row-space-between margin-top-small" }}
              >
                <p {...{ className: "color-red" }}>* {texts.REQUIRED}</p>
                <div {...{ className: "flex" }}>
                  {map(
                    [
                      {
                        label: texts.SUBMIT,
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
    onSubmit: ({ showLoader, history, texts }) => async ({
      questions,
      ...formData
    }) => {
      showLoader();
      const ok = await postTest({
        ...formData,
        questions: JSON.parse(questions)
      });
      showLoader(false);
      if (ok) {
        history.push("/");
      } else {
        throw new SubmissionError({
          description: texts.NEW_TEST_FAILED
        });
      }
    }
  }),
  reduxForm({
    form: "new-test",
    enableReinitialize: true
  })
)(NewTest);
