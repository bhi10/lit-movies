import { createSelector } from "reselect";
import store from "../store";

export const LAYOUT_CHANGE_MEDIA_QUERY = "only screen and (max-width: 480px)";

let media = window.matchMedia(LAYOUT_CHANGE_MEDIA_QUERY);

media.addListener( () => {

  let layout = media.matches ? "mobile" : "desktop";

  if(store.getState().layout !== layout){
    store.dispatch({
      type: "layoutChange",
      value: {
        layout: layout,
        drawerOpened: layout === 'desktop'
      },
    })
  }
});

export const getLayout = (state) => {
  return state.app.layout;
}

export const layout = createSelector(
  getLayout,
  (layout) => {
    return{
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
    return{
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
    return{
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
    return{
      page
    }
  }
)