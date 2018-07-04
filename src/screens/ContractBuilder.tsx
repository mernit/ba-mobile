import React, { Component } from 'react';
import { View, StyleSheet, Text, AsyncStorage } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-easy-toast';
import Geocoder from 'react-native-geocoder';

const HOST_URL = 'http://10.119.110.103';

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
    region: any,
    lat: any,
    lng: any,
    error: any,
    userLocation: Array<any>
  }

export default class Confirmation extends Component<IProps, IState> {
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
        region: '',
        status: '',
        username: this.props.navigation.getParam('username'),
        password: this.props.navigation.getParam('password'),
        lat: null,
        lng: null,
        error: null,
        userLocation: [],
    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.compileContract = this.compileContract.bind(this);
    this.getUserLocation = this.getUserLocation.bind(this);
    this.createEscrowContract = this.createEscrowContract.bind(this);
    //this.createMultiSigContract = this.createMultiSigContract.bind(this);
    }

    componentDidMount() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
          });
          console.log(this.state.lat, this.state.lng);
          this.getUserLocation();
        });
      };
    
    async getUserLocation() {
      const position = {lat: this.state.lat, lng: this.state.lng}
      console.log('got position', position)
      const response = await Geocoder.geocodePosition(position);
      console.log('got response from geocoder', response[0])
      this.setState({location: response[0].formattedAddress})
    }
    catch(error) {
      console.log('could not get user location', error);
    }

    createEscrowContract() { 
      // TODO: user can select contract from drop down options
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
      const blocURL = HOST_URL + '/bloc/v2.2/users/';
      const username = this.state.username;
      const password = this.state.password;
      const uuid = Math.random().toString().slice(2,11);
      console.log('uuid', uuid)
      //const location = this.state.location;
      const args = {
        uuid: uuid,
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
        this.props.navigation.navigate('Confirmation', {location: this.state.location, status: this.state.status, hash: this.state.hash})
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

            <Text style={styles.header}> Add Package </Text>
            
            <Card containerStyle={styles.loginCard}>

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
                    name='map-pin'
                    size={20}
                    color='#333333'
                  />
                }
    
                containerStyle={styles.inputPadding}
                //onChangeText={(location) => this.setState({location})}
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
  

            <Button containerStyle={styles.buttonSignup}
              icon={
                <Icon
                  name='lock'
                  size={20}
                  color='white'
                />
                }
                onPress={this.createEscrowContract}
                title='Deploy Contract'
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
              </Card>
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
      padding:20,
      flex: 1,
      alignItems: 'center',
    },
    loginCard: {
      flex: 1,
      alignSelf: 'center',
      width: '100%',
      marginBottom: 90,
    },
    signupCard: {
      flex: 1,
    },
    header:{
      padding: 50,

      fontSize: 22,
      alignSelf: 'center'
    },
    buttonSignup: {
      alignSelf: 'center',
      marginTop: 30,
      width: 300,
      height: 105,
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
  
  