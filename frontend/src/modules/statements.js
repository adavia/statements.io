import statementAPI from '../api/statement';
import { normalize } from 'normalizr';
import { createSelector } from 'reselect'; 
import statementSchema from '../schemas/statement';
import isEmpty from 'lodash/isEmpty';

import { fetchCategories } from './categories';

import { CREATE_REVIEW_SUCCESS } from './reviews'

export const FETCH_STATEMENTS_REQUEST = 'FETCH_STATEMENTS_REQUEST';               
export const FETCH_STATEMENTS_SUCCESS = 'FETCH_STATEMENTS_SUCCESS';          
export const FETCH_STATEMENTS_FAILURE = 'FETCH_STATEMENTS_FAILURE';

export const SELECT_STATEMENT_REQUEST = 'SELECT_STATEMENT_REQUEST';
export const SELECT_STATEMENT_SUCCESS = 'SELECT_STATEMENT_SUCCESS';
export const SELECT_STATEMENT_FAILURE = 'SELECT_STATEMENT_FAILURE';

export const CREATE_STATEMENT_REQUEST = 'CREATE_STATEMENT_REQUEST';               
export const CREATE_STATEMENT_SUCCESS = 'CREATE_STATEMENT_SUCCESS';          
export const CREATE_STATEMENT_FAILURE = 'CREATE_STATEMENT_FAILURE'; 

export const UPDATE_STATEMENT_REQUEST = 'UPDATE_STATEMENT_REQUEST';               
export const UPDATE_STATEMENT_SUCCESS = 'UPDATE_STATEMENT_SUCCESS';          
export const UPDATE_STATEMENT_FAILURE = 'UPDATE_STATEMENT_FAILURE';

const initialState = {
  items: [],
  selectedItem: null
}

export default function reducer(state = initialState, action) {   
  switch (action.type) {
    case FETCH_STATEMENTS_SUCCESS: {
      const { entities } = action.payload;

      if (entities && entities.statements) {                 
        return {
          ...state,
          items: entities.statements,
        };
      }
      return state;
    }
    case SELECT_STATEMENT_SUCCESS: {         
      const { result, entities } = action.payload;
      
      if (result) {                 
        return {
          ...state,
          items: entities.statements,
          selectedItem: result,
        };
      }
      return state;
    }
    case CREATE_STATEMENT_SUCCESS:
      const { payload } = action;

      const newStatement = {
        ...state.items,
        [payload._id]: payload,
      };

      return {
        ...state,
        items: newStatement,
      };
    case UPDATE_STATEMENT_SUCCESS: {
      delete action.payload.reviews;   
      const statement = { ...state.items[state.selectedItem], ...action.payload }  
          
      const updatedStatement = {
        ...state.items,
        [statement._id]: statement
      };

      return {
        ...state,
        items: updatedStatement,
      };
    }
    case CREATE_REVIEW_SUCCESS: {
      const { payload } = action;

      const statement = state.items[payload.statement];

      return {
        ...state,
        items: {
          ...state.items,
          [payload.statement]: {
            ...statement,
            reviews: statement.reviews.concat(payload._id)
          },
        }
      };
    }
    default:
      return state;
  }
}

function fetchStatements() {                                  
  return async (dispatch) => {
    dispatch(statementResponse(FETCH_STATEMENTS_REQUEST));    
    try {
      const response = await statementAPI.fetch();
      const normalizedData = normalize(response.data, [statementSchema]);
      dispatch(statementResponse(FETCH_STATEMENTS_SUCCESS, normalizedData));
    } catch ({ response }) {
      dispatch(statementResponse(FETCH_STATEMENTS_FAILURE, response.data.error));
    }
  }
}

function selectStatement(id) {
  return async (dispatch) => {
    dispatch(statementResponse(SELECT_STATEMENT_REQUEST));    
    try {
      const response = await statementAPI.show(id);
      const normalizedData = normalize(response.data, statementSchema);
      dispatch(statementResponse(SELECT_STATEMENT_SUCCESS, normalizedData));
    } catch ({ response }) {
      dispatch(statementResponse(SELECT_STATEMENT_FAILURE, response.data.error));
    }
  }
}

export function fetchAll() {
  return dispatch => Promise.all([
    dispatch(fetchStatements()),
    dispatch(fetchCategories())
  ]);
}

export function selectAll(id) {
  return dispatch => Promise.all([
    dispatch(selectStatement(id)),
    dispatch(fetchCategories())
  ]);
}

export function createStatement(values) {
  return async (dispatch) => {
    dispatch(statementResponse(CREATE_STATEMENT_REQUEST));  
    try {
      const response = await statementAPI.create(values);
      dispatch(statementResponse(CREATE_STATEMENT_SUCCESS, response.data));
      return response;
    } catch ({ response }) {
      dispatch(statementResponse(CREATE_STATEMENT_FAILURE, response.data.error));
      return response;
    }
  }
}

export function updateStatement(id, values) {
  return async (dispatch) => {
    dispatch(statementResponse(UPDATE_STATEMENT_REQUEST));    
    try {
      const response = await statementAPI.update(id, values);
      dispatch(statementResponse(UPDATE_STATEMENT_SUCCESS, response.data));
    } catch ({ response }) {
      dispatch(statementResponse(UPDATE_STATEMENT_FAILURE, response.data.error));
    }
  }
}

function statementResponse(type, payload = {}, meta = {}) {
  return {
    type,
    payload,
    meta
  }
}

// SELECTORS

export const fetchStatementsSelector = state => {                                    
  return Object.keys(state.statements.items).map(id => {  
    const statement = state.statements.items[id]; 
    const author = state.users.items[statement.author];
    const categories = statement.categories.map(id => {   
      return state.categories.items[id];
    });  

    return { ...statement, author, categories };                                   
  });                                                                    
}; 

export const getStatementSelector = state => {
  const { items, selectedItem } = state.statements;
  
  if (!selectedItem) {
    return {};
  }
  
  return items[selectedItem];                
};

const getReviewsSelector = state => state.reviews.items;

export const getReviewsByStatementSelector = createSelector(
  [getStatementSelector, getReviewsSelector],                          
  (statement, reviews) => {

    if (isEmpty(statement) || !statement.reviews) {    
      return [];
    }
    
    return statement.reviews.map(id => reviews[id]);
  },
);

const getCategoriesSelector = state => state.categories.items;

export const getCategoriesByStatementSelector = createSelector(
  [getStatementSelector, getCategoriesSelector],                          
  (statement, categories) => {

    if (isEmpty(statement) || !statement.categories) {    
      return [];
    }
    
    return statement.categories.map(id => categories[id]);
  },
);
