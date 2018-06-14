import * as HttpStatus from 'http-status-codes';
import Logger from './Logger';


export interface IVisitedNodesUpdated {
  readonly nodeList: Array<any>;
}

// @ts-ignore
interface IProps {
  readonly visitedNodesUpdated?: (props: IVisitedNodesUpdated) => Promise<void>;
}

export default class ApiService { 
    private readonly props: IProps;

    constructor(props: IProps){
        this.props = props;
        Logger.info(`ApiService.constructor -  Initialized api service`);
    }

    async getVisitedNodes(){
      let response = await fetch('https://mlbrfh44gb.execute-api.us-east-1.amazonaws.com/staging/listNodes?challenge_id=261', {
        method: 'GET',
        headers: null,
        body: null
      }); 

      if(response.status != HttpStatus.OK){
        Logger.info('NodeService.GetNodeListAsync - Unable to fetch node list');
        return undefined;
      }

      let nodeList = await response.json();
      await this.props.visitedNodesUpdated({nodeList: nodeList});
    }

   


}