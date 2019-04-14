import React from "react";

const Home = ({ texts }) => (
  <div>
    <h1>{texts.WELCOME_TO_APP_NAME}</h1>
    <p>{texts.APP_DESCRIPTION}</p>
  </div>
);

export default Home;
