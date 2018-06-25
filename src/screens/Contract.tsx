import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon, Button, Card } from 'react-native-elements';

interface IProps {
    navigation: any,
}

interface IState {
    loading: boolean,
    username: string,
    password: string, 
    contractAddress: string,
    contractName: string,
    address: any,
    storedData: string,
    status: string,
    value: string,
    method: string,
    args: string,
    location: string,
    timestamp: string,
    response: any,
    stateResponse: Array<any>,
    currentLocation: any,

}

export default class Contract extends Component<IProps, IState> {
  constructor(props: IProps){
    super(props);

    this.state = {
        stateResponse: [],
        loading: true,
        storedData: '',
        address: this.props.navigation.getParam('address'),
        contractAddress: '',
        contractName: '',
        status: '',
        value: '',
        method: '',
        args: '',
        location: '',
        timestamp: '',
        response: [],
        currentLocation: '',
        username: this.props.navigation.getParam('username'), // get uuid or address from camera
        password: this.props.navigation.getParam('password'),
    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.callContract = this.callContract.bind(this);
    this.getState = this.getState.bind(this);
    }

    componentWillMount() {
      this.getState();
      // this.callContract();

      // GET CONTRACT STATE VARIABLES 

      // USER CAN MODIFY STATE VARIABLES IN INPUT FIELDS

      // CALL CONTRACT AND PUSH UPDATED STATE VARIABLES

    }

  // CALL CONTRACT 

  callContract() {
    const blocURL = 'http://localhost/bloc/v2.2/users/';
    const username = 'Zabar';
    const password = "1234";
    const methodName = 'scanItem';
    const address = '87168271eb89f6d0282725681f7b724bde31c4f0';
    const contractAddress = 'b823216ffb44fcea8eb4e2a53d7275eee8435aef';
    const callArgs = {
      location: 'riverdale',
      uuid: '123456789',
      timestamp: '1142',
    };
    
    fetch(blocURL + username + '/' + address + '/contract/SupplyChain/' + contractAddress + '/call?resolve', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: password,
        method: methodName,
        value: "0",
        args: callArgs
      })
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      this.setState({
        status: json.data.contents[1],
      });
    })
    .catch(function (error) {
      throw error;
    });
}

getState() {
  const blocURL = `http://localhost/bloc/v2.2/contracts/SupplyChain/${this.state.address}/state?name=itemIndex`;
  fetch(blocURL, {
    method: 'GET',
  })
  .then(response => response.json())
  .then(json => {
    console.log(json);
    this.setState({
      location: json.itemIndex[0].location,
      currentLocation: json.itemIndex.slice(-1)[0].location,
      timestamp: json.itemIndex[0].timestamp,
    });
  })
  .catch(function (error) {
    throw error;
  });
}

  // END CALL CONTRACT

    render() {
      return (
        <View style={styles.view}>
          <Card containerStyle={styles.card}>
          
          
            <Text style={styles.title}>VERIFIED</Text>
              <Icon 
                iconStyle={styles.icon}
                name='check-circle'
                size={72}
                color='#00aced' 
                />
            <Text style={styles.subtitle}>Origin Location</Text>
            <Text style={styles.location}>{this.state.location}</Text>
            <Text style={styles.subtitle}>Current Location</Text>
            <Text style={styles.currentLocation}>{this.state.currentLocation}</Text>
            <Text style={styles.subtitle}>Timestamp</Text>
            <Text style={styles.hash}>{this.state.timestamp}</Text>

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
                    onPress={() => { this.props.navigation.navigate('Camera') } }
                    title='CHECK-IN'
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


  const styles = StyleSheet.create({
    view: {
      padding:10,
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#ffffff'
    },
    icon: {
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
      alignSelf: 'center',
      fontSize: 36,
      paddingTop: 20,
      paddingBottom: 20,
    },
    subtitle: {
      alignSelf: 'center',
      paddingTop: 30,
      fontSize: 14,
    },
    location: {
      alignSelf: 'center',
      padding: 10,
      fontSize: 22,
    },
    currentLocation: {
      alignSelf: 'center',
      padding: 10,
      fontSize: 22,
      color: 'blue',

    },
    hash: {
      alignSelf: 'center',
      padding: 10,
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
  
  