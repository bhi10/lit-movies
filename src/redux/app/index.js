import { default as reducer } from './reducer';

import * as _selectors from './selectors';

import store from '../store';

store.addReducers({
  app: reducer
})

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

export const selectors = _selectors;