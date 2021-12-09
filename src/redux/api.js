import { store } from "./store";
import * as app from "./app";

import { getLanguage } from "./app/selectors";
import { currentQueryString } from "./router/selector";

export default async (string, page) => {

  let curLang = getLanguage(store.getState()) === "en" ? "en-US" : getLanguage(store.getState()) === "hi" ? "hi-IN" : "gu-IN";
  let search = currentQueryString(store.getState()) === undefined ? "" : "".concat("&query=", currentQueryString(store.getState()));

  let url = "".concat(
    app.selectors.apiBaseUrl(store.getState()),
    string,
    "?api_key=",
    app.selectors.apiKey(store.getState()),
    "&page=",
    page,
    "&language=",
    curLang,
    search
  );

  let res;
  try {
    res = await fetch(url);
  } catch (err) {
    throw { status: 0 }
  }

  let responseText;
  try {
    responseText = await res.text();
    responseText = responseText.trim();
  } catch (e) {
    console.error("Failed to retrieve responseText", e);
  }

  let responseJSON;
  try {
    responseJSON = JSON.parse(responseText);
  } catch (e) {
    //ignore
  }

  if (res.ok) {
    return getResponseObject(responseJSON, responseText, res.status)
  }

  return getResponseObject(responseJSON, responseText, res.status)
}

let getResponseObject = (json, text, status) => {
  if (json) {
    return { ...json, status }
  }

  throw {
    status: status,
    code: 'JSON_PARSE_FAILED',
    error: 'Failed to parse response as Json',
    text: text
  }
}