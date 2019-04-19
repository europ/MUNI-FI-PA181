import { languages, textsEnum } from "../enums";

export const requiredFunction = (value, language) =>
  value ? undefined : textsEnum[language].REQUIRED;

export const required = {
  [`${languages.CZ}`]: value => requiredFunction(value, languages.CZ),
  [`${languages.EN}`]: value => requiredFunction(value, languages.EN),
  [`${languages.SK}`]: value => requiredFunction(value, languages.SK)
};
