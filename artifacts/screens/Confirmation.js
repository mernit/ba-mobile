import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon, Button, Card } from 'react-native-elements';
const HOST_URL = 'http://192.168.1.167';
export default class Confirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stateResponse: [],
            loading: true,
            storedData: '',
            hash: this.props.navigation.getParam('hash'),
            address: this.props.navigation.getParam('address'),
            contractAddress: '',
            contractName: '',
            status: this.props.navigation.getParam('status'),
            value: '',
            method: '',
            args: '',
            location: '',
            timestamp: '',
            response: [],
            currentLocation: '',
            username: this.props.navigation.getParam('username'),
            password: this.props.navigation.getParam('password'),
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.callContract = this.callContract.bind(this);
        this.getState = this.getState.bind(this);
    }
    componentWillMount() {
        if (!this.state.hash)
            this.getState();
        // this.callContract();
        // GET CONTRACT STATE VARIABLES 
        // USER CAN MODIFY STATE VARIABLES IN INPUT FIELDS
        // CALL CONTRACT AND PUSH UPDATED STATE VARIABLES
    }
    // CALL CONTRACT 
    callContract() {
        const blocURL = HOST_URL + '/bloc/v2.2/users/';
        const username = 'Zabar';
        const password = "1234";
        const methodName = 'scanItem';
        const address = '87168271eb89f6d0282725681f7b724bde31c4f0';
        const contractAddress = 'b823216ffb44fcea8eb4e2a53d7275eee8435aef';
        const callArgs = {
            location: 'riverdale',
            uuid: '123456789',
            timestamp: '1142',
        };
        fetch(blocURL + username + '/' + address + '/contract/SupplyChain/' + contractAddress + '/call?resolve', {
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
            .then(response => response.json())
            .then(json => {
            console.log(json);
            this.setState({
                status: json.data.contents[1],
            });
        })
            .catch(function (error) {
            throw error;
        });
    }
    getState() {
        const blocURL = HOST_URL + `/bloc/v2.2/contracts/SupplyChain/${this.state.address}/state?name=itemIndex`;
        fetch(blocURL, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(json => {
            console.log(json);
            this.setState({
                location: json.itemIndex[0].location,
                currentLocation: json.itemIndex.slice(-1)[0].location,
                timestamp: json.itemIndex[0].timestamp,
            });
        })
            .catch(function (error) {
            throw error;
        });
    }
    // END CALL CONTRACT
    render() {
        return (React.createElement(View, { style: styles.view },
            React.createElement(Card, { containerStyle: styles.card },
                React.createElement(Text, { style: styles.title }, this.state.hash ? 'PENDING' : 'UNKNOWN'),
                React.createElement(Icon, { iconStyle: styles.icon, name: this.state.hash ? 'check-circle' : 'info', size: 72, color: this.state.hash ? 'green' : 'orange' }),
                React.createElement(Text, { numberOfLines: 2, ellipsizeMode: 'tail', style: styles.subtitle }, "Transaction Hash"),
                React.createElement(Text, { style: styles.location }, this.state.hash ? this.state.hash : 'Hash Unavailable'),
                React.createElement(Text, { numberOfLines: 2, style: styles.subtitle }, "Origin Location"),
                React.createElement(Text, { style: styles.location }, this.state.location ? this.state.location : 'Location Unavailable')),
            React.createElement(Button, { icon: React.createElement(Icon, { name: 'history', size: 25, color: 'white' }), containerStyle: styles.buttonSignup, onPress: () => { this.props.navigation.navigate('ContractList'); }, title: 'Return to Contracts' })));
    }
}
;
const styles = StyleSheet.create({
    view: {
        padding: 10,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff'
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
        fontWeight: 'normal',
        paddingTop: 20,
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
//# sourceMappingURL=Confirmation.js.map