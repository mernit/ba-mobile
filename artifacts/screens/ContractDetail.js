import React, { Component } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Icon, Button, Card } from 'react-native-elements';
// ********* START HANDY ASYNC CODE ********* //
// return AsyncStorage.getItem(`${this.state.username}`)
// .then(req => JSON.parse(req))
// .then(json => this.setState({username: json}))
// console.log('got json back from async storage', this.state.username);
//console.log('user saved in storage', AsyncStorage.getItem(`${this.state.username}`));
//const username = await AsyncStorage.getItem(`${this.state.address}`)
// ********* END HAND ASYNC CODE ********* //
const HOST_URL = 'http://192.168.1.167';
export default class ContractDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: this.props.navigation.getParam('password'),
            isLoading: true,
            address: this.props.navigation.getParam('address'),
            userAddress: this.props.navigation.getParam('userAddress'),
            status: '',
            method: '',
            args: '',
            timestamp: '',
            currentLocation: '',
            location: this.props.navigation.getParam('location'),
            username: this.props.navigation.getParam('username'),
            uuid: this.props.navigation.getParam('uuid'),
        };
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.callContract = this.callContract.bind(this);
        this.getState = this.getState.bind(this);
    }
    componentWillMount() {
        this.callContract();
    }
    componentDidMount() {
        this.getState();
    }
    callContract() {
        //Alert.alert(JSON.stringify('calling contract...'))
        const blocURL = HOST_URL + '/bloc/v2.2/users/';
        const username = this.state.username;
        const password = this.state.password;
        const methodName = 'scanItem';
        const address = this.state.address;
        const userAddress = this.state.userAddress;
        const callArgs = {
            location: this.state.location,
            uuid: this.state.uuid,
        };
        fetch(blocURL + username + '/' + userAddress + '/contract/SupplyChain/' + address + '/call?resolve', {
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
            console.log(response);
            this.getState();
        })
            .catch(function (error) {
            console.log(error);
        });
    }
    getState() {
        const blocURL = HOST_URL + `/bloc/v2.2/contracts/SupplyChain/${this.state.address}/state`;
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
                isLoading: false
            });
        })
            .catch(function (error) {
            console.log('error', error);
        });
    }
    render() {
        let timestamp = new Date(this.state.timestamp * 1000).toString().slice(3, 25);
        return (React.createElement(View, { style: styles.view },
            React.createElement(Card, { containerStyle: styles.card },
                React.createElement(Text, { style: styles.title }, this.state.timestamp ? 'VERIFIED' : 'UNVERIFIED'),
                this.state.isLoading ?
                    React.createElement(View, { style: styles.loading },
                        React.createElement(ActivityIndicator, { size: "large" })) :
                    React.createElement(Icon, { iconStyle: styles.icon, name: this.state.timestamp ? 'check-circle' : 'info', size: 72, color: this.state.timestamp ? 'green' : 'orange' }),
                React.createElement(Text, { style: styles.subtitle }, "UUID"),
                React.createElement(Text, { style: styles.location, numberOfLines: 1 }, this.state.uuid ? this.state.uuid : 'UUID Unavailable'),
                React.createElement(Text, { style: styles.subtitle }, "Current Location"),
                React.createElement(Text, { style: this.state.location ? styles.currentLocation : styles.location, numberOfLines: 1 }, this.state.location ? this.state.location : 'Location Unavailable'),
                React.createElement(Text, { style: styles.subtitle }, "Timestamp"),
                React.createElement(Text, { style: styles.hash, numberOfLines: 1 }, this.state.timestamp ? timestamp : 'Timestamp Unavailable')),
            React.createElement(Button, { icon: React.createElement(Icon, { name: 'history', size: 25, color: 'white' }), containerStyle: styles.buttonSignup, onPress: () => {
                    this.props.navigation.navigate('ContractList', {
                        username: this.state.username,
                        password: this.state.password,
                        location: this.state.location,
                        uuid: this.state.uuid,
                        address: this.state.address,
                        userAddress: this.state.userAddress
                    });
                }, title: 'Return to Contracts' })));
    }
}
;
const styles = StyleSheet.create({
    view: {
        padding: 10,
        flex: 1,
        alignItems: 'center',
    },
    loading: {
        padding: 20,
        alignSelf: 'center',
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