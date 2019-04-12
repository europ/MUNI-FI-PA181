import React from "react";

const About = ({ texts }) => (
  <div {...{ className: "flex-col-centered" }}>
    <h1>{texts.ABOUT}</h1>
    <p {...{ className: "margin-none" }}>
      Adrián Tóth, Tadeáš Pavlík, Jiří Čechák, Václav Stehlík, Jan Ondruch
    </p>
  </div>
);

export default About;
