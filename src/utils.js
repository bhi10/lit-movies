import * as app from "./redux/app";
import store from "./redux/store";

export const getApiUrl = (string, page) => {
  return "".concat(
    app.selectors.apiBaseUrl(store.getState()),
    string,
    "?api_key=",
    app.selectors.apiKey(store.getState()),
    "&page=",
    page
  );
}