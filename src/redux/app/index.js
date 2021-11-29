export const LAYOUT_CHANGE_MEDIA_QUERY = "only screen and (max-width: 480px)";

import { default as reducer } from './reducer';
import { store, sagaMiddleware } from '../store';

import * as _selectors from './selectors';
import * as _actions from './actions';

import saga from './saga';

store.addReducers({
  app: reducer
});

sagaMiddleware.run(saga);

let media = window.matchMedia(LAYOUT_CHANGE_MEDIA_QUERY);

media.addListener(() => {
  let layout = media.matches ? "mobile" : "desktop";

  if (store.getState().layout !== layout) {
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
export const actions = _actions;