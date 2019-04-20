import React from "react";
import ReactCountryFlag from "react-country-flag";
import { languages } from "../enums";

const FlagIcon = ({ language, className, onClick, ...props }) => (
  <div {...{ className: `flag-icon ${className}`, onClick }}>
    <ReactCountryFlag
      {...{
        svg: true,
        code: language === languages.EN ? "GB" : language,
        ...props
      }}
    />
  </div>
);

export default FlagIcon;
