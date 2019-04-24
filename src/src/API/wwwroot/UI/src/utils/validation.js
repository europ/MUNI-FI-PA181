import { languages, textsEnum } from "../enums";
import { isJSON } from ".";

export const requiredFunction = (value, language) =>
  value ? undefined : textsEnum[language].REQUIRED;

export const required = {
  [`${languages.CZ}`]: value => requiredFunction(value, languages.CZ),
  [`${languages.EN}`]: value => requiredFunction(value, languages.EN),
  [`${languages.SK}`]: value => requiredFunction(value, languages.SK)
};

export const jsonFunction = (value, language) =>
  isJSON(value) ? undefined : textsEnum[language].ENTER_VALID_JSON;

export const json = {
  [`${languages.CZ}`]: value => jsonFunction(value, languages.CZ),
  [`${languages.EN}`]: value => jsonFunction(value, languages.EN),
  [`${languages.SK}`]: value => jsonFunction(value, languages.SK)
};
