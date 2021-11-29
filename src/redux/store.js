import { createStore, compose, combineReducers, applyMiddleware } from "redux";

import createSagaMiddleware from "@redux-saga/core";

import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js';

export const sagaMiddleware = createSagaMiddleware();

const devCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  state => state,
  devCompose(
    lazyReducerEnhancer(combineReducers),
    applyMiddleware(sagaMiddleware)
  )
);