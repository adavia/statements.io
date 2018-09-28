import appReducer from './app';
import { LOGOUT_SUCCESS } from './auth';

export default function reducer(state, action) {
  if (action.type === LOGOUT_SUCCESS) {
    state = undefined;
  }

  return appReducer(state, action);
}