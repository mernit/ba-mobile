import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

// import Logger from '../services/Logger';

import ContractService, {IContractListUpdated } from '../services/ContractService'
import IStoreState from '../store/IStoreState';
import { connect, Dispatch } from 'react-redux';
import { ContractListUpdatedActionCreator } from '../actions/ContractActions';
import { bindActionCreators } from 'redux';

// import { List, ListItem } from 'react-native-elements';

interface IProps {
    navigation: any,
    ContractListUpdated: (contractList: Array<any>) => (dispatch: Dispatch<IStoreState>) => Promise<void>
    contractList: Array<any>
}

export class ContractList extends Component<IProps> {
  private contractService: ContractService;
  constructor(props: IProps){
    super(props);

    this.gotNewContractList = this.gotNewContractList.bind(this);
    this.contractService = new ContractService({contractListUpdated: this.gotNewContractList});
    this.contractService.StartMonitoring();
  }

  private async gotNewContractList(props: IContractListUpdated) {
    await this.props.ContractListUpdated(props.contractList);
  }

  onTouchContract(contract: any) {
    let address = contract.data.address;
    console.log('got address', address)
    this.props.navigation.navigate('ContractDetail', {address: address});
  }

  componentWillMount() {
    console.log('is it working?')
  }

  renderItem = ({item}) => (
    <ListItem
      onPress={() => this.onTouchContract(item)}
      containerStyle={styles.contractListItem}      
      leftIcon={{name: 'place', color: "rgba(51, 51, 51, 0.8)"}}
      rightIcon={{name: 'chevron-right', color: "rgba(51, 51, 51, 0.8)"}}
      title={item.data.address}      
      //subtitle={item.data.description}
    />
  );

  render() {
    return (
      <View>
        <FlatList
         data={this.props.contractList}
         renderItem={this.renderItem}
         keyExtractor={item => item.id}
        />
     </View>
    )
  }
};


// @ts-ignore
function mapStateToProps(state: IStoreState): IProps { 
  // @ts-ignore
  return {
    contractList: state.contractList
  };
}

// @ts-ignore
function mapDispatchToProps(dispatch: Dispatch<IStoreState>) {
  return {
    ContractListUpdated: bindActionCreators(ContractListUpdatedActionCreator, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContractList);


const styles = StyleSheet.create({
  contractListItem:{
    borderBottomWidth: 1,
    borderBottomColor:"rgba(51, 51, 51, 0.2)",
    minHeight: 80,
    maxHeight: 80
  },
});