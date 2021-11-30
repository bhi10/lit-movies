import { CHANGE_THEME, CHANGE_LANGUAGE } from "./actions";

export const LAYOUT_CHANGE_MEDIA_QUERY = "only screen and (max-width: 480px)";
//get initial layout
let media = window.matchMedia(LAYOUT_CHANGE_MEDIA_QUERY);
let layout = media.matches ? 'mobile' : 'desktop';

const appConfig = window.process.env;

const INITIAL_STATE = {
  config: getConfig(appConfig),
  theme: 'light',
  drawerOpened: layout === "mobile" ? false : true,
  layout: layout,
  language: 'en',
};

function getConfig(config) {

  let defaultConfig = getDefaultConfig(config);
  return {
    ...defaultConfig
  };
}

function getDefaultConfig(config) {
  return {
    apiBaseUrl: `https://api.${config.baseDomain}`,
    apiKey: config.apiKey,
    apiImageUrl: config.apiImageUrl
  }
}

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return { ...state, theme: action.value }
    case "drawerStatusChange":
      return { ...state, drawerOpened: action.drawerOpened }
    case "layoutChange":
      return { ...state, layout: action.value.layout, drawerOpened: action.value.drawerOpened }
    case CHANGE_LANGUAGE:
      return { ...state, language: action.value }
  }
  return state;
}

function saveLocal(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}