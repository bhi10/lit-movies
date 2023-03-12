import {
  MOVIES_FETCH,
  MOVIES_FETCHED,
  MOVIE_CREDIT_FETCH,
  MOVIE_CREDIT_FETCHED,
  MOVIE_DETAIL_FETCH,
  MOVIE_DETAIL_FETCHED,
} from "./actions";

const INITIAL_STATE = {
  fetching: false,
  list: [],
  detail: [],
  credits: [],
};

export default (state = INITIAL_STATE, action) => {
  let oState = { ...state };

  switch (action.type) {
    case MOVIES_FETCH:
      return { ...oState, fetching: true };

    case MOVIES_FETCHED: {
      const { list, replace } = action.response;
      if (replace) {
        delete oState.list;
        return { ...oState, list: list.results };
      }
      return { ...oState, list: [...oState.list, ...list.results] };
    }

    case MOVIE_DETAIL_FETCH:
      return { ...oState, fetching: true };

    case MOVIE_DETAIL_FETCHED: {
      const { detail } = action.response;
      return { ...oState, detail: [...oState.detail, { ...detail }] };
    }

    case MOVIE_CREDIT_FETCH:
      return { ...oState, fetching: true };

    case MOVIE_CREDIT_FETCHED: {
      const { detail } = action.response;
      return { ...oState, credits: [...oState.credits, { ...detail }] };
    }

    default:
      return oState;
  }
};
