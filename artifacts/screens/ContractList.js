var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class ContractList extends Component {
    constructor(props) {
        super(props);
        this.renderItem = ({ item }) => (React.createElement(ListItem, { onPress: () => this.onTouchContract(item), containerStyle: styles.contractListItem, rightIcon: { name: 'chevron-right', color: "rgba(51, 51, 51, 0.8)" }, title: item.address, 
            // badge={{ value: 3, textStyle: { color: 'white' }, containerStyle: { marginTop: -20 } }}
            subtitle: React.createElement(View, { style: styles.subtitleView },
                React.createElement(Text, { style: styles.ratingText },
                    "Last Updated: ",
                    item.createdAt)) }));
        this.state = {
            username: '',
            isLoading: false,
            address: this.props.navigation.getParam('address'),
            data: [],
            faucetAccount: this.props.navigation.getParam('faucetAccount')
        };
    }
    componentDidMount() {
        this.getContracts();
        // return AsyncStorage.getItem(`${this.state.username}`)
        // .then(req => JSON.parse(req))
        // .then(json => this.setState({username: json}))
        // console.log('got json back from async storage', this.state.username);
        //console.log('user saved in storage', AsyncStorage.getItem(`${this.state.username}`));
    }
    faucet() {
        return __awaiter(this, void 0, void 0, function* () {
            yield fetch('http://localhost/strato-api/eth/v1.2/faucet', {
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
                console.log('unable to faucet account', error);
                throw error;
            });
        });
    }
    getContracts() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.state.faucetAccount) {
                yield this.faucet();
                console.log('turning on the faucet for', this.state.address);
            }
            console.log('getting contract list...');
            const blocURL = 'http://localhost/bloc/v2.2/contracts/';
            yield fetch(blocURL, {
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
                    data: json.SupplyChain,
                });
                console.log('got contracts!', this.state.data);
            })
                .catch(function (error) {
                console.log('unable to get contracts', error);
                throw error;
            });
        });
    }
    onTouchContract(contract) {
        let address = contract.address;
        console.log('got address', address);
        this.props.navigation.navigate('Contract', { address: address, userAddress: this.state.address });
    }
    render() {
        console.log(this.state.data);
        return (React.createElement(View, { style: styles.view },
            React.createElement(Text, { style: styles.header }, "My Packages"),
            this.state.isLoading &&
                React.createElement(ActivityIndicator, null),
            this.state.data.length == 0 &&
                React.createElement(Text, { style: styles.null }, "No packages have been created yet"),
            React.createElement(FlatList, { data: this.state.data, renderItem: this.renderItem, keyExtractor: item => item.id, refreshing: this.state.isLoading, onRefresh: () => this.getContracts() }),
            React.createElement(Button, { containerStyle: styles.buttonSignup, icon: React.createElement(Icon, { name: 'plus', size: 15, color: 'white' }), onPress: () => { this.props.navigation.navigate('ContractBuilder'); }, title: 'ADD NEW PACKAGE' })));
    }
}
;
const styles = StyleSheet.create({
    view: {
        height: '100%',
    },
    contractListItem: {
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(51, 51, 51, 0.2)",
        minHeight: 50,
        maxHeight: 80,
    },
    header: {
        fontSize: 22,
        alignSelf: 'center',
        padding: 30,
    },
    null: {
        fontSize: 22,
        marginTop: 25,
        alignSelf: 'center',
    },
    subtitleView: {},
    ratingText: {
        paddingTop: 5,
    },
    buttonSignup: {
        alignSelf: 'center',
        position: 'relative',
        marginBottom: 30,
        width: 300,
        height: 45,
    },
});
//# sourceMappingURL=ContractList.js.map