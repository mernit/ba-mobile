import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
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
            data: [],
        };
    }
    componentDidMount() {
        this.getContracts();
    }
    getContracts() {
        console.log('getting contract list...');
        const blocURL = 'http://localhost/bloc/v2.2/contracts/';
        fetch(blocURL, {
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
    }
    onTouchContract(contract) {
        let address = contract.address;
        console.log('got address', address);
        this.props.navigation.navigate('Contract', { address: address });
    }
    render() {
        console.log(this.state.data);
        return (React.createElement(View, { style: styles.view },
            React.createElement(Text, { style: styles.header }, "My Packages"),
            React.createElement(FlatList, { data: this.state.data, renderItem: this.renderItem, keyExtractor: item => item.id }),
            React.createElement(Button, { containerStyle: styles.buttonSignup, icon: React.createElement(Icon, { name: 'plus', size: 15, color: 'white' }), onPress: () => { this.props.navigation.navigate('ContractBuilder'); }, title: 'ADD NEW PACKAGE' }),
            this.state.data.length == 0 &&
                React.createElement(Text, { style: styles.null }, "No contracts have been created yet")));
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