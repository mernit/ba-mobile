import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
const HOST_URL = 'http://10.119.110.103';
export default class SideBar extends Component {
    constructor(props) {
        super(props);
        this.navigateToScreen = (route) => () => {
            const navigateAction = NavigationActions.navigate({
                routeName: route
            });
            this.props.navigation.dispatch(navigateAction);
        };
        this.state = {
            apexHash: '',
            blockNumber: '',
            difficulty: '',
            nonce: '',
            isVisible: false,
        };
        this.resetAction = NavigationActions.replace({ routeName: 'Map' });
        this.navigateToScreen = this.navigateToScreen.bind(this);
        this.resetNavigation = this.resetNavigation.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
    }
    componentWillMount() {
        fetch(HOST_URL + '/apex-api/status', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: null,
        })
            .then(response => response.json())
            .then(json => {
            console.log('got apex status', json.lastBlock.hash, json.lastBlock.number);
            this.setState({
                apexHash: json.lastBlock.hash,
                blockNumber: json.lastBlock.number,
                difficulty: json.lastBlock.totalDifficulty,
                nonce: json.lastBlock.nonce,
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
        return (React.createElement(View, { style: styles.view },
            React.createElement(ListItem
            // roundAvatar
            // avatar={{uri:l.avatar_url}}
            , { 
                // roundAvatar
                // avatar={{uri:l.avatar_url}}
                containerStyle: styles.navItem, key: 'Signup', title: 'Account', leftIcon: { name: 'person', color: "rgba(51, 51, 51, 0.8)" }, onPress: () => {
                    this.resetNavigation('Signup');
                } }),
            React.createElement(ListItem
            // roundAvatar
            // avatar={{uri:l.avatar_url}}
            , { 
                // roundAvatar
                // avatar={{uri:l.avatar_url}}
                containerStyle: styles.navItem, key: 'Contracts', title: 'Packages', leftIcon: { name: 'reorder', color: "rgba(51, 51, 51, 0.8)" }, onPress: () => {
                    this.resetNavigation('ContractList');
                } }),
            React.createElement(ListItem, { containerStyle: styles.navItem, key: 'ContractBuilder', title: 'Add Package', leftIcon: { name: 'open-in-new', color: "rgba(51, 51, 51, 0.8)" }, onPress: () => {
                    this.resetNavigation('ContractBuilder');
                } }),
            React.createElement(ListItem, { title: 'Node Status', 
                //titleStyle={styles.title}
                containerStyle: styles.navStatusItem, onPress: () => {
                    this.state.isVisible ?
                        this.setState({ isVisible: false }) :
                        this.setState({ isVisible: true });
                }, leftIcon: { name: 'wifi', color: "rgba(50,205,50)" }, 
                // title={
                //   <Text style={styles.apexHeader}>Node {this.state.apexHash ? 'Online' : 'Offline'}
                //   </Text> 
                // }
                subtitle: this.state.isVisible &&
                    React.createElement(View, null,
                        React.createElement(Text, { style: styles.blockNumber }, this.state.blockNumber),
                        React.createElement(Text, { style: styles.subStatus }, "Block Number"),
                        React.createElement(Text, { style: styles.blockNumber }, this.state.difficulty),
                        React.createElement(Text, { style: styles.subStatus }, "Total Difficulty"),
                        React.createElement(Text, { style: styles.blockNumber }, this.state.nonce),
                        React.createElement(Text, { style: styles.subStatus }, "Nonce"),
                        React.createElement(Text, { numberOfLines: 1, ellipsizeMode: 'tail', style: styles.blockNumber }, this.state.apexHash),
                        React.createElement(Text, { style: styles.subStatus }, "Hash")) }),
            React.createElement(Text, { style: styles.poweredBy }, "Powered by BlockApps STRATO")));
    }
}
;
const styles = StyleSheet.create({
    view: {
        marginTop: 20,
        flex: 1,
    },
    apexHeader: {
        fontSize: 16,
        padding: 5,
    },
    navItem: {
        //backgroundColor: '#394b59',
        borderBottomWidth: 1,
        paddingTop: 30,
        paddingBottom: 30,
        borderBottomColor: "rgba(51, 51, 51, 0.2)",
    },
    navStatusItem: {
        //backgroundColor: '#394b59',
        borderBottomWidth: 1,
        paddingTop: 30,
        paddingBottom: 30,
        borderBottomColor: "rgba(51, 51, 51, 0.2)",
    },
    status: {
        paddingTop: 5,
    },
    subStatus: {
        paddingTop: 5,
        color: 'gray',
        fontSize: 10,
    },
    blockNumber: {
        width: '75%',
        fontWeight: 'normal',
        paddingTop: 20,
    },
    poweredBy: {
        alignSelf: 'center',
        bottom: 5,
        position: 'absolute',
        padding: 20,
    }
});
//# sourceMappingURL=SideBar.js.map