import { LAYOUT_CHANGE_MEDIA_QUERY } from "./selectors";

//get initial layout
let media = window.matchMedia(LAYOUT_CHANGE_MEDIA_QUERY);
let layout = media.matches ? 'mobile' : 'desktop';

console.log('Initially ' + (window.navigator.onLine ? 'on' : 'off') + 'line');

const INITIAL_STATE = {
  theme: 'light',
  drawerOpened: layout === "mobile" ? false : true,
  layout: layout,
  language: 'en',
};

export default function reducer(state = INITIAL_STATE, action){
  switch(action.type){
    case "themeChange":
      return{ ...state, theme: action.theme}
    case "drawerStatusChange":
      return{ ...state, drawerOpened: action.drawerOpened}
    case "layoutChange":
      return{ ...state, layout: action.value.layout, drawerOpened: action.value.drawerOpened}
    case "languageChange":
      return{ ...state, language: action.language}
  }
  return state;
}

function saveLocal(key, data){
  localStorage.setItem(key, JSON.stringify(data));
}