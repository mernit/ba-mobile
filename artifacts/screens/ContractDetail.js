import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon, Button, Card } from 'react-native-elements';
export default class ContractDetail extends Component {
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
    componentDidMount() {
        this.callContract();
        this.getState();
        // GET CONTRACT STATE VARIABLES 
        // USER CAN MODIFY STATE VARIABLES IN INPUT FIELDS
        // CALL CONTRACT AND PUSH UPDATED STATE VARIABLES
    }
    getContract() {
        const blocURL = 'localhost';
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
        const blocURL = 'http://localhost/bloc/v2.2/users/';
        const username = 'David';
        const password = "1234";
        const value = "429";
        const methodName = 'set';
        const address = '9d5cefae2da4fea135b298626879728980e931d5';
        const contractAddress = '4f77a0e0f5993dbbc02071316bd0f73e026da43f';
        const callArgs = { x: value };
        fetch(blocURL + username + '/' + address + '/contract/Jok/' + contractAddress + '/call', {
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
                status: json.status,
            });
        })
            .catch(function (error) {
            throw error;
        });
    }
    // TODO: FIGURE OUT WHY 405 IS RETURNED 
    getState() {
        let blocURL = 'http://localhost/bloc/v2.2/contracts/';
        let contractName = 'ProjectManager';
        let contractAddress = '04209bdc13dd0357b7842282644c087cf6aca952';
        const URL = blocURL + contractName + '/' + contractAddress + '/state';
        fetch(URL, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
            },
        })
            .then(function (response) {
            console.log('got state', response);
        })
            .catch(function (error) {
            console.log('error!', URL);
            throw error;
        });
    }
    // END CALL CONTRACT
    render() {
        const response = this.state.response;
        return (React.createElement(View, { style: styles.view },
            React.createElement(Card, { containerStyle: styles.card },
                React.createElement(Text, { style: styles.title }, "Success!"),
                React.createElement(Icon, { name: 'done', color: '#00aced' }),
                React.createElement(Text, { style: styles.title }, this.state.status),
                React.createElement(Text, { style: styles.hash }, this.state.hash),
                React.createElement(Text, { style: styles.hash }, response.projects)),
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
//# sourceMappingURL=ContractDetail.js.map