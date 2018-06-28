var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
export class Confirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            accountInfo: {},
            hasBalance: false,
            isLoading: true,
            username: this.props.navigation.getParam('username'),
            password: this.props.navigation.getParam('password'),
        };
        this.faucet = this.faucet.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.createUser = this.createUser.bind(this);
    }
    componentDidMount() {
        this.createUser();
    }
    createUser() {
        return __awaiter(this, void 0, void 0, function* () {
            let password = this.state.password;
            fetch('http://localhost/bloc/v2.2/users/' + this.state.username, {
                method: 'POST',
                body: JSON.stringify(password),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(response => response.json())
                .then(json => {
                console.log(json);
                this.setState({
                    address: json,
                    isLoading: false,
                });
                this.faucet();
            })
                .catch(function (error) {
                console.log('unable to create user', error);
                throw error;
            });
        });
    }
    viewWallet() {
        this.props.navigation.navigate('Wallet', { address: this.state.address, username: this.state.username });
    }
    faucet() {
        fetch('http://localhost/strato-api/eth/v1.2/faucet', {
            method: 'POST',
            body: `address=${this.state.address}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
            .then(function (response) {
            console.log('fauceted account', response);
            return response;
        })
            .catch(function (error) {
            throw error;
        });
    }
    render() {
        return (React.createElement(View, { style: styles.view }, !this.state.isLoading &&
            React.createElement(View, { style: styles.view },
                React.createElement(Text, { style: styles.containerPadding },
                    "Welcome to STRATO ",
                    this.state.username,
                    "!"),
                React.createElement(Text, { style: styles.containerPadding },
                    this.state.address,
                    " "),
                React.createElement(Button, { onPress: () => { this.props.navigation.navigate('Wallet', { address: this.state.address, username: this.state.username }); }, title: 'View Wallet' }))));
    }
}
;
// const styles = StyleSheet.create({
//   mainView: {
//     flex: 1
//   },
//   headerView: {
//     flex:1,
//     position: 'relative',
//     zIndex: 2
//   },
//   walletView: {
//     backgroundColor: '#ffffff',
//     padding: 0,
//     flexDirection: 'column',
//     borderBottomColor: 'rgba(44,55,71,0.3)',
//     borderBottomWidth: 1,
//     marginTop:0,
//     position:'absolute',
//     top: 0,
//     left: 0,
//     height: '35%',
//     width: '100%',
//     zIndex: 1
//   },
//   view: {
//     padding: 30,
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: '#ffffff'
//   },
//   button: {
//     backgroundColor: "rgba(92, 99,216, 1)",
//     width: 300,
//     height: 45,
//     borderColor: "transparent",
//     borderWidth: 0,
//     borderRadius: 5
//   },
//   containerPadding: {
//     borderColor:'#333333',
//     borderTopWidth: 1,
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderBottomWidth: 1,
//     borderRadius: 5,
//     padding: 5,
//   },
//   welcome: {
//     alignItems: 'center',
//     padding: 20,
//     fontSize: 18,
//   },
//   subWelcome: {
//     padding: 20,
//     alignItems: 'center',
//     fontSize: 18,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     height: '100%',
//     zIndex: 1
//   },
//   walletContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     height: '100%',
//     zIndex: 1
//   },
//   horizontal: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     padding: 0
//   },
//   loaderWheel: {
//     alignSelf: 'center',
//   },
// });
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        height: '100%',
        zIndex: 1
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
//# sourceMappingURL=_Confirmation.js.map