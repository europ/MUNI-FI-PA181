import React from "react";

const About = ({ texts }) => (
  <div {...{ className: "flex-col-centered width-full" }}>
    <h1>{texts.ABOUT}</h1>
    <div {...{ className: "flex-col-centered width-full" }}>
      <h3
        {...{
          className: "margin-bottom-small-only normal text-center width-full"
        }}
      >
        {texts.TITLE}:
      </h3>
      <h3 {...{ className: "margin-bottom-only text-center width-full" }}>
        {texts.APP_NAME_FULL_NAME}
      </h3>
    </div>
    <div {...{ className: "flex-col-centered width-full" }}>
      <h3
        {...{
          className: "margin-bottom-small-only normal text-center width-full"
        }}
      >
        {texts.AUTHORS}:
      </h3>
      <h3 {...{ className: "margin-bottom-only text-center width-full" }}>
        Adrián Tóth, Tadeáš Pavlík, Jiří Čechák, Václav Stehlík, Jan Ondruch
      </h3>
    </div>
    <div {...{ className: "flex-col-centered width-full" }}>
      <h3
        {...{
          className: "margin-bottom-small-only normal text-center width-full"
        }}
      >
        {texts.DESCRIPTION}:
      </h3>
      <h3 {...{ className: "margin-bottom-only text-center width-full" }}>
        {texts.APP_DESCRIPTION}
      </h3>
    </div>
    <div {...{ className: "flex-col-centered width-full" }}>
      <h3
        {...{
          className: "margin-bottom-small-only normal text-center width-full"
        }}
      >
        {texts.SOURCE}:
      </h3>
      <h3 {...{ className: "margin-bottom-only text-center width-full" }}>
        <a href="https://github.com/europ/MUNI-FI-PA181">
          https://github.com/europ/MUNI-FI-PA181
        </a>
      </h3>
    </div>
    <div {...{ className: "flex-col-centered width-full" }}>
      <h3
        {...{
          className: "margin-bottom-small-only normal text-center width-full"
        }}
      >
        {texts.LICENSE}:
      </h3>
      <h3 {...{ className: "margin-bottom-only text-center width-full" }}>
        <a href="https://github.com/europ/MUNI-FI-PA181/blob/master/LICENSE">
          https://github.com/europ/MUNI-FI-PA181/blob/master/LICENSE
        </a>
      </h3>
    </div>
  </div>
);

export default About;
