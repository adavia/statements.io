import reviewAPI from '../api/review';
import merge from 'lodash/merge';

import { SELECT_STATEMENT_SUCCESS } from './statements'

export const CREATE_REVIEW_REQUEST = 'CREATE_REVIEW_REQUEST';               
export const CREATE_REVIEW_SUCCESS = 'CREATE_REVIEW_SUCCESS';               
export const CREATE_REVIEW_FAILURE = 'CREATE_REVIEW_FAILURE';          

const initialState = {
  items: [],
}

export default function reducer(state = initialState, action) {   
  switch (action.type) {
    case SELECT_STATEMENT_SUCCESS:            
      const { entities } = action.payload;
      if (entities && entities.reviews) {    
        const reviews = merge({}, state.items, entities.reviews);   
                
        return {
          ...state,
          items: reviews
        };
      }
      return state;
    case CREATE_REVIEW_SUCCESS:
      const { payload } = action;

      const newReview = {
        ...state.items,
        [payload._id]: payload,
      };
    
      return {
        ...state,
        items: newReview,
      };
    default:
      return state;
  }
}

export function createReview(id, values) {
  return async (dispatch) => {
    dispatch(reviewResponse(CREATE_REVIEW_REQUEST));  
    try {
      const response = await reviewAPI.create(id, values);
      dispatch(reviewResponse(CREATE_REVIEW_SUCCESS, response.data));
      return response;
    } catch ({ response }) {
      dispatch(reviewResponse(CREATE_REVIEW_FAILURE, response.data.error));
      return response;
    }
  }
}

function reviewResponse(type, payload = {}, meta = {}) {
  return {
    type,
    payload,
    meta
  }
}
