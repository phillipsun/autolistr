export const initialState = {
  id: 0,
  email: "",
  name: "",
  make: "",
  model: "",
  year: 0,
  mileage: 0,
  img: "",
  description: "",
  price: 0,
  listings: [],
  userListings: [],
  vin: ""
};

const SET_LISTING_INFO = "SET_LISTING_INFO";
const INITIALIZE_USER = "INITIALIZE_USER";
const CLEAR_INFO = "CLEAR_INFO";
const FETCH_ALL = "FETCH_ALL";
const INITIALIZE_USER_LISTINGS = "INITIALIZE_USER_LISTINGS";
const UPDATE_USER_LISTINGS = "UPDATE_USER_LISTINGS";
const LOGOUT = "LOGOUT";
const DELETE_LISTING = "DELETE_LISTING";
const UPDATE_LISTING = "UPDATE_LISTING";

// Reducer
export default function reducer(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case INITIALIZE_USER:
      return { ...state, ...payload };
    case SET_LISTING_INFO:
      return { ...state, ...payload };
    case CLEAR_INFO:
      return payload;
    case FETCH_ALL:
      return { ...state, listings: payload };
    case INITIALIZE_USER_LISTINGS:
      return { ...state, userListings: payload };
    case UPDATE_USER_LISTINGS:
      return { ...state, userListings: payload };
    case LOGOUT:
      return initialState;
    case DELETE_LISTING:
      return {
        ...state,
        userListings: state.userListings.filter(e => e.id !== payload)
      };
    case UPDATE_LISTING:
      return { ...state, ...payload };
    default:
      return state;
  }
}

// Action Creators
export function setListingInfo(listingInfo) {
  return {
    type: SET_LISTING_INFO,
    payload: listingInfo
  };
}

export function initializeUser(user) {
  return {
    type: INITIALIZE_USER,
    payload: user
  };
}

export function clear() {
  return {
    type: CLEAR_INFO,
    payload: initialState
  };
}

export function fetchAllListings(listings) {
  return {
    type: FETCH_ALL,
    payload: listings
  };
}

export function initializeUserListings(listings) {
  return {
    type: INITIALIZE_USER_LISTINGS,
    payload: listings
  };
}

export function updateUserListings(listings) {
  return {
    type: UPDATE_USER_LISTINGS,
    payload: listings
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}

export function deleteListing(listingId) {
  return {
    type: DELETE_LISTING,
    payload: listingId
  };
}

export function updateListing(listing) {
  return {
    type: UPDATE_LISTING,
    payload: listing
  };
}
