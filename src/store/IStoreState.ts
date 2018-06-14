export default interface IStoreState {
  readonly nav: string;
  readonly loggedIn: boolean;
  readonly balance: any;
  readonly contractList: Array<any>, 
}