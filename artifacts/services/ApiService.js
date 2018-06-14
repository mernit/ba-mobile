var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as HttpStatus from 'http-status-codes';
import Logger from './Logger';
export default class ApiService {
    constructor(props) {
        this.props = props;
        Logger.info(`ApiService.constructor -  Initialized api service`);
    }
    getVisitedNodes() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch('https://mlbrfh44gb.execute-api.us-east-1.amazonaws.com/staging/listNodes?challenge_id=261', {
                method: 'GET',
                headers: null,
                body: null
            });
            if (response.status != HttpStatus.OK) {
                Logger.info('NodeService.GetNodeListAsync - Unable to fetch node list');
                return undefined;
            }
            let nodeList = yield response.json();
            yield this.props.visitedNodesUpdated({ nodeList: nodeList });
        });
    }
}
//# sourceMappingURL=ApiService.js.map