import React from "react";

const NotFound = ({ texts, history }) => (
  <div {...{ className: "not-found" }}>
    <h1 {...{ className: "color-red width-full text-center" }}>404</h1>
    <h2 {...{ className: "color-red width-full text-center" }}>
      {texts.PAGE_NOT_FOUND}
    </h2>
    <p {...{ className: "width-full text-center" }}>
      {texts.BACK_TO}{" "}
      <strong {...{ className: "link", onClick: () => history.push("/") }}>
        {texts.MAIN_PAGE}
      </strong>
    </p>
  </div>
);

export default NotFound;
