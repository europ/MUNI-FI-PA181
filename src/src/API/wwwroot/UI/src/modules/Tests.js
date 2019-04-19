import React from "react";
import { compose, withState, lifecycle } from "recompose";
import { withRouter } from "react-router-dom";
import { map, get } from "lodash";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Star from "@material-ui/icons/Star";

import { Card, Button } from "../components";
import { withLoader } from "../hoc";
import { getTests } from "../actions";

const Tests = ({ tests, history, texts }) => (
  <div {...{ className: "tests" }}>
    {map(tests, ({ name, questions, favorite }, key) => (
      <Card
        {...{
          key,
          onClick: () => history.push(`/tests/${name}/1`),
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
                <IconButton>
                  <Star {...{ color: favorite ? "primary" : undefined }} />
                </IconButton>
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
                    {texts.NUMBER_OF_QUESTIONS}: {get(questions, "length", 0)}
                  </p>
                </div>
              </div>
              <div
                {...{
                  className: "card-actions"
                }}
              >
                <Button
                  {...{ label: texts.DELETE, className: "margin-left" }}
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
  lifecycle({
    async componentWillMount() {
      const { setTests, showLoader } = this.props;

      showLoader();

      const response = await getTests();

      setTests(response);

      showLoader(false);
    }
  })
)(Tests);
