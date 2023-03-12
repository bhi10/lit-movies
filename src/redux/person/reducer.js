import {
  PERSON_CREDIT_FETCH,
  PERSON_CREDIT_FETCHED,
  PERSON_DETAIL_FETCH,
  PERSON_DETAIL_FETCHED,
  PERSON_FETCH,
  PERSON_FETCHED
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
    case PERSON_FETCH:
      return { ...oState, fetching: true };

    case PERSON_FETCHED: {
      const { list, replace } = action.response;

      if (replace) {
        delete oState.list;
        return { ...oState, list: list.results };
      }

      return { ...oState, list: [...oState.list, ...list.results] };
    }

    case PERSON_DETAIL_FETCH:
      return { ...oState, fetching: true };

    case PERSON_DETAIL_FETCHED: {
      const { detail } = action.response;
      return { ...oState, detail: [...oState.detail, { ...detail }] };
    }

    case PERSON_CREDIT_FETCH: {
      return { ...oState, fetching: true };
    }

    case PERSON_CREDIT_FETCHED: {
      const { detail } = action.response;
      return { ...oState, credits: [...oState.credits, { ...detail }] };
    }

    default:
      return oState;
  }
};
