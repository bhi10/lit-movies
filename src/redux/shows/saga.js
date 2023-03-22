import { call, fork, put, select, takeEvery, cancel, take } from "redux-saga/effects";
import api from "../api.js";
import * as router from "../router";
import { getApiUrl } from "../utils.js";
import * as actions from "./actions.js";

function* _onMoviesFetch({ request }) {
  try {
    let res = yield call(_fetch, request);

    let { replace } = request;

    yield put({
      type: actions.SHOW_FETCHED,
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
      type: actions.SHOW_DETAIL_FETCHED,
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
      type: actions.SHOW_CREDIT_FETCHED,
      response: { detail: res },
    });
  } catch (err) {
    console.error(`_onMovieDetailFetch: failed. error`, err);
  }
}

function* _onMovieImageFetch({request})  {
  try {
    let res = yield call(_fetch, request);
    yield put({
      type: actions.SHOW_IMAGE_FETCHED,
      response: { detail: res },
    });
  }catch (err) {
    console.error(`_onMovieImageFetch: failed. error`, err);
  }
}

function* init() {
  yield takeEvery(actions.SHOW_FETCH, _onMoviesFetch);
  yield takeEvery(actions.SHOW_DETAIL_FETCH, _onMovieDetailFetch);
  yield takeEvery(actions.SHOW_CREDIT_FETCH, _onMovieCreditFetch);
  yield takeEvery(actions.SHOW_IMAGE_FETCH, _onMovieImageFetch)
}

let task;

function* onRouteChanged() {
  try {
    let state = yield select();
    let pageName = router.selectors.currentPage(state);

    if (pageName === "shows" && !task) {
      task = yield fork(init);
      return;
    }

    if (pageName !== "shows" && task) {
      yield cancel(task);
      task = null;
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
