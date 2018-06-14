import { combineReducers } from 'redux';
import IStoreState from '../store/IStoreState';

import { navReducer } from './NavReducers';
import { userLoggedInReducer as  loggedIn } from './AuthReducers';
import { AccountFaucetedReducer as balance } from './UserReducers';
import { contractListUpdatedReducer as contractList } from './ContractReducers';

const RootReducer = combineReducers<IStoreState>({
  // NOTE: The reducer names in this list MUST match the state member names
  navReducer,
  loggedIn,
  balance,
  contractList,

});

export default RootReducer;
