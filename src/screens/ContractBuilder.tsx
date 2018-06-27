import React, { Component } from 'react';
import { View, StyleSheet, Text, AsyncStorage } from 'react-native';
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
    isLoading: boolean,
    username: string,
    address: string,
    password: string, 
    contractAddress: string,
    location: string,
    contractSource: string,
    hash: string,
    status: string,
    contractEscrow: string,
    contractMultiSig: string,
}

export class Confirmation extends Component<IProps, IState> {
  constructor(props: IProps){
    super(props);

    this.state = {
        isLoading: false,
        address: '',
        contractAddress: '',
        location: '',
        contractSource: '',
        contractEscrow: '',
        contractMultiSig: '',
        hash: '',
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
      //let address = AsyncStorage.getItem('address');
      //console.log('got address from storage', address)
    }

    createMultiSigContract() {
      this.setState({contractSource: 'contract source for multisig'})
    }

    createEscrowContract() { // user can select contract from drop down options
      //this.compileContract();
      this.compileContract();
    }

    async compileContract(){
      this.setState({isLoading: true});
      let address = await AsyncStorage.getItem(`${this.state.username}`) 
      let response = address.replace(/^"(.*)"$/, '$1');
      await this.setState({address: response});
      console.log('address from async storage', this.state.address);
      console.log('compiling contract...')
      const src = 
      `pragma solidity ^0.4.8;


      contract SupplyChain {
          uint m_uuid;
          string m_location;
          uint m_timestamp;
      
      
          function SupplyChain(uint uuid, string location) public {
              m_timestamp = now;
              m_uuid = uuid;
              m_location = location;
          }
      
          function addItem(uint uuid, string location) public returns (uint) {
              m_timestamp = now;
              m_uuid = uuid;
              m_location = location;
          }
      
          function scanItem(uint uuid, string location) public returns (bool success) {
              m_timestamp = now;
              m_uuid = uuid;
              m_location = location;
              return true;
          }
      
          function getLocation(uint uuid) public returns (string) {
              return m_location;
          }
          
          function getItemInfo(uint uuid) public returns (string) {
              return m_location;
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
      //const location = this.state.location;
      const args = {
        uuid: '12345',
        location: this.state.location
      }
      const RequestBody = { password, src, args }
      console.log('got address from storage for user:', this.state.username, '--->', this.state.address);

      await fetch(blocURL + username + '/' + this.state.address + '/contract?resolve', {
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
          isLoading: false,
          status: json.status,
          hash: json.hash,
        });
        this.props.navigation.navigate('Confirmation', {status: this.state.status, hash: this.state.hash})
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
            <Text style={styles.header}> Add Product </Text>
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
                placeholder='Origin Location'
                leftIcon={
                  <Icon
                    name='info'
                    size={20}
                    color='#333333'
                  />
                }
    
                containerStyle={styles.inputPadding}
                onChangeText={(location) => this.setState({location})}
                value={this.state.location}
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
                loading={this.state.isLoading}
                disabled={this.state.isLoading}
                loadingStyle={styles.loading}
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
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    },
    loading: {
      alignSelf: 'center',
      width: 300,
      height: 50,
    },
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
      padding: 15,
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
  
  