var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { View, StyleSheet, Text, AsyncStorage, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Card } from 'react-native-elements';
//import Config from 'react-native-config'
// import { UsernameChangedActionCreator } from '../actions/AuthActions';
import Toast from 'react-native-easy-toast';
const HOST_URL = 'http://10.119.110.103';
export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            username: '',
            address: '',
            password: '',
            confirmPassword: '',
            createButtonDisabled: false,
        };
        this.createUser = this.createUser.bind(this);
        this.validateSignup = this.validateSignup.bind(this);
    }
    createUser() {
        console.log('got config url', HOST_URL);
        this.setState({ createButtonDisabled: true, isLoading: true });
        let password = this.state.password;
        fetch(HOST_URL + '/bloc/v2.2/users/' + this.state.username, {
            method: 'POST',
            body: JSON.stringify(password),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(json => {
            console.log(json);
            this.setState({
                address: json,
                isLoading: false,
            });
            AsyncStorage.setItem(`${this.state.username}`, JSON.stringify(this.state.address));
            console.log('stored username', AsyncStorage.getItem(`${this.state.username}`));
            console.log('stored address', AsyncStorage.getItem(`${this.state.address}`));
            this.props.navigation.navigate('ContractList', { username: this.state.username, password: this.state.password, address: this.state.address, faucetAccount: true });
            //this.faucet()
        })
            .catch(function (error) {
            console.log('unable to create user', error);
            throw error;
        });
    }
    //   faucet() {
    //     fetch('http://tdlwv3y2cp.eastus2.cloudapp.azure.com/strato-api/eth/v1.2/faucet', {
    //       method: 'POST',
    //       body: `address=${this.state.address}`,
    //       headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //       },
    //     })
    //     .then(function (response) {
    //       console.log('fauceted account', response);
    //       return response;
    //     })
    //     .catch(function (error) {
    //       console.log('unable to faucet account', error);
    //       throw error;
    //     })
    // }
    //   if(this.state.password != this.state.confirmPassword){
    //     this.validateSignup({code:'PasswordsDoNotMatch'}, null);
    //     return;
    //   }
    // }
    validateSignup(err, result) {
        return __awaiter(this, void 0, void 0, function* () {
            var err_msg = '';
            if (err) {
                console.log(err);
                switch (err.code) {
                    case 'NetworkingError':
                        err_msg = 'Unable to connect to server.';
                        break;
                    case 'UsernameExistsException':
                        err_msg = 'That username is taken.';
                        break;
                    case 'InvalidPasswordException':
                        err_msg = 'Passwords must contain at least 1 uppercase letter and 1 number.';
                        break;
                    case 'PasswordsDoNotMatch':
                        err_msg = 'Passwords do not match.';
                        break;
                    default:
                        err_msg = 'Unhandled error: ' + err.code;
                }
            }
            else {
                console.log(result);
                this.setState({ createButtonDisabled: false });
                this.props.navigation.navigate('Confirmation', { username: this.state.username });
            }
            if (err_msg != '') {
                // @ts-ignore
                this.refs.toast.show(err_msg);
                this.setState({ createButtonDisabled: false });
                return;
            }
        });
    }
    render() {
        return (React.createElement(View, { style: styles.view },
            React.createElement(Image, { style: styles.image, source: require('/Users/beta9/ba-mobile/src/screens/ba.png') }),
            React.createElement(Text, { style: styles.header }, "BlockApps STRATO"),
            React.createElement(Card, { containerStyle: styles.loginCard },
                React.createElement(Input, { placeholder: 'Username', leftIcon: React.createElement(Icon, { name: 'user', size: 20, color: '#333333' }), containerStyle: styles.inputPadding, onChangeText: (username) => this.setState({ username }), value: this.state.username }),
                React.createElement(Input, { placeholder: 'Password', leftIcon: React.createElement(Icon, { name: 'lock', size: 20, color: '#333333' }), secureTextEntry: true, containerStyle: styles.inputPadding, 
                    //@ts-ignore
                    // inputContainerStyle={styles.containerPadding}
                    onChangeText: (password) => this.setState({ password }), value: this.state.password }),
                React.createElement(Input, { placeholder: 'Confirm Password', leftIcon: React.createElement(Icon, { name: 'lock', size: 20, color: '#333333' }), secureTextEntry: true, containerStyle: styles.inputPadding, onChangeText: (confirmPassword) => this.setState({ confirmPassword }), value: this.state.confirmPassword }),
                React.createElement(Button, { onPress: this.createUser, title: 'Create Account', loading: this.state.isLoading, loadingStyle: styles.loading, disabled: this.state.createButtonDisabled, buttonStyle: styles.button, containerStyle: { marginTop: 20, marginBottom: 20 } })),
            React.createElement(Toast, { ref: "toast", style: { backgroundColor: '#333333' }, position: 'bottom', positionValue: 225, fadeInDuration: 750, fadeOutDuration: 1000, opacity: 0.8, textStyle: { color: 'white' } })));
    }
}
;
// define styles
const styles = StyleSheet.create({
    loginCard: {
    //backgroundColor: 'pink'
    },
    image: {
        paddingTop: 40,
        width: 130,
        height: 150,
    },
    loading: {
        alignSelf: 'center',
        width: 300,
        height: 50,
    },
    header: {
        padding: 30,
        fontSize: 22
    },
    view: {
        padding: 50,
        flex: 1,
        alignItems: 'center',
    },
    button: {
        width: 300,
        height: 45,
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
        borderRadius: 20,
        padding: 5,
    }
});
//# sourceMappingURL=Signup.js.map