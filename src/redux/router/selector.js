import get from "lodash-es/get";

export const currentPage = (state) => {
  return state.router.page.name;
}

export const currentModule = (state) => {
  return state.router.page.module;
}

export const currentId = (state) => get(state, 'router.page.params.id');

export const currentPageNumber = (state) => get(state, 'router.page.params.page', 1);

export const currentQueryString = (state) => get(state, 'router.page.params.query');