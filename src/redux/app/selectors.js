import { createSelector } from "reselect";

export const getLayout = (state) => {
  return state.app.layout;
}

export const layout = createSelector(
  getLayout,
  (layout) => {
    return {
      layout
    }
  }
)

export const getCurrentTheme = (state) => {
  return state.app.theme;
}

export const theme = createSelector(
  getCurrentTheme,
  (changeTheme) => {
    return {
      changeTheme
    }
  }
);

export const getDrawerStatus = (state) => {
  return state.app.drawerOpened;
}

export const isDrawerStatus = createSelector(
  getDrawerStatus,
  (drawerStatus) => {
    return {
      drawerStatus
    }
  }
);

export const getActivePage = (state) => {
  return state.app.page;
}

export const activePage = createSelector(
  getActivePage,
  (page) => {
    return {
      page
    }
  }
);

export const getLanguage = (state) => {
  return state.app.language;
}

export const language = createSelector(
  getLanguage,
  (language) => {
    return {
      language
    }
  }
);

export const apiBaseUrl = (state) => {
  return state.app.config.apiBaseUrl
};

export const getApiBaseUrl = createSelector(
  apiBaseUrl,
  (url) => {
    return {
      url
    }
  }
);

export const apiKey = (state) => state.app.config.apiKey;

export const apiImageUrl = (state) => state.app.config.apiImageUrl;