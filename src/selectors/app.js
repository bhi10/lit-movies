import { createSelector } from "reselect";
import store from "../redux/store";

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
  return state.layout;
}

export const layout = createSelector(
  getLayout,
  (layout) => {
    return{
      layout
    }
  }
)

export const currentTheme = (state) => {
  return state.theme;
}

export const theme = createSelector(
  currentTheme,
  (changeTheme) => {
    return{
      changeTheme
    }
  }
);

export const drawerStatus = (state) => {
  return state.drawerOpened;
}

export const isDrawerStatus = createSelector(
  drawerStatus,
  (drawerStatus) => {
    return{
      drawerStatus
    }
  }
);

export const activePage = (state) => {
  return state.page;
}

export const getActivePage = createSelector(
  activePage,
  (page) => {
    return{
      page
    }
  }
)