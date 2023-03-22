export const SHOW_FETCH = `SHOW_FETCH`;

export const SHOW_FETCHED = `SHOW_FETCHED`;

export const SHOW_DETAIL_FETCH = `SHOW_DETAIL_FETCH`;

export const SHOW_DETAIL_FETCHED = `SHOW_DETAIL_FETCHED`;

export const SHOW_CREDIT_FETCH = `SHOW_CREDIT_FETCH`;

export const SHOW_CREDIT_FETCHED = `SHOW_CREDIT_FETCHED`;

export const SHOW_IMAGE_FETCH = `SHOW_IMAGE_FETCH`;

export const SHOW_IMAGE_FETCHED = `SHOW_IMAGE_FETCHED`;

export const fetch = (request) => {
  return {
    type: SHOW_FETCH,
    request,
  };
};

export const fetchMovieDetail = (request) => {
  return {
    type: SHOW_DETAIL_FETCH,
    request,
  };
};

export const fetchMovieCredits = (request) => {
  return {
    type: SHOW_CREDIT_FETCH,
    request,
  };
};

export const fetchMovieImages = (request) => {
  return {
    type: SHOW_IMAGE_FETCH,
    request,
  };
};
