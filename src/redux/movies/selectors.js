import get from "lodash-es/get.js";

export const list = (state) => {
  return get(state, `movies.list`, []);
};

export const movieDetail = (state, id) => {
  const details = get(state, `movies.detail`);
  return details.find((element) => element.id === id);
};

export const movieCredit = (state, id) => {
  const credits = get(state, `movies.credits`);
  return credits.find((element) => element.id === id);
};
