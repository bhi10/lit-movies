export const CHANGE_THEME = 'CHANGE_THEME';
export const CHANGE_THEME_DONE = 'CHANGE_THEME_DONE';
export const CHANGE_LAYOUT = 'CHANGE_LAYOUT';
export const CHANGE_SCROLL = 'CHANGE_SCROLL';

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

export const changeTheme = (value) => {
  return { type: CHANGE_THEME, value }
}

export const changeLayout = (value) => {
  return { type: CHANGE_LAYOUT, value }
}

export const changeLanguage = (value) => {
  return { type: CHANGE_LANGUAGE, value }
}

export const changeScroll = (value) => {
  return { type: CHANGE_SCROLL, value}
}
