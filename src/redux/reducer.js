const initialState = {
  userListings: [],
  user_id: 0,

  make: '',
  model: '',
  year: 0,
  mileage: 0,
  img: '',
  description: '',
  price: 0
}

const MAKE_INFO = 'MAKE_INFO';
const USER_ID = 'USER_ID';
const INITIALIZE_USER = 'INITIALIZE_USER';

export default function reducer(state = initialState, action) {
  let { type, payload } = action;
  switch(type) {
    case MAKE_INFO:
     return { ...state, ...payload};
    case INITIALIZE_USER:
      console.log(payload);
      console.log(state);
      return { ...state, ...payload};
    default:
      return state;
  }
}

export function updateMake(make) {
  return {
    type: MAKE_INFO,
    payload: make
  }
}

export function initializeUser(user) {
  return {
     type: INITIALIZE_USER,
     payload: user
  }
  
}