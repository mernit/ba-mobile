import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon, Button, Card } from 'react-native-elements';

const HOST_URL = 'http://10.119.110.103';

interface IProps {
    navigation: any,
}

interface IState {
    username: string,
    password: string, 
    address: any,
    status: string,
    value: string,
    method: string,
    args: string,
    uuid: string,
    location: string,
    timestamp: any,
    currentLocation: any,
    userAddress: string,

}

export default class Contract extends Component<IProps, IState> {
  constructor(props: IProps){
    super(props);

    this.state = {
        uuid: '',
        address: this.props.navigation.getParam('address'),
        userAddress: this.props.navigation.getParam('userAddress'),
        status: '',
        value: '',
        method: '',
        args: '',
        location: '',
        timestamp: '',
        currentLocation: '',
        username: this.props.navigation.getParam('username'), // get uuid or address from camera
        password: this.props.navigation.getParam('password'),
    }

    this.componentWillMount = this.componentWillMount.bind(this);
    this.getState = this.getState.bind(this);
    }

    componentWillMount() {
      this.getState();
      // if(this.props.navigation.getParam('uuid')) {
      //   this.callContract();
      // }
      // else if(this.props.navigation.getParam('address') && this.props.navigation.getParam('uuid')) {
      //   this.getState();
      // }
  }

    getState() {
      const blocURL = HOST_URL + `/bloc/v2.2/contracts/SupplyChain/${this.state.address}/state`;
      fetch(blocURL, {
        method: 'GET',
      })
      .then(response => response.json())
      .then(json => {
        console.log(json.m_timestamp);
        this.setState({
          //location: json.itemIndex[0].location,
          //currentLocation: json.itemIndex.slice(-1)[0].location,
          timestamp: json.m_timestamp,
          location: json.m_location,
          uuid: json.m_uuid,
        });
      })
      .catch(function (error) {
        throw error;
      });
    }

    render() {
      let timestamp = new Date(this.state.timestamp * 1000).toString().slice(3, 25);
      console.log('timestamp', timestamp);
      return (
        <View style={styles.view}>
          <Card containerStyle={styles.card}>       
            <Text style={styles.title}>
            {this.state.timestamp? 'VERIFIED' : 'UNVERIFIED'}
            </Text>
            <Icon 
              iconStyle={styles.icon}
              name={this.state.timestamp ? 'check-circle' : 'info'}
              size={72}
              color={this.state.timestamp ? 'green' : 'orange'}
              />
            <Text style={styles.subtitle}>UUID</Text>
            <Text style={styles.location} numberOfLines={1}>{this.state.uuid ? this.state.uuid : 'UUID Unavailable'}</Text>
            <Text style={styles.subtitle}>Current Location</Text>
            <Text style={this.state.location ? styles.currentLocation : styles.location} numberOfLines={1}>{this.state.location ? this.state.location : 'Location Unavailable'}</Text>
            <Text style={styles.subtitle}>Timestamp</Text>
            <Text style={styles.hash} numberOfLines={1}>{this.state.timestamp ? timestamp : 'Timestamp Unavailable'}</Text>
              </Card>
                <Button 
                  icon={
                    <Icon
                      name='link'
                      size={25}
                      color='white'
                    />
                  }
                    containerStyle={styles.buttonSignup}
                    onPress={() => { this.props.navigation.navigate('Camera', {username: this.state.username, password: this.state.password, address: this.state.address, userAddress: this.state.userAddress}) } }
                    title='Check-In'
                />
  
              </View>
           
              )
        }
  };

  const styles = StyleSheet.create({
    view: {
      padding:10,
      flex: 1,
      alignItems: 'center',
    },
    icon: {
      padding: 15,
      alignSelf: 'center',
    },
    card: {
      flexDirection: 'column',
      height: '80%',
      width: '90%',
      borderRadius: 1,
      marginBottom: 30,
      borderColor: 'rgba(53,53,53,0.1)',
    },
    title: {
      marginTop: 20,
      alignSelf: 'center',
      fontSize: 36,
      padding: 15,
    },
    subtitle: {
      alignSelf: 'center',
      paddingTop: 20,
      fontSize: 14,
    },
    location: {
      alignSelf: 'center',
      padding: 15,
      fontSize: 22,
    },
    currentLocation: {
      alignSelf: 'center',
      padding: 5,
      fontSize: 22,
      color: 'black',
    },
    hash: {
      alignSelf: 'center',
      padding: 5,
      fontSize: 22,
    },
    loginCard: {
      flex: 6,
      alignSelf: 'stretch',
    },
    success: {
      alignSelf: 'center',
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
  
  