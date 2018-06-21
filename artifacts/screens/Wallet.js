import React, { Component } from 'react';
import { Button, ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
export class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: this.props.navigation.getParam('address'),
            accountInfo: [],
            hasBalance: false,
            isLoading: true,
            username: this.props.navigation.getParam('username'),
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
    }
    componentDidMount() {
        this.getUserInfo();
    }
    getUserInfo() {
        fetch('http://localhost/strato-api/eth/v1.2/account?address=' + this.state.address, {
            method: 'GET',
            body: null,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(json => {
            console.log('got balance', json);
            this.setState({
                accountInfo: json[0].balance,
                isLoading: false,
            });
        })
            .catch(function (error) {
            console.log('unable to create user', error);
            throw error;
        });
    }
    createContract() {
        this.props.navigation.navigate('ContractList', { address: this.state.address, username: this.state.username });
    }
    render() {
        let accountInfo = JSON.stringify(this.state.accountInfo);
        console.log('render', accountInfo);
        return (React.createElement(View, { style: styles.view },
            this.state.isLoading &&
                React.createElement(View, { style: [styles.loadingContainer, styles.horizontal] },
                    React.createElement(ActivityIndicator, { size: "large", color: "#0000ff", animating: true, style: styles.loaderWheel })),
            !this.state.isLoading &&
                React.createElement(View, { style: styles.view },
                    React.createElement(Text, { style: styles.header },
                        " Welcome to STRATO Mobile ",
                        this.state.username,
                        "!"),
                    React.createElement(Text, { style: styles.header },
                        " Your Balance is ",
                        accountInfo,
                        " "),
                    React.createElement(Button, { onPress: () => { this.props.navigation.navigate('ContractBuilder'); }, title: 'Create a Contract' }))));
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
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
const styles = StyleSheet.create({
    mainView: {
        flex: 1
    },
    headerView: {
        flex: 1,
        position: 'relative',
        zIndex: 2
    },
    walletView: {
        backgroundColor: '#ffffff',
        padding: 0,
        flexDirection: 'column',
        borderBottomColor: 'rgba(44,55,71,0.3)',
        borderBottomWidth: 1,
        marginTop: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        height: '35%',
        width: '100%',
        zIndex: 1
    },
    view: {
        padding: 30,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    button: {
        backgroundColor: "rgba(92, 99,216, 1)",
        width: 300,
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5
    },
    containerPadding: {
        borderColor: '#333333',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 5,
        padding: 5,
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        height: '100%',
        zIndex: 1
    },
    walletContainer: {
        flex: 1,
        justifyContent: 'center',
        height: '100%',
        zIndex: 1
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 0
    },
    loaderWheel: {
        alignSelf: 'center',
    },
});
//# sourceMappingURL=Wallet.js.map