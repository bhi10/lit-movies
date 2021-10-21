import { LAYOUT_CHANGE_MEDIA_QUERY } from "../selectors/app";

//Constants
export const STR_TV_SHOWS = "TV Shows";
export const STR_MOVIES = "Movies";

let media = window.matchMedia(LAYOUT_CHANGE_MEDIA_QUERY);

let layout = media.matches ? 'mobile' : 'desktop';

const INITIAL_STATE = {
  theme: 'light',
  drawerOpened: layout === "mobile" ? false : true,
  page: STR_MOVIES,
  layout: layout,
};

export default function reducer(state = INITIAL_STATE, action){
  switch(action.type){
    case "themeChange":
      return{ ...state, theme: action.theme}
    case "drawerStatusChange":
      return{ ...state, drawerOpened: action.drawerOpened}
    case "pageChange":
      return{ ...state, page: action.value.page, drawerOpened: action.value.drawerOpened}
    case "layoutChange":
      return{ ...state, layout: action.value.layout, drawerOpened: action.value.drawerOpened}
  }
  return state;
}

function saveLocal(key, value){
  localStorage.setItem(key, JSON.stringify(data));
}