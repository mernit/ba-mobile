var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { View, StatusBar } from 'react-native';
import Confirmation from '../screens/Confirmation';
import ContractList from '../screens/ContractList';
import ContractDetail from '../screens/ContractDetail';
// import ContractItem from '../screens/ContractItem'
import LifeCycle from '../screens/LifeCycle';
import ContractBuilder from '../screens/ContractBuilder';
// import Wallet from '../screens/Wallet';
import Signup from '../screens/Signup';
import SideBar from '../components/SideBar';
import Camera from '../screens/Camera';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ContractListUpdatedActionCreator } from '../actions/ContractActions';
import ContractService from '../services/ContractService';
//import { AccountFaucetedActionCreator, IAccountFauceted } from '../actions/UserActions';
//import UserService, { IAccountFauceted } from '../services/UserService';
// @ts-ignore
const InternalStack = StackNavigator({
    Confirmation: { screen: Confirmation,
        navigationOptions: ({ navigation }) => ({
            headerStyle: { backgroundColor: 'rgba(44,55,71,1.0)', paddingLeft: 10 },
            title: navigation.indexs,
            headerLeft: React.createElement(Icon, { name: "keyboard-arrow-left", size: 30, color: '#ffffff', onPress: () => navigation.navigate('Map') })
        })
    },
    LifeCycle: { screen: LifeCycle },
    //Wallet: {screen: Wallet },
    // ContractItem: { screen: ContractItem},
    Camera: { screen: Camera },
    ContractList: { screen: ContractList },
    ContractBuilder: { screen: ContractBuilder },
    ContractDetail: { screen: ContractDetail },
    Signup: { screen: Signup },
}, {
    initialRouteName: 'Signup',
    navigationOptions: ({ navigation }) => ({
        headerStyle: { backgroundColor: 'rgba(44,55,71,1.0)', paddingLeft: 10 },
        title: navigation.indexs,
        headerLeft: React.createElement(Icon, { name: "menu", size: 30, color: '#ffffff', onPress: () => navigation.navigate('DrawerToggle') })
    })
});
const DrawerStack = DrawerNavigator({
    Main: {
        screen: InternalStack,
    },
}, {
    initialRouteName: 'Main',
    contentComponent: props => React.createElement(SideBar, Object.assign({}, props)),
});
const DrawerNavigation = StackNavigator({
    DrawerStack: { screen: DrawerStack },
}, {
    headerMode: 'none'
});
// Manifest of possible screens
export const RootStack = StackNavigator({
    drawerStack: { screen: DrawerNavigation },
}, {
    // Default config for all screens
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'drawerStack'
});
export class App extends Component {
    constructor(props) {
        super(props);
        this.gotNewContractList = this.gotNewContractList.bind(this);
        this.contractService = new ContractService({ contractListUpdated: this.gotNewContractList });
        this.contractService.StartMonitoring();
    }
    gotNewContractList(props) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.props.ContractListUpdated(props.contractList);
        });
    }
    render() {
        return (React.createElement(View, { style: { flex: 1 } },
            React.createElement(StatusBar, { barStyle: "light-content" }),
            React.createElement(RootStack, null)));
    }
}
// @ts-ignore
function mapStateToProps(state) {
    // @ts-ignore
    return {
        contractList: state.contractList,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        ContractListUpdated: bindActionCreators(ContractListUpdatedActionCreator, dispatch),
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
//# sourceMappingURL=App.js.map