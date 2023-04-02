import * as appSelectors from "./app/selectors";

/**
 *
 * @param {Object} param0
 * @returns {String}
 */
export const getApiUrl = (
  { subPage = `/movie/popular`, pageNumber, query, include_adult },
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

  if (include_adult) {
    url += `&include_adult=true`;
  }

  return url;
};
