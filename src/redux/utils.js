import * as appSelectors from "./app/selectors";

/**
 *
 * @param {Object} param0
 * @returns {String}
 */
export const getApiUrl = (
  { subPage = `/movie/popular`, pageNumber, query },
  state
) => {
  const apiKey = appSelectors.apiKey(state);

  let url = `${subPage}?api_key=${apiKey}`;

  if (pageNumber) {
    url += `&page=${pageNumber}`;
  }

  if (query) {
    url += `&query=${query}`;
  }

  return url;
};
