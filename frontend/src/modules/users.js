import userAPI from '../api/user';
import { normalize } from 'normalizr';
import userSchema from '../schemas/user';   

import { FETCH_STATEMENTS_SUCCESS } from './statements'; 

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';               
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';               
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';  

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';               
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';               
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';          

const initialState = {
  items: [],
}

export default function reducer(state = initialState, action) {   
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
    case FETCH_STATEMENTS_SUCCESS: {
      const { entities } = action.payload;

      if (entities && entities.users) {                   
        return {
          ...state,
          items: entities.users,
        };
      }
      return state;
    }
    case CREATE_USER_SUCCESS:
      const { payload } = action;

      const newUser = {
        ...state.items,
        [payload._id]: payload,
      };

      return {
        ...state,
        items: newUser,
      };
    default:
      return state;
  }
}

export function fetchUsers(socket) {
	return (dispatch) => {
    dispatch(userResponse(FETCH_USERS_REQUEST));
    socket.on('loadCategoryData', (data) => {
      const normalizedData = normalize(data.users, [userSchema]);
      dispatch(userResponse(FETCH_USERS_SUCCESS, normalizedData));
    });
    socket.on('addNewUser', (users) => {
      const normalizedData = normalize(users, [userSchema]);
      dispatch(userResponse(FETCH_USERS_SUCCESS, normalizedData));
    });
    socket.on('removeUser', (users) => {
      const normalizedData = normalize(users, [userSchema]);
      dispatch(userResponse(FETCH_USERS_SUCCESS, normalizedData));
    });
	}	
}

export function createUser(values) {
  return async (dispatch) => {
    dispatch(userResponse(CREATE_USER_REQUEST));  
    try {
      const response = await userAPI.create(values);
      dispatch(userResponse(CREATE_USER_SUCCESS, response.data));
      return response;
    } catch ({ response }) {
      dispatch(userResponse(CREATE_USER_FAILURE, response.data.error));
      return response;
    }
  }
}

function userResponse(type, payload = {}, meta = {}) {
  return {
    type,
    payload,
    meta
  }
}

// SELECTORS

export const fetchUsersSelector = state => {                                    
  return Object.keys(state.users.items).map(id => {  
    const user = state.users.items[id];              
    return user;                                     
  });                                                                    
}; 
