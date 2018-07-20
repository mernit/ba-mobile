import InitialState from './InitialState';
import ActionTypeKeys from '../actions/ActionTypeKeys';
export function userLoggedInReducer(state = InitialState.loggedIn, action) {
    if (action.type === ActionTypeKeys.USER_LOGGED_IN) {
        return action.loggedIn;
    }
    return state;
}
//# sourceMappingURL=AuthReducer.js.map