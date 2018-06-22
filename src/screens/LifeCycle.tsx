import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Timeline from 'react-native-timeline-listview'
import { Button } from 'react-native-elements';

interface IProps {
  navigation: any,
}

interface IState {
  data: Array<any>,
}

export default class LifeCycle extends Component<IProps, IState> {
  constructor(props: IProps){
    super(props);

    this.state = {
      data: [
        {time: '09:00', title: 'Archery Training', description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',lineColor:'#009688'},
        {time: '10:45', title: 'Play Badminton', description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.'},
        {time: '12:00', title: 'Lunch'},
        {time: '14:00', title: 'Watch Soccer', description: 'Team sport played between two teams of eleven players with a spherical ball. ',lineColor:'#009688'},
        {time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)'}
      ]
    }
  }
  
  render(){
      return(
        <View style={styles.container}>
        <Text style={styles.text}>Manufacturing Lifecycle</Text>
          <Timeline
            style={styles.list}
            data={this.state.data}
            circleSize={20}
            circleColor='rgb(45,156,219)'
            lineColor='rgb(45,156,219)'
            timeContainerStyle={{minWidth:52, marginTop: -5}}
            timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
            descriptionStyle={{color:'gray'}}
            innerCircle={'dot'}
            options={{
              style:{paddingTop:5}
            }}
          />
            <Button containerStyle={styles.buttonSignup}
              onPress={() => { this.props.navigation.navigate('Signup') } }
              title='Return to Contracts'
          />
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      //paddingTop:65,
      backgroundColor:'white'
    },
    buttonSignup: {
      backgroundColor: "rgba(92, 99,216, 1)",
      width: 300,
      height: 45,
      alignSelf: 'center',
      borderColor: "transparent",
      borderWidth: 0,
      borderRadius: 3,
    },
    text: {
      alignSelf: 'center',
      fontSize: 20,
    },
    list: {
      flex: 1,
      marginTop:20
    }
  });