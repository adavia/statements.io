import categoryAPI from '../api/category';      
import { normalize } from 'normalizr';
import categorySchema from '../schemas/category';
import merge from 'lodash/merge';

import { fetchMessages, cleanMessages } from './messages';
import { fetchUsers } from './users';

import { FETCH_STATEMENTS_SUCCESS } from './statements';

export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';               
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';               
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

export const SELECT_CATEGORY_REQUEST = 'SELECT_CATEGORY_REQUEST';               
export const SELECT_CATEGORY_SUCCESS = 'SELECT_CATEGORY_SUCCESS';               
export const SELECT_CATEGORY_FAILURE = 'SELECT_CATEGORY_FAILURE'; 

const initialState = {
  items: [],
  selectedItem: null
}

export default function reducer(state = initialState, action) {   
  switch (action.type) {
    case FETCH_STATEMENTS_SUCCESS:
    case FETCH_CATEGORIES_SUCCESS: {
      const { entities } = action.payload;

      if (entities && entities.categories) {   
        const categories = merge({}, state.items, entities.categories);   
                
        return {
          ...state,
          items: categories,
        };
      }
      return state;
    }
    case SELECT_CATEGORY_SUCCESS: {         
      const { result, entities } = action.payload;
      
      if (result) {  
        const categories = merge({}, state.items, entities.categories);

        return {
          ...state,
          items: categories,
          selectedItem: result,
        };
      }
      return state;
    }
    default:
      return state;
  }
}

export function fetchCategories() {                                  
  return async (dispatch) => {
    dispatch(categoryResponse(FETCH_CATEGORIES_REQUEST));    
    try {
      const response = await categoryAPI.fetch();
      const normalizedData = normalize(response.data, [categorySchema]);
      dispatch(categoryResponse(FETCH_CATEGORIES_SUCCESS, normalizedData));
    } catch ({ response }) {
      dispatch(categoryResponse(FETCH_CATEGORIES_FAILURE, response.data.error));
    }
  }
}

export function fetchUsersAndMessages(socket, id) {
  return dispatch => {
    socket.on('connect', () => {
      socket.emit('join', id);
      Promise.all([
        dispatch(fetchUsers(socket)),
        dispatch(fetchMessages(socket))
      ]);
    });
  }
}

export function unloadCategory(socket, id) {
  return (dispatch) => {
    socket.emit('leave', id);
    socket.on('connect', () => {
      socket.on('disconnect', () => {});
    });
    dispatch(cleanMessages());
  }
}

function categoryResponse(type, payload = {}, meta = {}) {
  return {
    type,
    payload,
    meta
  }
}

// SELECTORS

export const fetchCategoriesSelector = state => {                                    
  return Object.keys(state.categories.items).map(id => {  
    const category = state.categories.items[id];              
    return category;                                     
  });                                                                    
}; 

export const getCategorySelector = state => {
  const { items, selectedItem } = state.categories;
  
  if (!selectedItem) {
    return {};
  }

  return items[selectedItem];                
};
