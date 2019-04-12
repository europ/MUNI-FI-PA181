import React from "react";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { map } from "lodash";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import Star from "@material-ui/icons/Star";
import Add from "@material-ui/icons/Add";

import { Card, Button } from "../components";

const tests = [
  { name: "PA181", count: 12, favorite: true },
  { name: "PV239", count: 1, favorite: true },
  { name: "PA152", count: 164 },
  {
    name: "PA164 - půlsemestrálka",
    count: 99
  },
  { name: "PV136", count: 1235 },
  { name: "PV136", count: 1235 },
  { name: "PV136", count: 1235 },
  { name: "PV136", count: 1235 }
];

const Tests = ({ history, texts }) => (
  <div {...{ className: "tests" }}>
    {map(tests, ({ name, count, favorite }, key) => (
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
                    {texts.NUMBER_OF_QUESTIONS}: {count}
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
    <Fab
      {...{
        color: "primary",
        onClick: () => history.push("/new-test"),
        className: "floating-button"
      }}
    >
      <Add />
    </Fab>
  </div>
);

export default compose(withRouter)(Tests);
