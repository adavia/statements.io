import authAPI from '../api/auth';

export const AUTH_REQUEST = 'AUTH_REQUEST';                                        
export const AUTH_SUCCESS = 'AUTH_SUCCESS'; 
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

const initialState = {
  currentUser: {},
  authenticated: false
}

export default function reducer(state = initialState, action) {   
  switch (action.type) {
    case AUTH_SUCCESS: {
      return {
        ...state,
        currentUser: action.payload,
        authenticated: true
      };
    }
    default:
      return state;
  }
}

export function authenticate() {                                  
  return async (dispatch) => {
    dispatch(authResponse(AUTH_REQUEST));    
    try {
      const response = await authAPI.authenticate();
      dispatch(authResponse(AUTH_SUCCESS, response.data));
      return response;
    } catch ({ response }) {
      dispatch(authResponse(AUTH_FAILURE, response.data.error));
      return response;
    }
  }
}

export function login(values) {                                  
  return async (dispatch) => {
    dispatch(authResponse(AUTH_REQUEST));    
    try {
      const response = await authAPI.login(values);
      dispatch(authResponse(AUTH_SUCCESS, response.data));
      return response;
    } catch ({ response }) {
      dispatch(authResponse(AUTH_FAILURE, response.data.error));
      return response;
    }
  }
}

export function logout() {                                  
  return async (dispatch) => {    
    try {
      const response = await authAPI.logout();
      dispatch(authResponse(LOGOUT_SUCCESS));
      return response;
    } catch ({ response }) {
      dispatch(authResponse(AUTH_FAILURE, response.data.error));
      return response;
    }
  }
}

function authResponse(type, payload = {}, meta = {}) {
  return {
    type,
    payload,
    meta
  }
}