import get from "lodash-es/get.js";

export const list = (state) => {
  return get(state, `person.list`, []);
};

export const personDetail = (state, id) => {
  const details = get(state, `person.detail`);
  return details.find((element) => element.id === id);
};

export const personCredit = (state, id) => {
  const credits = get(state, `person.credits`);
  return credits.find((element) => element.id === id);
};
