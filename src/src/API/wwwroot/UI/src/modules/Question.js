import React from "react";
import {
  compose,
  withProps,
  withHandlers,
  withState,
  lifecycle
} from "recompose";
import { map, get, filter, find, isEmpty, sortBy } from "lodash";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";
import LinearProgress from "@material-ui/core/LinearProgress";

import { Card, Button, DropDown, Input } from "../components";
import { millisecondsToString } from "../utils";

const Question = ({
  history,
  testName,
  texts,
  questionNumber,
  count,
  question,
  evaluated,
  clickAnswer,
  wronglyAnswered,
  resetStatistics,
  correctlyAnswered,
  correctAnswersPercent,
  evaluate,
  statisticsHidden,
  setStatisticsHidden,
  infoHidden,
  setInfoHidden,
  resetTimer
}) =>
  question ? (
    <div {...{ className: "question" }}>
      <div {...{ className: "top" }}>
        <div
          {...{
            className: classNames("main margin-bottom-big", {
              full: infoHidden
            })
          }}
        >
          <div {...{ className: "question-row" }}>
            <h2 {...{ className: "question-text" }}>{question.text}</h2>
            <div {...{ className: "flex-centered" }}>
              <p {...{ className: "margin-right-small" }}>{texts.QUESTION}</p>
              <Input
                {...{
                  key: questionNumber,
                  defaultValue: questionNumber,
                  className: "input margin-bottom margin-right-small",
                  onKeyPress: e => {
                    const newQuestionNumber = Number(e.target.value);

                    if (e.key === "Enter") {
                      const newValue = isNaN(newQuestionNumber)
                        ? questionNumber
                        : newQuestionNumber < 1
                        ? 1
                        : newQuestionNumber > count
                        ? count
                        : newQuestionNumber;

                      e.target.value = newValue;

                      history.push(`/tests/${testName}/${newValue}`);
                    }
                  }
                }}
              />
              <p {...{ className: "margin-right" }}>{`/ ${count}`}</p>
              <DropDown
                {...{
                  label: texts.MENU,
                  outlined: true,
                  className: "margin-bottom menu",
                  items: [
                    {
                      label: infoHidden ? texts.SHOW_INFO : texts.HIDE_INFO,
                      onClick: () => setInfoHidden(!infoHidden)
                    },
                    {
                      label: statisticsHidden
                        ? texts.SHOW_STATISTICS
                        : texts.HIDE_STATISTICS,
                      onClick: () => setStatisticsHidden(!statisticsHidden)
                    },
                    { label: texts.RESET_TIMER, onClick: resetTimer },
                    {
                      label: texts.DELETE_STATISTICS,
                      onClick: resetStatistics
                    }
                  ]
                }}
              />
            </div>
          </div>
          <div {...{ className: "flex-col-centered width-full" }}>
            {map(question.answers, ({ text, chosen, correct }, key) => (
              <Card
                {...{
                  key,
                  className: classNames("card", {
                    correct: evaluated && correct,
                    incorrect: evaluated && chosen && !correct,
                    chosen: !evaluated && chosen,
                    evaluated
                  }),
                  onClick: () => !evaluated && clickAnswer(text),
                  content: (
                    <CardContent {...{ className: "card-content" }}>
                      <div {...{ className: "flex-row-centered" }}>
                        <h3 {...{ className: "margin-none" }}>{text}</h3>
                      </div>
                    </CardContent>
                  )
                }}
              />
            ))}
          </div>
          <div {...{ className: "button-row" }}>
            {map(
              [
                {
                  label: texts.PREV,
                  onClick: () =>
                    history.push(
                      `/tests/${testName}/${
                        questionNumber <= 1 ? count : questionNumber - 1
                      }`
                    ),
                  outlined: true,
                  show: true
                },
                {
                  label: texts.EVALUATE,
                  color: "primary",
                  onClick: () => evaluate(),
                  raised: true,
                  show: !evaluated
                },
                {
                  label: texts.NEXT,
                  onClick: () =>
                    history.push(
                      `/tests/${testName}/${
                        questionNumber >= count ? 1 : questionNumber + 1
                      }`
                    ),
                  outlined: !evaluated,
                  raised: evaluated,
                  show: true
                }
              ],
              ({ show, ...button }, key) =>
                show && (
                  <Button
                    {...{
                      key,
                      className: "button",
                      ...button
                    }}
                  />
                )
            )}
          </div>
        </div>
        {!infoHidden && (
          <div {...{ className: "info margin-bottom-big" }}>
            <div {...{ className: "flex-centered margin-bottom" }}>
              <h1 {...{ className: "margin-none" }}>
                <strong {...{ id: "timer" }} />
              </h1>
            </div>
            <div {...{ className: "margin-bottom correct" }}>
              <div {...{ className: "flex-centered" }}>
                <h3 {...{ className: "margin-right-small-only" }}>
                  {texts.CORRECT}:
                </h3>
                <h3 {...{ className: "margin-none" }}>
                  <strong>{`${
                    correctlyAnswered.length
                  } / ${count} (${correctAnswersPercent}%)`}</strong>
                </h3>
              </div>
              <LinearProgress
                {...{
                  variant: "determinate",
                  value: correctAnswersPercent,
                  style: { marginTop: "0.25em", height: "0.5em" }
                }}
              />
            </div>
            {question.description && (
              <div {...{ className: "flex-centered description" }}>
                <p {...{ className: "margin-right-small" }}>
                  {texts.DESCRIPTION}:
                </p>
                <p>
                  <strong>{question.description}</strong>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      {!isEmpty(wronglyAnswered) && !statisticsHidden && (
        <div {...{ className: "width-full" }}>
          <h4 {...{ className: "margin-bottom-small-only" }}>
            {texts.WRONGLY_ANSWERED_QUESTIONS}:
          </h4>
          <div {...{ className: "flex-row flex-wrap width-full" }}>
            {map(wronglyAnswered, (label, key) => (
              <Button
                {...{
                  key,
                  label,
                  outlined: true,
                  className: "margin-right margin-bottom"
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  ) : (
    <div {...{ className: "flex-centered" }}>
      <h1>{texts.QUESTION_NOT_FOUND}</h1>
    </div>
  );

export const sampleTest = {
  name: "PA181",
  count: 2,
  questions: [
    {
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
    },
    {
      text: "Second question",
      answers: [
        { text: "Nothing", correct: true },
        { text: "Something", correct: true },
        { text: "Anything", correct: true }
      ]
    }
  ]
};

export default compose(
  withRouter,
  withState("evaluated", "setEvaluated", false),
  withState("statisticsHidden", "setStatisticsHidden", false),
  withState("infoHidden", "setInfoHidden", false),
  withState("timerStartTime", "setTimerStartTime", null),
  withState("intervalId", "setIntervalId", false),
  withState("chosenAnswers", "setChosenAnswers", []),
  withState("correctlyAnswered", "setCorrectlyAnswered", []),
  withState("wronglyAnswered", "setWronglyAnswered", []),
  withState("test", "setTest", null),
  withProps(({ match }) => ({
    testName: match.params.test,
    questionNumber: Number(match.params.question)
  })),
  withProps(({ test, questionNumber }) => ({
    question: get(test, `questions[${questionNumber - 1}]`),
    count: get(test, "count", 0)
  })),
  withProps(({ question, chosenAnswers, correctlyAnswered, count }) => ({
    question: question
      ? {
          ...question,
          answers: map(question.answers, answer => ({
            ...answer,
            chosen: find(chosenAnswers, chosen => chosen === answer.text)
          }))
        }
      : null,
    correctAnswersPercent:
      Math.round((correctlyAnswered.length / count) * 100 * 10) / 10
  })),
  withHandlers({
    updateTest: ({ test, setTest }) => patch => setTest({ ...test, ...patch }),
    addWronglyAnswered: ({
      wronglyAnswered,
      setWronglyAnswered
    }) => questionNumber =>
      setWronglyAnswered(
        find(wronglyAnswered, w => w === questionNumber)
          ? wronglyAnswered
          : sortBy([...wronglyAnswered, questionNumber])
      ),
    removeWronglyAnswered: ({
      wronglyAnswered,
      setWronglyAnswered
    }) => questionNumber =>
      setWronglyAnswered(filter(wronglyAnswered, w => w !== questionNumber)),
    addCorrectlyAnswered: ({
      correctlyAnswered,
      setCorrectlyAnswered
    }) => questionNumber =>
      setCorrectlyAnswered(
        find(correctlyAnswered, c => c === questionNumber)
          ? correctlyAnswered
          : sortBy([...correctlyAnswered, questionNumber])
      ),
    removeCorrectlyAnswered: ({
      correctlyAnswered,
      setCorrectlyAnswered
    }) => questionNumber =>
      setCorrectlyAnswered(
        filter(correctlyAnswered, c => c !== questionNumber)
      ),
    updateTimer: ({ timerStartTime }) => () => {
      const timer = document.getElementById("timer");

      if (timer) {
        timer.innerHTML = millisecondsToString(Date.now() - timerStartTime);
      }
    }
  }),
  withHandlers({
    clickAnswer: ({ chosenAnswers, setChosenAnswers }) => text =>
      setChosenAnswers(
        find(chosenAnswers, answer => answer === text)
          ? filter(chosenAnswers, answer => answer !== text)
          : [...chosenAnswers, text]
      ),
    evaluate: ({
      setEvaluated,
      chosenAnswers,
      question,
      questionNumber,
      addWronglyAnswered,
      removeWronglyAnswered,
      addCorrectlyAnswered,
      removeCorrectlyAnswered
    }) => () => {
      setEvaluated(true);

      if (
        find(
          question.answers,
          ({ correct, text }) =>
            (correct && !find(chosenAnswers, chosen => chosen === text)) ||
            (!correct && find(chosenAnswers, chosen => chosen === text))
        )
      ) {
        addWronglyAnswered(questionNumber);
        removeCorrectlyAnswered(questionNumber);
      } else {
        removeWronglyAnswered(questionNumber);
        addCorrectlyAnswered(questionNumber);
      }
    },
    resetStatistics: ({
      setWronglyAnswered,
      setCorrectlyAnswered,
      setChosenAnswers,
      setEvaluated
    }) => () => {
      setWronglyAnswered([]);
      setCorrectlyAnswered([]);
      setChosenAnswers([]);
      setEvaluated(false);
    },
    resetTimer: ({
      setTimerStartTime,
      intervalId,
      setIntervalId,
      updateTimer
    }) => () => {
      clearInterval(intervalId);
      setTimerStartTime(Date.now());
      setIntervalId(setInterval(updateTimer, 30));
    }
  }),
  lifecycle({
    componentWillMount() {
      const { setTest } = this.props;

      setTest(sampleTest);
    },
    componentDidMount() {
      const { setIntervalId, updateTimer, setTimerStartTime } = this.props;

      setTimerStartTime(Date.now());
      setIntervalId(setInterval(updateTimer, 30));
    },
    componentWillReceiveProps({ questionNumber }) {
      const {
        questionNumber: oldQuestionNumber,
        setEvaluated,
        setChosenAnswers
      } = this.props;

      if (questionNumber !== oldQuestionNumber) {
        setEvaluated(false);
        setChosenAnswers([]);
      }
    },
    componentWillUnmount() {
      const { intervalId } = this.props;

      clearInterval(intervalId);
    }
  })
)(Question);
