var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { View, StyleSheet, Text, AsyncStorage } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-easy-toast'; // import * as HttpStatus from 'http-status-codes';
import Geocoder from 'react-native-geocoder';
import { connect } from 'react-redux';
export class Confirmation extends Component {
    constructor(props) {
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
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.compileContract = this.compileContract.bind(this);
        this.getUserLocation = this.getUserLocation.bind(this);
        this.createEscrowContract = this.createEscrowContract.bind(this);
        //this.createMultiSigContract = this.createMultiSigContract.bind(this);
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
            console.log(this.state.lat, this.state.lng);
            this.getUserLocation();
        });
    }
    ;
    //let address = AsyncStorage.getItem('address');
    //console.log('got address from storage', address)
    getUserLocation() {
        return __awaiter(this, void 0, void 0, function* () {
            const position = { lat: this.state.lat, lng: this.state.lng };
            console.log('got position', position);
            const response = yield Geocoder.geocodePosition(position);
            console.log('got response from geocoder', response[0].locality);
            this.setState({ location: response[0].locality });
        });
    }
    createEscrowContract() {
        // TODO: user can select contract from drop down options
        this.compileContract();
    }
    compileContract() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setState({ isLoading: true });
            let address = yield AsyncStorage.getItem(`${this.state.username}`);
            let response = address.replace(/^"(.*)"$/, '$1');
            yield this.setState({ address: response });
            console.log('address from async storage', this.state.address);
            console.log('compiling contract...');
            const src = `pragma solidity ^0.4.8;


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
            const blocURL = 'http://10.119.106.130/bloc/v2.2/users/';
            const username = this.state.username;
            const password = this.state.password;
            const uuid = Math.random().toString().slice(2, 11);
            console.log('uuid', uuid);
            //const location = this.state.location;
            const args = {
                uuid: uuid,
                location: this.state.location
            };
            const RequestBody = { password, src, args };
            console.log('got address from storage for user:', this.state.username, '--->', this.state.address);
            yield fetch(blocURL + username + '/' + this.state.address + '/contract?resolve', {
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
                this.props.navigation.navigate('Confirmation', { status: this.state.status, hash: this.state.hash });
            })
                .catch(function (error) {
                console.log('unable to create contract', error);
                console.log('req body', RequestBody);
                console.log('url attempted', blocURL + username + address + '/contract?resolve');
                throw error;
            });
        });
    }
    render() {
        return (React.createElement(View, { style: styles.view },
            React.createElement(View, { style: styles.loginCard },
                React.createElement(Text, { style: styles.header }, " Add Package "),
                React.createElement(Card, { containerStyle: styles.loginCard },
                    React.createElement(Input, { placeholder: 'Username', leftIcon: React.createElement(Icon, { name: 'user', size: 20, color: '#333333' }), containerStyle: styles.inputPadding, onChangeText: (username) => this.setState({ username }), value: this.state.username }),
                    React.createElement(Input, { placeholder: 'Origin Location', leftIcon: React.createElement(Icon, { name: 'map-pin', size: 20, color: '#333333' }), containerStyle: styles.inputPadding, 
                        //onChangeText={(location) => this.setState({location})}
                        value: this.state.location }),
                    React.createElement(Input, { placeholder: 'Password', leftIcon: React.createElement(Icon, { name: 'lock', size: 20, color: '#333333' }), secureTextEntry: true, containerStyle: styles.inputPadding, onChangeText: (password) => this.setState({ password }), value: this.state.password }),
                    React.createElement(Button, { containerStyle: styles.buttonSignup, icon: React.createElement(Icon, { name: 'lock', size: 20, color: 'white' }), onPress: this.createEscrowContract, title: 'Deploy Contract', loading: this.state.isLoading, disabled: this.state.isLoading, loadingStyle: styles.loading }),
                    React.createElement(Toast, { ref: "toast", style: { backgroundColor: '#333333' }, position: 'top', positionValue: 300, fadeInDuration: 750, fadeOutDuration: 1000, opacity: 0.8, textStyle: { color: 'white' } })))));
    }
}
;
// @ts-ignore
function mapStateToProps(state) {
    // @ts-ignore
    return {};
}
// @ts-ignore
function mapDispatchToProps(dispatch) {
    return {};
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
        padding: 20,
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
    header: {
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
    inputPadding: {
        marginTop: 20,
        marginLeft: 15
    },
    containerPadding: {
        borderColor: '#333333',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 5,
        padding: 5,
    }
});
//# sourceMappingURL=ContractBuilder.js.map