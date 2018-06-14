import { IUserLoggedIn } from './AuthActions';
import { IAccountFauceted } from './UserActions';
import { IContractListUpdated } from './ContractActions';

type ActionTypes =

  // User Actions
  | IUserLoggedIn

  | IAccountFauceted

  | IContractListUpdated

  ;

export default ActionTypes;