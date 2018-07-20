import { combineReducers } from 'redux';
import IStoreState from '../store/IStoreState';

import { userLoggedInReducer as loggedIn } from './AuthReducer';

const RootReducer = combineReducers<IStoreState>({
  // NOTE: The reducer names in this list MUST match the state member names
  loggedIn,
});

export default RootReducer;