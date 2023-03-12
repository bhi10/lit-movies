import { call, fork, put, select, takeEvery } from "redux-saga/effects";
import api from "../api.js";
import * as router from "../router";
import { getApiUrl } from "../utils.js";
import * as actions from "./actions.js";

function* _onPersonFetch({ request }) {
  try {
    let res = yield call(_fetch, request);
    let { replace } = request;

    yield put({
      type: actions.PERSON_FETCHED,
      response: { list: res, replace: replace },
    });
  } catch (err) {
    console.error(`_onPersonFetch: failed. error`, err);
  }
}

function* _onPersonDetailFetch({ request }) {
  try {
    let res = yield call(_fetch, request);
    yield put({
      type: actions.PERSON_DETAIL_FETCHED,
      response: { detail: res },
    });
  } catch (err) {
    console.error(`_onPersonDetailFetch: failed. error`, err);
  }
}

function* _onPersonCreditFetch({ request }) {
  try {
    let res = yield call(_fetch, request);
    yield put({
      type: actions.PERSON_CREDIT_FETCHED,
      response: { detail: res },
    });
  } catch (err) {
    console.error(`_onPersonCreditFetch: failed. error`, err);
  }
}

function* _fetch(request) {
  const state = yield select();
  let url = getApiUrl(request, state);
  let response = yield call(api, url);
  return response;
}

function* init() {
  yield takeEvery(actions.PERSON_FETCH, _onPersonFetch);
  yield takeEvery(actions.PERSON_DETAIL_FETCH, _onPersonDetailFetch);
  yield takeEvery(actions.PERSON_CREDIT_FETCH, _onPersonCreditFetch);
}

function* onRouteChanged() {
  try {
    let state = yield select();
    let pageName = router.selectors.currentPage(state);

    if (pageName === "person") {
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
