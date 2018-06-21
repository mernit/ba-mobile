import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { ListItem } from 'react-native-elements';

interface IProps {
    navigation: any,
}

interface IState {
  data: Array<any>,
}

export default class ContractList extends Component<IProps, IState> {
  constructor(props: IProps){
    super(props);
    this.state = {
      data: [],
    }
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
          data: json,
        });
        console.log('got contracts!', this.state.data)
      })
      .catch(function (error) {
        console.log('unable to get contracts', error);
        throw error;
      });
  }

  onTouchContract(contract: any) {
    let address = contract.address;
    console.log('got address', address)
    this.props.navigation.navigate('ContractItem', {address: address});
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
    console.log(this.state.data)
    return (
      <View>
        <FlatList
         data={this.state.data}
         renderItem={this.renderItem}
         keyExtractor={item => item.id}
        />

        {
          this.state.data.length == 0 &&
          <Text style={styles.null}>No contracts have been created yet</Text>
        }


     </View>
    )
  }
};

const styles = StyleSheet.create({
  contractListItem:{
    borderBottomWidth: 1,
    borderBottomColor:"rgba(51, 51, 51, 0.2)",
    minHeight: 80,
    maxHeight: 80
  },
  null: {
    fontSize: 22,
    marginTop: 25,
    alignSelf: 'center',
  }
});