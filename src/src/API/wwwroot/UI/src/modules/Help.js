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

const Help = ({ texts }) => (
  <div {...{ className: "flex-col-centered width-full" }}>
    <h1>{texts.HELP}</h1>
    <h4 {...{ className: "margin-bottom-small-only" }}>
      {texts.TEST_JSON_STRUCTURE}
    </h4>
    <div {...{ className: "flex-row-centered flex-wrap" }}>
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
              text: texts.ANSWERS,
              content: (
                <ul>
                  <li>
                    <strong>text</strong> - {texts.ANSWER}
                  </li>
                  <li>
                    <strong>isCorrect</strong> -{" "}
                    <span {...{ className: "code" }}>true</span> (
                    {texts.CORRECT}) /{" "}
                    <span {...{ className: "code" }}>false</span> (
                    {texts.INCORRECT})
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
  </div>
);

export default Help;
