var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon, Button, Card } from 'react-native-elements';
export default class ContractDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: this.props.navigation.getParam('password'),
            stateResponse: [],
            isLoading: false,
            storedData: '',
            address: this.props.navigation.getParam('address'),
            userAddress: this.props.navigation.getParam('userAddress'),
            contractName: '',
            status: '',
            value: '',
            method: '',
            args: '',
            timestamp: '',
            response: [],
            currentLocation: '',
            location: this.props.navigation.getParam('location'),
            username: this.props.navigation.getParam('username'),
            uuid: this.props.navigation.getParam('uuid'),
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.callContract = this.callContract.bind(this);
        this.getState = this.getState.bind(this);
    }
    componentWillMount() {
        this.callContract();
        this.setState({ isLoading: true });
    }
    callContract() {
        return __awaiter(this, void 0, void 0, function* () {
            //Alert.alert(JSON.stringify('calling contract...'))
            const blocURL = 'http://10.119.106.130/bloc/v2.2/users/';
            const username = this.state.username;
            const password = this.state.password;
            const methodName = 'scanItem';
            const address = this.state.address;
            const userAddress = this.state.userAddress;
            const callArgs = {
                location: this.state.location,
                uuid: this.state.uuid,
            };
            yield fetch(blocURL + username + '/' + userAddress + '/contract/SupplyChain/' + address + '/call?resolve', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password: password,
                    method: methodName,
                    value: "0",
                    args: callArgs
                })
            })
                .then(function (response) {
                //Alert.alert(JSON.stringify(response))
                console.log(response);
                this.setState({
                    isLoading: false,
                });
                this.getState();
            })
                .catch(function (error) {
                //Alert.alert(JSON.stringify(error))
                console.log(error);
            });
        });
    }
    getState() {
        const blocURL = `http://10.119.106.130/bloc/v2.2/contracts/SupplyChain/${this.state.address}/state`;
        fetch(blocURL, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(json => {
            console.log(json);
            this.setState({
                location: json.m_location,
                uuid: json.m_uuid,
                timestamp: json.m_timestamp,
                isLoading: false,
            });
        })
            .catch(function (error) {
            throw error;
        });
    }
    render() {
        let timestamp = new Date(this.state.timestamp * 1000).toString().slice(3, 25);
        return (React.createElement(View, { style: styles.view },
            React.createElement(Card, { containerStyle: styles.card },
                React.createElement(Text, { style: styles.title }, this.state.location ? 'VERIFIED' : 'UNVERIFIED'),
                React.createElement(Icon, { iconStyle: styles.icon, name: this.state.location ? 'check-circle' : 'info', size: 72, color: this.state.location ? 'green' : 'orange' }),
                React.createElement(Text, { style: styles.subtitle }, "UUID"),
                React.createElement(Text, { style: styles.location, numberOfLines: 1 }, this.state.uuid ? this.state.uuid : 'UUID Unavailable'),
                React.createElement(Text, { style: styles.subtitle }, "Current Location"),
                React.createElement(Text, { style: this.state.location ? styles.currentLocation : styles.location, numberOfLines: 1 }, this.state.location ? this.state.location : 'Location Unavailable'),
                React.createElement(Text, { style: styles.subtitle }, "Timestamp"),
                React.createElement(Text, { style: styles.hash, numberOfLines: 1 }, this.state.timestamp ? timestamp : 'Timestamp Unavailable')),
            React.createElement(Button, { icon: React.createElement(Icon, { name: 'history', size: 25, color: 'white' }), containerStyle: styles.buttonSignup, onPress: () => {
                    this.props.navigation.navigate('ContractList', {
                        username: this.state.username,
                        // password: this.state.password,
                        // location: this.state.location, 
                        // uuid: this.state.uuid, 
                        // address: this.state.address, 
                        userAddress: this.state.userAddress
                    });
                }, title: 'Return to Contracts' })));
    }
}
;
// @ts-ignore
function mapStateToProps(state) {
    // @ts-ignore
    return {};
}
// @ts-ignore
function mapDispatchToProps(dispatch) {
    return {};
}
const styles = StyleSheet.create({
    view: {
        padding: 10,
        flex: 1,
        alignItems: 'center',
    },
    icon: {
        padding: 15,
        alignSelf: 'center',
    },
    card: {
        flexDirection: 'column',
        height: '80%',
        width: '90%',
        borderRadius: 1,
        marginBottom: 30,
        borderColor: 'rgba(53,53,53,0.1)',
    },
    title: {
        marginTop: 20,
        alignSelf: 'center',
        fontSize: 36,
        padding: 15,
    },
    subtitle: {
        alignSelf: 'center',
        paddingTop: 20,
        fontSize: 14,
    },
    location: {
        alignSelf: 'center',
        padding: 5,
        fontSize: 22,
    },
    currentLocation: {
        alignSelf: 'center',
        padding: 5,
        fontSize: 22,
        color: 'blue',
    },
    hash: {
        alignSelf: 'center',
        padding: 5,
        fontSize: 22,
    },
    loginCard: {
        flex: 6,
        alignSelf: 'stretch',
    },
    success: {
        alignSelf: 'center',
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
        borderRadius: 5,
        padding: 5,
    }
});
//# sourceMappingURL=ContractDetail.js.map