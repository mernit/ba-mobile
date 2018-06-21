import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
export class SideBar extends Component {
    constructor(props) {
        super(props);
        this.navigateToScreen = (route) => () => {
            const navigateAction = NavigationActions.navigate({
                routeName: route
            });
            this.props.navigation.dispatch(navigateAction);
        };
        this.state = {
            apexHash: [],
        };
        this.resetAction = NavigationActions.replace({ routeName: 'Map' });
        this.navigateToScreen = this.navigateToScreen.bind(this);
        this.resetNavigation = this.resetNavigation.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount() {
        fetch('http://localhost/apex-api/status', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: null,
        })
            .then(response => response.json())
            .then(json => {
            console.log('got apex status', json.lastBlock.hash);
            this.setState({
                apexHash: json.lastBlock.hash,
            });
        })
            .catch(function (error) {
            console.log('unable to get apex info', error);
            throw error;
        });
    }
    resetNavigation(route) {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: route }),
            ],
        });
        this.props.navigation.dispatch(resetAction);
    }
    render() {
        let apexHash = JSON.stringify(this.state.apexHash);
        return (React.createElement(View, { style: styles.view },
            React.createElement(ListItem
            // roundAvatar
            // avatar={{uri:l.avatar_url}}
            , { 
                // roundAvatar
                // avatar={{uri:l.avatar_url}}
                containerStyle: styles.navItem, key: 'Contracts', title: 'Contracts', leftIcon: { name: 'lock', color: "rgba(51, 51, 51, 0.8)" }, onPress: () => {
                    this.resetNavigation('ContractList');
                } }),
            React.createElement(ListItem, { containerStyle: styles.navItem, key: 'Wallet', title: 'Wallet', leftIcon: { name: 'fingerprint', color: "rgba(51, 51, 51, 0.8)" }, onPress: () => {
                    this.resetNavigation('Wallet');
                } }),
            React.createElement(ListItem, { containerStyle: styles.navItem, key: 'ContractBuilder', title: 'ContractBuilder', leftIcon: { name: 'description', color: "rgba(51, 51, 51, 0.8)" }, onPress: () => {
                    this.resetNavigation('ContractBuilder');
                } }),
            React.createElement(ListItem, { containerStyle: styles.navItem, key: 'ContractDetail', title: 'ContractDetail', leftIcon: { name: 'camera', color: "rgba(51, 51, 51, 0.8)" }, onPress: () => {
                    this.resetNavigation('ContractDetail');
                } }),
            React.createElement(Text, { style: styles.apexHeader }, "Node Stats"),
            React.createElement(Text, { style: styles.apex },
                "Hash: ",
                apexHash),
            "}"));
    }
}
;
export function mapStateToProps(state) {
    // @ts-ignore
    return {
        loggedIn: state.loggedIn
    };
}
// @ts-ignore
export function mapDispatchToProps(dispatch) {
    return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
const styles = StyleSheet.create({
    view: {
        marginTop: 20,
        flex: 1
    },
    apexHeader: {
        left: 20,
        paddingTop: 50,
        fontSize: 16,
        fontWeight: 'bold',
    },
    apex: {
        borderColor: 'black',
        fontSize: 10,
        color: 'green',
        padding: 20,
    },
    navItem: {
        borderBottomWidth: 1,
        paddingTop: 30,
        paddingBottom: 30,
        borderBottomColor: "rgba(51, 51, 51, 0.2)",
    }
});
//# sourceMappingURL=SideBar.js.map