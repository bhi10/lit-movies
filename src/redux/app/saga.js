import { fork, takeEvery, call } from 'redux-saga/effects';
import api from '../api';

function* getPuplarMovies(){
  yield call(api, "/movie/popular");
}

export default function* () {
  //yield fork(getPuplarMovies);
}