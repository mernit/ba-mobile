import React, {Component} from 'react';
import { Icon } from 'react-native-elements';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { View, StatusBar } from 'react-native';

import Confirmation from '../screens/Confirmation';
import ContractList from '../screens/ContractList';
import ContractDetail from '../screens/ContractDetail';
// import ContractItem from '../screens/ContractItem'
import LifeCycle from '../screens/LifeCycle';
import ContractBuilder from '../screens/ContractBuilder';
import Contract from '../screens/Contract';

// import Wallet from '../screens/Wallet';
import Signup from '../screens/Signup';
import SideBar from '../components/SideBar';
import Camera from '../screens/Camera'

import IStoreState from '../store/IStoreState';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ContractListUpdatedActionCreator } from '../actions/ContractActions';

//import { AccountFaucetedActionCreator, IAccountFauceted } from '../actions/UserActions';

//import UserService, { IAccountFauceted } from '../services/UserService';

// @ts-ignore

// SET GLOBAL PROPS //
import { setCustomText} from 'react-native-global-props';

const customTextProps = {
  style: {
    fontFamily: 'Avenir-Heavy'
  }
}

setCustomText(customTextProps);
// END SET GLOBAL PROPS //

const InternalStack = StackNavigator({
  Confirmation: { screen: Confirmation,
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: '#293742', paddingLeft: 10},
      title: navigation.indexs,
      headerLeft: <Icon name="keyboard-arrow-left" size={30} color={'#ffffff'} onPress={ () => navigation.navigate('Map') } />
    })
  },
  LifeCycle: { screen: LifeCycle },
  //Wallet: {screen: Wallet },
  // ContractItem: { screen: ContractItem},
  Contract: { screen: Contract },
  Camera: { screen: Camera },
  ContractList: { screen: ContractList },
  ContractBuilder: { screen: ContractBuilder},
  ContractDetail: { screen: ContractDetail },
  Signup: { screen: Signup },
  },
{
  initialRouteName: 'Signup',
  navigationOptions: ({navigation}) => ({
    headerStyle: {backgroundColor: 'rgba(44,55,71,1.0)', paddingLeft: 10},
    title: navigation.indexs,
    headerLeft: <Icon name="menu" size={30} color={'#ffffff'} onPress={ () => navigation.navigate('DrawerToggle') } />
  })
}
)

const DrawerStack = DrawerNavigator({
    Main: {
      screen: InternalStack,
    },
  },
  {
  initialRouteName: 'Main',
  contentComponent: props => <SideBar {...props} />,
  
  }
)

const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack },
}, {
  headerMode: 'none'
})

// Manifest of possible screens
export const RootStack = StackNavigator({
  drawerStack: { screen: DrawerNavigation }, 
}, {
  // Default config for all screens
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'drawerStack'
})


interface IProps{
  ContractListUpdated: (contractList: Array<any>) => (dispatch: Dispatch<IStoreState>) => Promise<void>
  contractList: Array<any>
}


export class App extends Component<IProps> {
    // monitoring services
    // private contractService: UserService;
    // private locationService: LocationService;


    constructor(props: IProps){
      super(props);

      
    }

    
    render() {
        return (
          <View style={{flex: 1}}>
             <StatusBar barStyle="light-content"/>
            <RootStack />
          </View>
        )
      }
  }

// @ts-ignore
function mapStateToProps(state: IStoreState): IProps { 
  // @ts-ignore
  return {
    contractList: state.contractList,
    //balance: state.balance,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IStoreState>) {
  return {
    ContractListUpdated: bindActionCreators(ContractListUpdatedActionCreator, dispatch),
    //AccountFauceted: bindActionCreators(AccountFaucetedActionCreator, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

/*
const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: 'blue'
  }
})
*/

//# sourceMappingURL=App.js.map