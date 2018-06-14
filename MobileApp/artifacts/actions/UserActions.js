var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import keys from './ActionTypeKeys';
function AccountFaucetedAction(balance) {
    return {
        type: keys.ACCOUNT_FAUCETED,
        balance: balance,
    };
}
export function AccountFaucetedActionCreator(balance) {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        dispatch(AccountFaucetedAction(balance));
    });
}
//# sourceMappingURL=UserActions.js.map