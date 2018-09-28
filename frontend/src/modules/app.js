import { combineReducers } from 'redux';
import loaders from './loaders';
import auth from './auth';
import users from './users';
import statements from './statements';
import categories from './categories';
import messages from './messages';
import reviews from './reviews';

const appReducer = combineReducers({
  loaders,
  auth,
  users,
  statements,
  categories,
  messages,
  reviews
});

export default appReducer;