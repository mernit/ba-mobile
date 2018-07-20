import { combineReducers } from 'redux';
import { userLoggedInReducer as loggedIn } from './AuthReducer';
const RootReducer = combineReducers({
    // NOTE: The reducer names in this list MUST match the state member names
    loggedIn,
});
export default RootReducer;
//# sourceMappingURL=RootReducer.js.map