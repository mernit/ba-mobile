import InitialState from './InitialState';
import ActionTypeKeys from '../actions/ActionTypeKeys';
export function contractListUpdatedReducer(state = InitialState.contractList, action) {
    if (action.type === ActionTypeKeys.CONTRACT_LIST_UPDATED) {
        return action.contractList;
    }
    return state;
}
//# sourceMappingURL=ContractReducers.js.map