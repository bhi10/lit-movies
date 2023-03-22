export const PERSON_FETCH = `PERSON_FETCH`;

export const PERSON_FETCHED = `PERSON_FETCHED`;

export const PERSON_DETAIL_FETCH = `PERSON_DETAIL_FETCH`;

export const PERSON_DETAIL_FETCHED = `PERSON_DETAIL_FETCHED`;

export const PERSON_CREDIT_FETCH = `PERSON_CREDIT_FETCH`;

export const PERSON_CREDIT_FETCHED = `PERSON_CREDIT_FETCHED`;

export const PERSON_IMAGES_FETCH = `PERSON_IMAGES_FETCH`;

export const PERSON_IMAGES_FETCHED = `PERSON_IMAGES_FETCHED`;

export const fetch = (request) => {
  return {
    type: PERSON_FETCH,
    request,
  };
};

export const fetchDetail = (request) => {
  return {
    type: PERSON_DETAIL_FETCH,
    request,
  };
};

export const fetchCredit = (request) => {
  return {
    type: PERSON_CREDIT_FETCH,
    request,
  };
};

export const fetchImages = (request) => {
  return {
    type: PERSON_IMAGES_FETCH,
    request
  }
}