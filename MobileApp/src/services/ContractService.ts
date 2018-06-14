import * as HttpStatus from 'http-status-codes';
import Logger from './Logger';
import SleepUtil from './SleepUtil';
import DeferredPromise from './DeferredPromise';

export interface IContractListUpdated {
  readonly contractList: Array<any>;
}

// @ts-ignore
interface IProps {
  readonly contractListUpdated?: (props: IContractListUpdated) => Promise<void>;
}

export default class contractService{
    private readonly props: IProps;
    private stopping: boolean = false;
    private monitoring: boolean = false;
    private checkNowTrigger: DeferredPromise;

    constructor(props: IProps){
        this.props = props;
        Logger.info(`contractService.constructor -  Initialized contract service`);
    }

    StartMonitoring() {
        if (this.monitoring) return;
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
   
    private async MonitorContractListAsync(){
        while(true){
            if(this.stopping) return;

            // Re-create the check-now trigger in case it was triggered last time
            this.checkNowTrigger = new DeferredPromise();

            await this.GetContractListAsync();

            const sleepPromise = SleepUtil.SleepAsync(10000);
            await Promise.race([ sleepPromise, this.checkNowTrigger ]);

            Logger.info('contractService.MonitorcontractListAsync - Looping around to check contracts again');
        }
    }

    private async GetContractListAsync(){
        Logger.info('ContractService.GetContractListAsync - Getting the  contract list.');

        let response = await fetch('http://localhost/bloc/v2.2/contracts', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: null
        }); 

        if(response.status != HttpStatus.OK){
          Logger.info('contractService.GetcontractListAsync - Unable to fetch contract list');
          return undefined;
        }

        let contractList = await response.json();
        await this.props.contractListUpdated({contractList: contractList});

      }
}
