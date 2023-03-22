import {
  SHOW_CREDIT_FETCH,
  SHOW_CREDIT_FETCHED,
  SHOW_DETAIL_FETCH,
  SHOW_DETAIL_FETCHED,
  SHOW_FETCH,
  SHOW_FETCHED,
  SHOW_IMAGE_FETCH,
  SHOW_IMAGE_FETCHED,
} from "./actions";

const INITIAL_STATE = {
  fetching: false,
  list: [],
  detail: [],
  credits: [],
  images: [],
};

export default (state = INITIAL_STATE, action) => {
  let oState = { ...state };

  switch (action.type) {
    case SHOW_FETCH:
      return { ...oState, fetching: true };

    case SHOW_FETCHED: {
      const { list, replace } = action.response;
      if (replace) {
        delete oState.list;
        return { ...oState, list: list.results };
      }
      return { ...oState, list: [...oState.list, ...list.results] };
    }

    case SHOW_DETAIL_FETCH:
      return { ...oState, fetching: true };

    case SHOW_DETAIL_FETCHED: {
      const { detail } = action.response;
      return { ...oState, detail: [...oState.detail, { ...detail }] };
    }

    case SHOW_CREDIT_FETCH:
      return { ...oState, fetching: true };

    case SHOW_CREDIT_FETCHED: {
      const { detail } = action.response;
      return { ...oState, credits: [...oState.credits, { ...detail }] };
    }

    case SHOW_IMAGE_FETCH: {
      return { ...oState, fetching: true };
    }

    case SHOW_IMAGE_FETCHED: {
      const { detail } = action.response;
      return { ...oState, images: [...oState.images, { ...detail }] };
    }

    default:
      return oState;
  }
};
