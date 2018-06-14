import InitialState from './InitialState';
import ActionTypeKeys from '../actions/ActionTypeKeys';
export function AccountFaucetedReducer(state = InitialState.balance, action) {
    if (action.type === ActionTypeKeys.ACCOUNT_FAUCETED) {
        return action.balance;
    }
    return state;
}
//# sourceMappingURL=UserReducers.js.map