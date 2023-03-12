import { call, fork, put, select, takeEvery } from "redux-saga/effects";
import api from "../api.js";
import * as router from "../router";
import { getApiUrl } from "../utils.js";
import * as actions from "./actions.js";

function* _onMoviesFetch({ request }) {
  try {
    let res = yield call(_fetch, request);

    let { replace } = request;

    yield put({
      type: actions.MOVIES_FETCHED,
      response: { list: res, replace: replace },
    });
  } catch (err) {
    console.error(`_onMoviesFetch: failed. error`, err);
  }
}

function* _fetch(request) {
  const state = yield select();
  let url = getApiUrl(request, state);
  let response = yield call(api, url);
  return response;
}

function* _onMovieDetailFetch({ request }) {
  try {
    let res = yield call(_fetch, request);
    yield put({
      type: actions.MOVIE_DETAIL_FETCHED,
      response: { detail: res },
    });
  } catch (err) {
    console.error(`_onMovieDetailFetch: failed. error`, err);
  }
}

function* _onMovieCreditFetch({ request }) {
  try {
    let res = yield call(_fetch, request);
    yield put({
      type: actions.MOVIE_CREDIT_FETCHED,
      response: { detail: res },
    });
  } catch (err) {
    console.error(`_onMovieDetailFetch: failed. error`, err);
  }
}

function* init() {
  yield takeEvery(actions.MOVIES_FETCH, _onMoviesFetch);
  yield takeEvery(actions.MOVIE_DETAIL_FETCH, _onMovieDetailFetch);
  yield takeEvery(actions.MOVIE_CREDIT_FETCH, _onMovieCreditFetch);
}

function* onRouteChanged() {
  try {
    let state = yield select();
    let pageName = router.selectors.currentPage(state);

    if (pageName === "movies") {
      yield fork(init);
      return;
    }
  } catch (err) {
    console.error(`onRouteChanged: failed. error=`, err);
  }
}

export default function* () {
  yield fork(onRouteChanged);
  yield takeEvery(router.ROUTE_CHANGED, onRouteChanged);
}
