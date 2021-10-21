import { createStore } from "redux";
import reducer from "./reducer";
import app from "./app";

import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js';

const devCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  devCompose(
    lazyReducerEnhancer(),
  )
);

export default store;