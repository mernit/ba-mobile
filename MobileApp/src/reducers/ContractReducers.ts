import ActionTypes from '../actions/ActionTypes';
import InitialState from './InitialState';
import ActionTypeKeys from '../actions/ActionTypeKeys';

export function contractListUpdatedReducer(
  state: Array<any> = InitialState.contractList, action: ActionTypes,
): Array<any> {
  if (action.type === ActionTypeKeys.CONTRACT_LIST_UPDATED) {
    return action.contractList;
  }
  return state;
}