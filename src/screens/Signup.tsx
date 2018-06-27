import React, { Component } from 'react';
import { View, StyleSheet, Text, AsyncStorage } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Card } from 'react-native-elements';

import IStoreState from '../store/IStoreState';
import { connect, Dispatch } from 'react-redux';


// @ts-ignore
import { bindActionCreators } from 'redux';

// import { UsernameChangedActionCreator } from '../actions/AuthActions';

import Toast from 'react-native-easy-toast';

interface IProps {
  navigation: any;
}

interface IState {
  isLoading: boolean,
  username: string,
  password: string,
  confirmPassword: string,
  createButtonDisabled: boolean,
  address: string,
  faucetSuccess: boolean
}

export class Signup extends Component<IProps, IState> {

  constructor(props: IProps){
    super(props);

    this.state = {
      isLoading: false,
      username: '',
      address: '',
      password: '',
      confirmPassword: '',
      faucetSuccess: false,
      createButtonDisabled: false
    };

    this.createUser = this.createUser.bind(this);
    this.validateSignup = this.validateSignup.bind(this);
    // this.faucet = this.faucet.bind(this);
  }

    createUser(){
      this.setState({createButtonDisabled: true, isLoading: true});
      let password = this.state.password;
      fetch('http://localhost/bloc/v2.2/users/' + this.state.username, {
        method: 'POST',
        body: JSON.stringify(password),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          address: json,
          isLoading: false,
        });
        AsyncStorage.setItem(`${this.state.username}`, JSON.stringify(this.state.address));
        console.log('stored username', AsyncStorage.getItem(`${this.state.username}`));
        console.log('stored address', AsyncStorage.getItem(`${this.state.address}`));
        this.props.navigation.navigate('ContractList', {address: this.state.address, faucetAccount: true})
        //this.faucet()
      })
      .catch(function (error) {
        console.log('unable to create user', error);
        throw error;
      });
  }

  //   faucet() {
  //     fetch('http://tdlwv3y2cp.eastus2.cloudapp.azure.com/strato-api/eth/v1.2/faucet', {
  //       method: 'POST',
  //       body: `address=${this.state.address}`,
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       },
  //     })
  //     .then(function (response) {
  //       console.log('fauceted account', response);
  //       return response;
  //     })
  //     .catch(function (error) {
  //       console.log('unable to faucet account', error);
  //       throw error;
  //     })
  // }
  
  //   if(this.state.password != this.state.confirmPassword){
  //     this.validateSignup({code:'PasswordsDoNotMatch'}, null);
  //     return;
  //   }
  // }

  async validateSignup(err,  result){
    var err_msg = '';

    if (err) {
      console.log(err);
      switch(err.code){
        case 'NetworkingError': 
          err_msg = 'Unable to connect to server.';
          break;
        case 'UsernameExistsException':
          err_msg = 'That username is taken.';
          break;
        case 'InvalidPasswordException':
          err_msg = 'Passwords must contain at least 1 uppercase letter and 1 number.';
          break;
        case 'PasswordsDoNotMatch':
          err_msg = 'Passwords do not match.';
          break;
        default: 
          err_msg = 'Unhandled error: ' + err.code
      }
   }
    else{
      console.log(result);
      this.setState({createButtonDisabled: false});
      this.props.navigation.navigate('Confirmation', {username: this.state.username});
    }

    if(err_msg != ''){
      // @ts-ignore
      this.refs.toast.show(err_msg);
      this.setState({createButtonDisabled: false});
      return;
    }
  }

  render() {
    return (
      <View style={styles.view}>
       <Text style={styles.header}>Create Account </Text>
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
            //@ts-ignore
            // inputContainerStyle={styles.containerPadding}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            />

          <Input
            placeholder='Confirm Password'
            leftIcon={
              <Icon
                name='lock'
                size={20}
                color='#333333'
              />
            }
            secureTextEntry
            containerStyle={styles.inputPadding}
            onChangeText={(confirmPassword) => this.setState({confirmPassword})}
            value={this.state.confirmPassword} 

          />
      
          <Button 
                  onPress={this.createUser}
                  title='Create Account'
                  loading={this.state.isLoading}
                  loadingStyle={styles.loading}
                  disabled={this.state.createButtonDisabled}
                  buttonStyle={styles.button}
                  containerStyle={
                    {marginTop: 20, marginBottom:20}
                  }
          />

          </Card>

          <Toast ref="toast"
            style={{backgroundColor:'#333333'}}
            position='bottom'
            positionValue={225}
            fadeInDuration={750}
            fadeOutDuration={1000}
            opacity={0.8}
            textStyle={{color:'white'}}
          />

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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

// define styles
const styles = StyleSheet.create({
  loginCard: {
  },
  loading: {
    alignSelf: 'center',
    width: 300,
    height: 50,
  },
  header:{
    fontSize: 22
  },
  view: {
    padding: 30,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },

  button: {
    backgroundColor: "rgba(92, 99,216, 1)",
    width: 300,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
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
