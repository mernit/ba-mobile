import IStoreState from '../store/IStoreState';
import { Dispatch } from 'redux';
import keys from './ActionTypeKeys';

// User logged in

export interface IAccountFauceted {
  readonly type: keys.ACCOUNT_FAUCETED;
  readonly balance: any;
}

function AccountFaucetedAction(balance: any): IAccountFauceted {
  return {
    type: keys.ACCOUNT_FAUCETED,
    balance: balance,
  };
}

export function AccountFaucetedActionCreator(balance: Array<any>): (dispatch: Dispatch<IStoreState>) => Promise<void> {
  return async (dispatch: Dispatch<IStoreState>) => {
    dispatch(AccountFaucetedAction(balance));
  };
}