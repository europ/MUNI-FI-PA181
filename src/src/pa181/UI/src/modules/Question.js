import React from "react";
import { compose, withProps } from "recompose";
import { map } from "lodash";
import { withRouter } from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";
import LinearProgress from "@material-ui/core/LinearProgress";

import { Card, Button, DropDown, Input } from "../components";

const question = {
  text: "Is anybody here?",
  description:
    "Více odpovědí může být správně. No a ještě je tu třeba nějaký hodně dlouhý popis vědění lidstva a příhoda z mládí.",
  answers: [
    { text: "Yes", correct: true },
    { text: "No", correct: false },
    { text: "Maybe", correct: false },
    { text: "I don't know", correct: true },
    { text: "Ask someone else", correct: false }
  ]
};

const Question = ({ match, texts, questionNumber, count }) => (
  <div {...{ className: "question" }}>
    <div {...{ className: "top" }}>
      <div {...{ className: "main margin-bottom-big" }}>
        <div {...{ className: "flex-row-space-between" }}>
          <h2 {...{ className: "question-text" }}>{question.text}</h2>
          <div {...{ className: "flex-centered" }}>
            <p {...{ className: "margin-right-small" }}>{texts.QUESTION}</p>
            <Input
              {...{
                defaultValue: questionNumber,
                className: "input margin-bottom margin-right-small"
              }}
            />
            <p {...{ className: "margin-right" }}>{`/ ${count}`}</p>
            <DropDown
              {...{
                label: texts.MENU,
                raised: true,
                className: "margin-bottom menu",
                items: [
                  { label: texts.DELETE_STATISTICS, onClick: () => null },
                  { label: texts.HIDE_STATISTICS, onClick: () => null },
                  { label: texts.RESET_TIMER, onClick: () => null }
                ]
              }}
            />
          </div>
        </div>
        <div {...{ className: "flex-col-centered width-full" }}>
          {map(question.answers, ({ text }, key) => (
            <Card
              {...{
                key,
                content: (
                  <CardContent {...{ className: "card-content" }}>
                    <div {...{ className: "flex-row-centered" }}>{text}</div>
                  </CardContent>
                ),
                className: "card"
              }}
            />
          ))}
        </div>
        <div {...{ className: "button-row" }}>
          {map(
            [
              { label: texts.PREV },
              { label: texts.EVALUATE, color: "primary" },
              { label: texts.NEXT }
            ],
            (button, key) => (
              <Button
                {...{
                  key,
                  raised: true,
                  className: "button",
                  ...button
                }}
              />
            )
          )}
        </div>
      </div>
      <div {...{ className: "info margin-bottom-big" }}>
        <div {...{ className: "flex-centered" }}>
          <p {...{ className: "margin-right-small" }}>{texts.TIMER}:</p>
          <p>
            <strong>12:42</strong>
          </p>
        </div>
        <div {...{ className: "margin-bottom correct" }}>
          <div {...{ className: "flex-centered" }}>
            <p {...{ className: "margin-right-small-only" }}>
              {texts.CORRECT}:
            </p>
            <p {...{ className: "margin-none" }}>
              <strong>{`${questionNumber} / ${count} (${Math.round(
                (questionNumber / count) * 100 * 10
              ) / 10}%)`}</strong>
            </p>
          </div>
          <LinearProgress
            {...{
              variant: "determinate",
              value: 42,
              style: { marginTop: "0.25em", height: "0.5em" }
            }}
          />
        </div>
        {question.description && (
          <div {...{ className: "flex-centered description" }}>
            <p {...{ className: "margin-right-small" }}>{texts.DESCRIPTION}:</p>
            <p>
              <strong>{question.description}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
    <div {...{ className: "width-full" }}>
      <h4 {...{ className: "margin-bottom-small-only" }}>
        {texts.WRONGLY_ANSWERED_QUESTIONS}:
      </h4>
      <div {...{ className: "flex-row flex-wrap width-full" }}>
        {map(
          [
            "2",
            "3",
            "9",
            "42",
            "69",
            "123",
            "265",
            "654",
            "985",
            "1111",
            "1112",
            "9223372036854775804",
            "9223372036854775805",
            "9223372036854775806",
            "9223372036854775807"
          ],
          (label, key) => (
            <Button
              {...{
                key,
                label,
                raised: true,
                className: "margin-right margin-bottom"
              }}
            />
          )
        )}
      </div>
    </div>
  </div>
);

export default compose(
  withRouter,
  withProps(({ match }) => ({
    test: match.params.test,
    questionNumber: Number(match.params.question),
    count: 256
  }))
)(Question);
