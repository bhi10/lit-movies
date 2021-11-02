export const currentPage = (state) => {
  return state.router.page.name;
}

export const currentModule = (state) => {
  return state.router.page.module;
}