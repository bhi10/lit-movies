export const MOVIES_FETCH = `MOVIES_FETCH`;

export const MOVIES_FETCHED = `MOVIES_FETCHED`;

export const MOVIE_DETAIL_FETCH = `MOVIE_DETAIL_FETCH`;

export const MOVIE_DETAIL_FETCHED = `MOVIE_DETAIL_FETCHED`;

export const MOVIE_CREDIT_FETCH = `MOVIE_CREDIT_FETCH`;

export const MOVIE_CREDIT_FETCHED = `MOVIE_CREDIT_FETCHED`;

export const MOVIE_IMAGE_FETCH = `MOVIE_IMAGE_FETCH`;

export const MOVIE_IMAGE_FETCHED = `MOVIE_IMAGE_FETCHED`;

export const fetch = (request) => {
  return {
    type: MOVIES_FETCH,
    request,
  };
};

export const fetchMovieDetail = (request) => {
  return {
    type: MOVIE_DETAIL_FETCH,
    request,
  };
};

export const fetchMovieCredits = (request) => {
  return {
    type: MOVIE_CREDIT_FETCH,
    request,
  };
};

export const fetchMovieImages = (request) => {
  return {
    type: MOVIE_IMAGE_FETCH,
    request
  }
}