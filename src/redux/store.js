import { createStore, compose, combineReducers } from "redux";
import router from "@dreamworld/router/reducer";

import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js';

const devCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  state => state,
  devCompose(
    lazyReducerEnhancer(combineReducers),
  )
);

export default store;