import React from "react";

const template = [
  {
    text: "string",
    description: "string",
    afterSubmitFeedback: "string",
    answers: [
      {
        text: "string",
        isCorrect: true
      }
    ]
  }
];

const example = [
  {
    text: "2 - 2 = ?",
    description: "Subtraction",
    afterSubmitFeedback: "Easy or not?",
    answers: [
      {
        text: "0",
        isCorrect: true
      },
      {
        text: "2",
        isCorrect: false
      },
      {
        text: "4",
        isCorrect: false
      }
    ]
  },
  {
    text: "2 + 2 = ?",
    description: "Addition",
    afterSubmitFeedback: "So funny.",
    answers: [
      {
        text: "1",
        isCorrect: false
      },
      {
        text: "2",
        isCorrect: false
      },
      {
        text: "9",
        isCorrect: false
      },
      {
        text: "4",
        isCorrect: true
      }
    ]
  },
  {
    text: "2 * 2 = ?",
    description: "Multiplication",
    afterSubmitFeedback: "Difficult?",
    answers: [
      {
        text: "1",
        isCorrect: false
      },
      {
        text: "2",
        isCorrect: false
      },
      {
        text: "3",
        isCorrect: false
      },
      {
        text: "4",
        isCorrect: true
      }
    ]
  }
];

const Help = ({ texts }) => (
  <div {...{ className: "flex-col-centered width-full" }}>
    <h1>{texts.HELP}</h1>
    <h4 {...{ className: "margin-bottom-small-only" }}>
      {texts.TEST_JSON_STRUCTURE}
    </h4>
    <div {...{ className: "flex-row-centered flex-wrap margin-bottom" }}>
      <div {...{ className: "width-max-full" }}>
        <div
          {...{ className: "padding margin-small border-grey border-radius" }}
        >
          <div {...{ className: "scrollable" }}>
            <pre {...{ className: "code" }}>
              {JSON.stringify(template, null, 2)}
            </pre>
          </div>
        </div>
      </div>
      <div {...{ className: "padding margin-small" }}>
        <ul>
          {[
            { label: "text", text: texts.QUESTION },
            { label: "description", text: texts.DESCRIPTION },
            {
              label: "afterSubmitFeedback",
              text:
                texts.ADDITIONAL_INFORMATION_TO_BE_DISPLAYED_AFTER_THE_ANSWER_IS_EVALUATED
            },
            {
              label: "answers",
              text: (
                <span>
                  {`${texts.ANSWERS_DESCRIPTION} `}
                  <strong>isCorrect</strong>: true
                </span>
              ),
              content: (
                <ul>
                  <li>
                    <strong>text</strong> - {texts.ANSWER}
                  </li>
                  <li>
                    <strong>isCorrect</strong> - true ({texts.CORRECT}) / false
                    ({texts.INCORRECT})
                  </li>
                </ul>
              )
            }
          ].map(({ label, text, content }, key) => (
            <li {...{ key }}>
              <div>
                <strong>{label}</strong> - {text}
              </div>
              {content && <div>{content}</div>}
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div {...{ className: "border-top width-full padding-bottom-big" }} />
    <h4 {...{ className: "margin-bottom-small-only" }}>
      {texts.TEST_JSON_STRUCTURE_EXAMPLE}
    </h4>
    <div {...{ className: "flex-row-centered flex-wrap" }}>
      <div {...{ className: "width-max-full" }}>
        <div
          {...{ className: "padding margin-small border-grey border-radius" }}
        >
          <div {...{ className: "scrollable" }}>
            <pre {...{ className: "code" }}>
              {JSON.stringify(example, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Help;
