import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon, Button, Card } from 'react-native-elements';
const HOST_URL = 'http://192.168.1.167';
export default class Contract extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stateResponse: [],
            loading: true,
            uuid: '',
            storedData: '',
            address: this.props.navigation.getParam('address'),
            userAddress: this.props.navigation.getParam('userAddress'),
            contractAddress: '',
            contractName: '',
            status: '',
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
        this.componentWillMount = this.componentWillMount.bind(this);
        this.callContract = this.callContract.bind(this);
        this.getState = this.getState.bind(this);
    }
    componentWillMount() {
        this.getState();
        // if(this.props.navigation.getParam('uuid')) {
        //   this.callContract();
        // }
        // else if(this.props.navigation.getParam('address') && this.props.navigation.getParam('uuid')) {
        //   this.getState();
        // }
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
            location: 'riverdale, ny 10463',
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
        const blocURL = HOST_URL + `/bloc/v2.2/contracts/SupplyChain/${this.state.address}/state`;
        fetch(blocURL, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(json => {
            console.log(json.m_timestamp);
            this.setState({
                //location: json.itemIndex[0].location,
                //currentLocation: json.itemIndex.slice(-1)[0].location,
                timestamp: json.m_timestamp,
                location: json.m_location,
                uuid: json.m_uuid,
            });
        })
            .catch(function (error) {
            throw error;
        });
    }
    // END CALL CONTRACT
    render() {
        let timestamp = new Date(this.state.timestamp * 1000).toString().slice(3, 25);
        console.log('timestamp', timestamp);
        return (React.createElement(View, { style: styles.view },
            React.createElement(Card, { containerStyle: styles.card },
                React.createElement(Text, { style: styles.title }, this.state.timestamp ? 'VERIFIED' : 'UNVERIFIED'),
                React.createElement(Icon, { iconStyle: styles.icon, name: this.state.timestamp ? 'check-circle' : 'info', size: 72, color: this.state.timestamp ? 'green' : 'orange' }),
                React.createElement(Text, { style: styles.subtitle }, "UUID"),
                React.createElement(Text, { style: styles.location, numberOfLines: 1 }, this.state.uuid ? this.state.uuid : 'UUID Unavailable'),
                React.createElement(Text, { style: styles.subtitle }, "Current Location"),
                React.createElement(Text, { style: this.state.location ? styles.currentLocation : styles.location, numberOfLines: 1 }, this.state.location ? this.state.location : 'Location Unavailable'),
                React.createElement(Text, { style: styles.subtitle }, "Timestamp"),
                React.createElement(Text, { style: styles.hash, numberOfLines: 1 }, this.state.timestamp ? timestamp : 'Timestamp Unavailable')),
            React.createElement(Button, { icon: React.createElement(Icon, { name: 'link', size: 25, color: 'white' }), containerStyle: styles.buttonSignup, onPress: () => { this.props.navigation.navigate('Camera', { username: this.state.username, password: this.state.password, address: this.state.address, userAddress: this.state.userAddress }); }, title: 'Check-In' })));
    }
}
;
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
        padding: 15,
        fontSize: 22,
    },
    currentLocation: {
        alignSelf: 'center',
        padding: 5,
        fontSize: 22,
        color: 'black',
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
//# sourceMappingURL=Contract.js.map