import React, { Component } from 'react';
import { View, AsyncStorage, ActivityIndicator, StyleSheet, Text } from 'react-native';

interface IProps{
  loggedIn: boolean;
}

interface IState{
  isLoading: boolean;
  userInfo: any;
}

export default class Wallet extends Component<IProps, IState> {
  constructor(props: IProps){
    super(props);

    this.state = {
      isLoading: true,
      userInfo: {}
    }

    this.loadWallet = this.loadWallet.bind(this);
    this.loadWallet();
  }

  async loadWallet(){
    if(this.props.loggedIn){
      let userInfo = await AsyncStorage.getItem('userInfo');
      await this.setState({isLoading: false, userInfo: userInfo});
      console.log('USER INFO');
      console.log(this.state.userInfo);
    }
  }


  render() {
    return (
      <View style={styles.mainView}>
      
      { this.state.isLoading &&
        <View style={[styles.loadingContainer, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" animating={true} style={styles.loaderWheel}/>
        </View>
      }

      { !this.state.isLoading &&
        <View style={styles.walletContainer}>
            <Text> Wallet address {this.state.userInfo } </Text>
        </View>
      }
    </View>
    )
  }
};



const styles = StyleSheet.create({
  mainView: {
    flex: 1
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    zIndex: 1
  },
  walletContainer: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    zIndex: 1
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 0
  },
  loaderWheel: {
    alignSelf: 'center',
  }
});