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
import SleepUtil from './SleepUtil';
import DeferredPromise from './DeferredPromise';
export default class contractService {
    constructor(props) {
        this.stopping = false;
        this.monitoring = false;
        this.props = props;
        Logger.info(`contractService.constructor -  Initialized contract service`);
    }
    StartMonitoring() {
        if (this.monitoring)
            return;
        this.monitoring = true;
        // Start the monitoring loops - don't await this because it runs forever
        this.MonitorContractListAsync();
    }
    CheckNow() {
        this.checkNowTrigger.resolve();
    }
    StopMonitoring() {
        this.stopping = true;
        Logger.info(`contractService.StopMonitoring -  Disabling monitoring loop.`);
    }
    MonitorContractListAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                if (this.stopping)
                    return;
                // Re-create the check-now trigger in case it was triggered last time
                this.checkNowTrigger = new DeferredPromise();
                yield this.GetContractListAsync();
                const sleepPromise = SleepUtil.SleepAsync(10000);
                yield Promise.race([sleepPromise, this.checkNowTrigger]);
                Logger.info('contractService.MonitorcontractListAsync - Looping around to check contracts again');
            }
        });
    }
    GetContractListAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            Logger.info('ContractService.GetContractListAsync - Getting the  contract list.');
            let response = yield fetch('http://localhost/bloc/v2.2/contracts', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: null
            });
            if (response.status != HttpStatus.OK) {
                Logger.info('contractService.GetcontractListAsync - Unable to fetch contract list');
                return undefined;
            }
            let contractList = yield response.json();
            yield this.props.contractListUpdated({ contractList: contractList });
        });
    }
}
//# sourceMappingURL=ContractService.js.map