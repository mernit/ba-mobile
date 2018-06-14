var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import keys from './ActionTypeKeys';
function ContractListUpdatedAction(contractList) {
    return {
        type: keys.CONTRACT_LIST_UPDATED,
        contractList: contractList,
    };
}
export function ContractListUpdatedActionCreator(contractList) {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        dispatch(ContractListUpdatedAction(contractList));
    });
}
//# sourceMappingURL=ContractActions.js.map