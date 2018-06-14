import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-elements';

interface IProps{
  title: string;
  description: string;
  nodeId: number;
  navigation: any;
}

interface IState{

}

export default class Node extends Component<IProps, IState> {
  constructor(props: IProps){
    super(props);
    this.state = {
    };

    this.goToCamera = this.goToCamera.bind(this);

  }

  goToCamera(){
    this.props.navigation.navigate('Camera', {action: "scan_node", nodeId: this.props.nodeId});
  }

  render() {
    return (
      <View>
        <Card containerStyle={styles.nodeCard}> 
        
        {/* <Icon
            name='place'
            color='#333333'
          /> */}

          <Text h4 style={styles.nodeTitle}>
            {this.props.title}
          </Text>
          <Text>
          {this.props.description}
          {"\n"}
          </Text>
         
          <View style={styles.buttonView}>
            <Button
              icon={{
                name: 'camera-alt',
                size: 60,
                color: 'rgba(44,55,71,0.8)'
              }}
              style={styles.scanButton}
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.transparentButton}
              title=''
              onPress={this.goToCamera}
            />

            <Button
              icon={{
                name: 'wifi',
                size: 60,
                color: 'rgba(44,55,71,0.8)'
              }}
              style={styles.cameraButton}
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.transparentButton}
              title=''
              // onPress={this.props.functions.toggleWallet}
            />
          </View>
        </Card>
      </View>
    )
  }


};

// @ts-ignore
const styles = StyleSheet.create({
  nodeCard: { 
    height: '95%',
    borderRadius: 1,
    borderColor: 'rgba(53,53,53,0.1)',
    flexDirection: 'row'
  },
  nodeTitle: {
    alignSelf:'center',
    marginBottom: 10
  },
  buttonContainer: {
    backgroundColor: 'rgba(44,55,71,0.0)',
    padding:0,
    width:'50%',
    height:'100%',
    borderRightWidth: 0,
    borderRightColor: 'rgba(44,55,71,0.3)',
  },
  buttonView: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(44,55,71,0.1)',
    marginTop: 15
  },
  scanButton: {
    width:'100%',
    height:'100%',
    alignSelf:'flex-start',
    padding:0,
  },
  cameraButton: {
    width:'100%',
    height:'100%',
    alignSelf:'flex-end',
    padding:0,
  },
  transparentButton: {
    backgroundColor: 'rgba(44,55,71,0.0)',
    paddingTop: 15,
  }
});