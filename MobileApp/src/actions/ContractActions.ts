import IStoreState from '../store/IStoreState';
import { Dispatch } from 'redux';
import keys from './ActionTypeKeys';

// User logged in
export interface IContractListUpdated {
  readonly type: keys.CONTRACT_LIST_UPDATED;
  readonly contractList: Array<any>;
}

function ContractListUpdatedAction(contractList: Array<any>): IContractListUpdated {
  return {
    type: keys.CONTRACT_LIST_UPDATED,
    contractList: contractList,
  };
}

export function ContractListUpdatedActionCreator(contractList: Array<any>): (dispatch: Dispatch<IStoreState>) => Promise<void> {
  return async (dispatch: Dispatch<IStoreState>) => {
    dispatch(ContractListUpdatedAction(contractList));
  };
}