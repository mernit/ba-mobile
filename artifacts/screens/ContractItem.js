import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon, Button, Card } from 'react-native-elements';
const HOST_URL = 'http://192.168.1.167';
export default class ContractItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stateResponse: [],
            loading: true,
            storedData: '',
            address: '',
            contractAddress: '',
            contractName: '',
            status: '',
            value: '',
            method: '',
            args: '',
            hash: '',
            response: [],
            username: this.props.navigation.getParam('username'),
            password: this.props.navigation.getParam('password'),
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.getContract = this.getContract.bind(this);
        this.callContract = this.callContract.bind(this);
    }
    componentWillMount() {
        this.getState();
    }
    getContract() {
        const blocURL = HOST_URL;
        const contractName = this.state.contractName;
        const contractAddress = this.state.contractAddress;
        fetch(blocURL +
            '/contracts' +
            contractName +
            contractAddress +
            '/state?length=', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(json => {
            console.log(json);
            this.setState({
                storedData: json.storedData,
            });
        })
            .catch(function (error) {
            console.log('unable to call contract', error);
            throw error;
        });
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
                hash: json.hash,
                status: json.data.contents[1],
            });
        })
            .catch(function (error) {
            throw error;
        });
    }
    getState() {
        const blocURL = HOST_URL + '/bloc/v2.2/contracts/SupplyChain/b823216ffb44fcea8eb4e2a53d7275eee8435aef/state?name=itemIndex';
        fetch(blocURL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(function (response) {
            console.log('got it', response);
            return response;
        })
            .catch(function (error) {
            console.log('no luck', error);
            throw error;
        });
    }
    // END CALL CONTRACT
    render() {
        return (React.createElement(View, { style: styles.view },
            React.createElement(Card, { containerStyle: styles.card },
                React.createElement(Text, { style: styles.title }, "Success!"),
                React.createElement(Icon, { name: 'done', color: '#00aced' }),
                React.createElement(Text, { style: styles.title }, this.state.status),
                React.createElement(Text, { style: styles.hash }, this.state.hash)),
            React.createElement(Button, { containerStyle: styles.buttonSignup, onPress: () => { this.props.navigation.navigate('Signup'); }, title: 'Return to Contracts' })));
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
        backgroundColor: '#ffffff'
    },
    hash: {
        fontSize: 16,
    },
    card: {
        height: '50%',
        width: '75%',
        borderRadius: 1,
        marginBottom: 30,
        borderColor: 'rgba(53,53,53,0.1)',
    },
    title: {
        alignSelf: 'center',
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20,
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
//# sourceMappingURL=ContractItem.js.map