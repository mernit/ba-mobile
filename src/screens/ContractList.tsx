import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const HOST_URL = 'http://192.168.1.167';


interface IProps {
    navigation: any,
}

interface IState {
  data: Array<any>,
  isLoading: boolean,
  address: string,
  faucetAccount: boolean,
  username: string,
  password: string
  timestamp: any,
}

export default class ContractList extends Component<IProps, IState> {
  constructor(props: IProps){
    super(props);
    this.state = {
      username: this.props.navigation.getParam('username'),
      password: this.props.navigation.getParam('password'),
      timestamp: '',
      isLoading: false,
      address: this.props.navigation.getParam('address'),
      data: [],
      faucetAccount: this.props.navigation.getParam('faucetAccount')
    }
  }

  componentDidMount() {
    this.getContracts();
    // return AsyncStorage.getItem(`${this.state.username}`)
    // .then(req => JSON.parse(req))
    // .then(json => this.setState({username: json}))
    // console.log('got json back from async storage', this.state.username);
    //console.log('user saved in storage', AsyncStorage.getItem(`${this.state.username}`));
    
  }

  async faucet() {
    await fetch(HOST_URL + '/strato-api/eth/v1.2/faucet', {
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
    })
}

  async getContracts() {
    if(this.state.faucetAccount) {
      await this.faucet();
      console.log('turning on the faucet for', this.state.address);
    }
      console.log('getting contract list...');

      const blocURL = HOST_URL + '/bloc/v2.2/contracts/';
      await fetch(blocURL, {
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
          timestamp: new Date(json.SupplyChain.createdAt * 1000).toString().slice(3, 25),
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
    this.props.navigation.navigate('Contract', {username: this.state.username, password: this.state.password, address: address, userAddress: this.state.address});
  }


  renderItem = ({item}) => (
    <ListItem 
      onPress={() => this.onTouchContract(item)}
      containerStyle={styles.contractListItem}      
      rightIcon={{name: 'chevron-right', color: "rgba(51, 51, 51, 0.8)"}}
      title={
        <Text numberOfLines={1} ellipsizeMode={'head'} style={styles.addressText}>{item.address}</Text>  
      }
      // badge={{ value: 3, textStyle: { color: 'white' }, containerStyle: { marginTop: -20 } }}
      subtitle={
        <View style={styles.subtitleView}>
          <Text style={styles.ratingText}>Last Updated: {new Date(item.createdAt * 1000).toString().slice(3, 15)}</Text>
        </View>
      }
    />
  );

  render() {
    //let timestamp = new Date(this.state.timestamp * 1000).toString();
    console.log(this.state.data)
    return (
      <View style={styles.view}>
        <Text style={styles.header}>My Packages</Text>

        {
          this.state.isLoading &&
          <ActivityIndicator />
        }

        {
          this.state.data.length == 0 &&
          <Text style={styles.null}>No packages have been created yet</Text>
        }

        <FlatList
         data={this.state.data}
         renderItem={this.renderItem}
         keyExtractor={item => item.address}
         refreshing={this.state.isLoading}
         onRefresh={() => this.getContracts()}
        />

        <View style={styles.buttonContainer}>
          <Button containerStyle={styles.buttonSignup}
            icon={
              <Icon
                name='plus'
                size={15}
                color='white'
              />
            }
            onPress={() => { this.props.navigation.navigate('ContractBuilder') } }
            title='Add Package'
        />
        </View>

     </View>
    )
  }
};

const styles = StyleSheet.create({
  view: {
    height: '90%',
  },
  contractListItem:{
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor:"rgba(51, 51, 51, 0.2)",
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
  subtitleView: {

  },
  addressText:{

  },
  ratingText: {
    color: 'gray',
    paddingTop: 5,
  },
  buttonSignup: {
    alignSelf: 'center',
    position: 'absolute',
    top: 60,
    padding: 15,
    width: 400,
    height: 75,
  },
  buttonContainer: {
    height: 50,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 10,
  },
});