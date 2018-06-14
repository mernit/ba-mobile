var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
// import Logger from '../services/Logger';
import ContractService from '../services/ContractService';
import { connect } from 'react-redux';
import { ContractListUpdatedActionCreator } from '../actions/ContractActions';
import { bindActionCreators } from 'redux';
export class ContractList extends Component {
    constructor(props) {
        super(props);
        this.renderItem = ({ item }) => (React.createElement(ListItem, { onPress: () => this.onTouchContract(item), containerStyle: styles.contractListItem, leftIcon: { name: 'place', color: "rgba(51, 51, 51, 0.8)" }, rightIcon: { name: 'chevron-right', color: "rgba(51, 51, 51, 0.8)" }, title: item.data.address }));
        this.gotNewContractList = this.gotNewContractList.bind(this);
        this.contractService = new ContractService({ contractListUpdated: this.gotNewContractList });
        this.contractService.StartMonitoring();
    }
    gotNewContractList(props) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.props.ContractListUpdated(props.contractList);
        });
    }
    onTouchContract(contract) {
        let address = contract.data.address;
        console.log('got address', address);
        this.props.navigation.navigate('ContractDetail', { address: address });
    }
    componentWillMount() {
        console.log('is it working?');
    }
    render() {
        return (React.createElement(View, null,
            React.createElement(FlatList, { data: this.props.contractList, renderItem: this.renderItem, keyExtractor: item => item.id })));
    }
}
;
// @ts-ignore
function mapStateToProps(state) {
    // @ts-ignore
    return {
        contractList: state.contractList
    };
}
// @ts-ignore
function mapDispatchToProps(dispatch) {
    return {
        ContractListUpdated: bindActionCreators(ContractListUpdatedActionCreator, dispatch),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ContractList);
const styles = StyleSheet.create({
    contractListItem: {
        borderBottomWidth: 1,
        borderBottomColor: "rgba(51, 51, 51, 0.2)",
        minHeight: 80,
        maxHeight: 80
    },
});
//# sourceMappingURL=ContractList.js.map