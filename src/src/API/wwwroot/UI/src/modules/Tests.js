import React from "react";
import { compose, withState, lifecycle, withHandlers } from "recompose";
import { withRouter } from "react-router-dom";
import { map, get } from "lodash";
import CardContent from "@material-ui/core/CardContent";

import { Card, ModalButton, Button, FlagIcon } from "../components";
import { withLoader } from "../hoc";
import { getTests, deleteTest } from "../actions";

const Tests = ({ tests, history, texts, showLoader, loadTests }) => (
  <div {...{ className: "tests" }}>
    {map(tests, ({ id, name, questions, language }, key) => (
      <Card
        {...{
          key,
          onClick: () => history.push(`/tests/${id}/1`),
          className: "card",
          content: (
            <CardContent
              {...{
                className: "card-content"
              }}
            >
              <div
                {...{
                  className: "card-text"
                }}
              >
                <FlagIcon
                  {...{
                    language
                  }}
                />
                <div
                  {...{
                    className: "flex-col margin-left"
                  }}
                >
                  <h2
                    {...{
                      className: "margin-bottom-small-only"
                    }}
                  >
                    {name}
                  </h2>
                  <p {...{ className: "margin-none" }}>
                    {texts.NUMBER_OF_QUESTIONS}:{" "}
                    <strong>{get(questions, "length", 0)}</strong>
                  </p>
                </div>
              </div>
              <div
                {...{
                  className: "card-actions",
                  onClick: e => e.stopPropagation()
                }}
              >
                <ModalButton
                  {...{
                    label: texts.DELETE,
                    className: "margin-left",
                    content: ({ modalProps: { onClose } }) => (
                      <div {...{ className: "padding" }}>
                        <h4>{texts.DELETE_TEST_TEXT}</h4>
                        <div {...{ className: "flex-row-end" }}>
                          {map(
                            [
                              {
                                label: texts.CANCEL,
                                onClick: onClose
                              },
                              {
                                label: texts.SUBMIT,
                                color: "primary",
                                onClick: async () => {
                                  showLoader();
                                  const ok = await deleteTest(id);
                                  if (ok) {
                                    onClose();
                                    await loadTests();
                                  }
                                  showLoader(false);
                                }
                              }
                            ],
                            (button, key) => (
                              <Button
                                {...{
                                  key,
                                  outlined: true,
                                  className: "margin-left-small",
                                  ...button
                                }}
                              />
                            )
                          )}
                        </div>
                      </div>
                    )
                  }}
                />
              </div>
            </CardContent>
          )
        }}
      />
    ))}
  </div>
);

export default compose(
  withRouter,
  withLoader,
  withState("tests", "setTests", []),
  withHandlers({
    loadTests: ({ setTests }) => async () => {
      const response = await getTests();

      setTests(response);
    }
  }),
  lifecycle({
    async componentWillMount() {
      const { loadTests, showLoader } = this.props;

      showLoader();

      await loadTests();

      showLoader(false);
    }
  })
)(Tests);
