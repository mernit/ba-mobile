var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { StyleSheet, Text } from 'react-native';
// import Logger from '../services/Logger';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-easy-toast';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UserLoggedInActionCreator } from '../actions/AuthActions';
import { NavigationActions } from 'react-navigation';
import * as HttpStatus from 'http-status-codes';
export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.navigation.getParam('username', ''),
            password: ''
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.navigateToScreen = this.navigateToScreen.bind(this);
        this.storeSession = this.storeSession.bind(this);
        this.login = this.login.bind(this);
    }
    componentDidMount() {
    }
    navigateToScreen(route) {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: route }),
            ],
        });
        this.props.navigation.dispatch(resetAction);
    }
    storeSession(result) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('access token + ' + result.getAccessToken().getJwtToken());
            console.log(result.getIdToken().getJwtToken());
            yield AsyncStorage.setItem('session', JSON.stringify(result));
            yield AsyncStorage.setItem('idToken', result.getIdToken().getJwtToken());
            let userInfo = yield this.getUserInfo();
            yield AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            console.log(userInfo);
            yield this.props.UserLoggedIn(true);
            console.log(this.props.loggedIn);
            this.navigateToScreen('Map');
        });
    }
    getUserInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            let idToken = yield AsyncStorage.getItem('idToken');
            // get bloc user info here 
            let response = yield fetch('https://mlbrfh44gb.execute-api.us-east-1.amazonaws.com/staging/getUserInfo', {
                method: 'GET',
                headers: {
                    'Authorization': idToken
                },
                body: null
            });
            if (response.status != HttpStatus.OK) {
                console.log('error');
                return undefined;
            }
            let userInfo = yield response.json();
            return userInfo;
        });
    }
    login() {
        // login the bloc user
    }
    render() {
        return (React.createElement(View, { style: styles.view },
            React.createElement(View, { style: styles.loginCard },
                React.createElement(Text, { style: styles.header }, " Sign in "),
                React.createElement(Input, { placeholder: 'Username', leftIcon: React.createElement(Icon, { name: 'user', size: 20, color: '#333333' }), containerStyle: styles.inputPadding, onChangeText: (username) => this.setState({ username }), value: this.state.username }),
                React.createElement(Input, { placeholder: 'Password', leftIcon: React.createElement(Icon, { name: 'lock', size: 20, color: '#333333' }), secureTextEntry: true, containerStyle: styles.inputPadding, onChangeText: (password) => this.setState({ password }), value: this.state.password }),
                React.createElement(Button, { containerStyle: styles.buttonLogin, onPress: this.login, title: 'Login' }),
                React.createElement(Toast, { ref: "toast", style: { backgroundColor: '#333333' }, position: 'top', positionValue: 300, fadeInDuration: 750, fadeOutDuration: 1000, opacity: 0.8, textStyle: { color: 'white' } })),
            React.createElement(View, { style: styles.signupCard },
                React.createElement(Button, { containerStyle: styles.buttonSignup, onPress: () => { this.props.navigation.navigate('Signup'); }, title: 'Signup' }))));
    }
}
;
// @ts-ignore
function mapStateToProps(state) {
    // @ts-ignore
    return {
        loggedIn: state.loggedIn
    };
}
// @ts-ignore
function mapDispatchToProps(dispatch) {
    return {
        UserLoggedIn: bindActionCreators(UserLoggedInActionCreator, dispatch),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
// define styles
const styles = StyleSheet.create({
    view: {
        padding: 10,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    loginCard: {
        flex: 6,
        alignSelf: 'stretch',
    },
    signupCard: {
        flex: 1,
    },
    header: {
        marginTop: 12,
        fontSize: 22,
        alignSelf: 'center'
    },
    buttonSignup: {
        backgroundColor: "rgba(92, 99,216, 1)",
        width: 300,
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 3,
    },
    buttonLogin: {
        backgroundColor: "rgba(92, 99,216, 1)",
        width: 100,
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 3,
        alignSelf: 'center',
        marginTop: 20
    },
    inputPadding: {
        marginTop: 20,
        marginLeft: 15
    },
    containerPadding: {
        borderColor: '#333333',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 5,
        padding: 5,
    }
});
//# sourceMappingURL=Login.js.map