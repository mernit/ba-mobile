import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { Overlay } from 'react-native-elements'

interface IProps{
}

export default class Loading extends Component<IProps> {
  
  render() {
    return (
      <View style={styles.mainView}>
        <Overlay
        overlayStyle={styles.overlay}
        isVisible={true}
        windowBackgroundColor="rgba(255, 255, 255, 0.6)" // the last number is opacity
        overlayBackgroundColor="grey"
        width="auto"
        height="auto"
        >
        <ActivityIndicator style={styles.indicator} size="large" color="white" animating={true}/>
        <Text style={styles.loadingText}>This might take a moment...</Text>
        </Overlay>
        
    </View>
    )
  }
};

const styles = StyleSheet.create({
  mainView: {
    justifyContent: 'center',
    alignContent: 'center',
    zIndex: 5,
  },
  overlay: {
    marginTop: -100,
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 50,
    borderRadius: 10,
    borderColor: 'rgba(44,55,71,0.1)',
    borderWidth: 1,
    width: '80%',
    height: '40%'
  },
  indicator: {
      padding: 75,
  },
  loadingText: {
      //fontFamily: 'Menlo',
      color: 'white',
      fontSize: 18,
      fontWeight: 'normal',
      paddingBottom: 50,
      alignSelf: 'center',
  },
});