import React, { Component } from 'react';
import { View, AsyncStorage, StyleSheet, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-easy-toast';// import * as HttpStatus from 'http-status-codes';

// import Logger from '../services/Logger';

import IStoreState from '../store/IStoreState';
import { connect, Dispatch } from 'react-redux';

// import { List, ListItem } from 'react-native-elements';

interface IProps {
    navigation: any,
}

interface IState {
    loading: boolean,
    username: string,
    address: string,
    password: string, 
    contractAddress: string,
    contractName: string,
    contractSource: string,
    codeHash: string,
    status: string,
    contractEscrow: string,
    contractMultiSig: string,
}

export class Confirmation extends Component<IProps, IState> {
  constructor(props: IProps){
    super(props);

    this.state = {
        loading: true,
        address: '',
        contractAddress: '',
        contractName: '',
        contractSource: '',
        contractEscrow: '',
        contractMultiSig: '',
        codeHash: '',
        status: '',
        username: this.props.navigation.getParam('username'),
        password: this.props.navigation.getParam('password'),
    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.compileContract = this.compileContract.bind(this);
    this.createEscrowContract = this.createEscrowContract.bind(this);
    //this.createMultiSigContract = this.createMultiSigContract.bind(this);
    }

    componentDidMount() {
      let address = AsyncStorage.getItem('address');
      console.log('got address from storage', address)
    }

    createMultiSigContract() {
      this.setState({contractSource: 'contract source for multisig'})
    }

    createEscrowContract() { // user can select contract from drop down options
      //this.compileContract();
      this.compileContract();
    }

    async compileContract(){
      const src = 
      `pragma solidity ^0.4.8;


      contract SupplyChain {
      
      
          struct Item {
              uint uuid;
              string location;
              uint timestamp; 
          }
          
          Item[] public itemIndex;
      
          mapping(uint => Item) public items;
      
          function addItem(uint uuid, string location, uint timestamp) public returns (uint) {
              timestamp = now;
              items[uuid] = Item(uuid, location, timestamp);
              itemIndex.push(Item(uuid, location, timestamp));
          }
      
          function scanItem(uint uuid, string location, uint timestamp) public returns (bool success) {
              timestamp = now;
              items[uuid].location = location;
              items[uuid].timestamp = timestamp;
              return true;
          }
      
          function getLocation(uint uuid) public returns (string) {
              return items[uuid].location;
          }
          
          function getItemInfo(uint uuid) public returns (uint, string, uint) {
              return (items[uuid].uuid, items[uuid].location, items[uuid].timestamp);
          } 
      
          function getItemCount() public constant returns(uint count) {
              return itemIndex.length;
          }
      }`;
      // const src = 
      // `contract ${this.state.contractName} {
      //   uint storedData;
      
      //   function SimpleStorage() {
      //     storedData = 1;
      //   }
      
      //   function set(uint x) {
      //     storedData = x;
      //   }
      
      //   function get() constant returns (uint) {
      //     return storedData;
      //   }
      // }`;
      const blocURL = 'http://localhost/bloc/v2.2/users/';
      const username = this.state.username;
      const password = this.state.password;
      const contractName = this.state.contractName;
      const RequestBody = { password, contractName, src }

      const address = await AsyncStorage.getItem('address');

      await fetch(blocURL + username + '/' + address + '/contract?resolve', {
        method: 'POST',
        body: JSON.stringify(RequestBody),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          contractName: json.contractName,
          address: json.address,
          codeHash: json.codeHash,
        });
        this.props.navigation.navigate('ContractDetail', {address: this.state.address})
      })
      .catch(function (error) {
        console.log('unable to create contract', error);
        console.log('req body', RequestBody);
        console.log('url attempted', blocURL + username + address + '/contract?resolve');
        throw error;
      });
  }


    render() {
      return (
        <View style={styles.view}>
          <View style={styles.loginCard}> 
            <Text style={styles.header}> Contract Builder </Text>
            <Input
                placeholder='Username'
                leftIcon={
                  <Icon
                    name='user'
                    size={20}
                    color='#333333'
                  />
                }
                containerStyle={styles.inputPadding}
                onChangeText={(username) => this.setState({username})}
                value={this.state.username}
                />

                {/* TODO: DROPDOWN WITH CONTRACT TYPES, SETS STATE FOR CONTRACT SOURCE */}
  
                <Input
                placeholder='Contract Name'
                leftIcon={
                  <Icon
                    name='info'
                    size={20}
                    color='#333333'
                  />
                }
    
                containerStyle={styles.inputPadding}
                onChangeText={(contractName) => this.setState({contractName})}
                value={this.state.contractName}
                />

               <Input
              placeholder='Password'
              leftIcon={
                <Icon
                  name='lock'
                  size={20}
                  color='#333333'
                />
              }
              secureTextEntry
  
              containerStyle={styles.inputPadding}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              />
              </View>
  
              <View>
              <Button containerStyle={styles.buttonSignup}
            icon={
              <Icon
                name='lock'
                size={20}
                color='white'
              />
            }
            onPress={this.createEscrowContract}
            title='DEPLOY CONTRACT'
        />
  
               
              <Toast ref="toast"
                  style={{backgroundColor:'#333333'}}
                  position='top'
                  positionValue={300}
                  fadeInDuration={750}
                  fadeOutDuration={1000}
                  opacity={0.8}
                  textStyle={{color:'white'}}
              />
  
              </View>
              {/* <View style={styles.signupCard}> 
              
                <Button containerStyle={styles.buttonSignup}
                    onPress={this.compileContract}
                    title='Deploy Contract'
                />
  
              </View> */}
           
          
        </View>
      )
    }
  };


 // @ts-ignore
 function mapStateToProps(state: IStoreState): IProps {
    // @ts-ignore
    return {
    };
  }
  
  
  // @ts-ignore
  function mapDispatchToProps(dispatch: Dispatch<IStoreState>) {
    return {
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);


  const styles = StyleSheet.create({
    view: {
      padding:10,
      height: '100%',
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#ffffff'
    },
    loginCard: {
      flex: 6,
      alignSelf: 'stretch',
  
    },
    signupCard: {
      flex: 1,
    },
    header:{
      marginTop: 12,
      fontSize: 22,
      alignSelf: 'center'
    },
    buttonSignup: {
      alignSelf: 'center',
      marginBottom: 30,
      width: 300,
      height: 45,
    },
    inputPadding:{
      marginTop: 20,
      marginLeft: 15
    },
    containerPadding: {
      borderColor:'#333333',
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderRadius: 5,
      padding: 5,
  
    }
  
    
  
  });
  
  