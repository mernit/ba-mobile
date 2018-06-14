import ActionTypes from '../actions/ActionTypes';
import InitialState from './InitialState';
import ActionTypeKeys from '../actions/ActionTypeKeys';


export function AccountFaucetedReducer(
  state: any = InitialState.balance, action: ActionTypes,
): any {
  if (action.type === ActionTypeKeys.ACCOUNT_FAUCETED) {
    return action.balance;
  }
  return state;
}