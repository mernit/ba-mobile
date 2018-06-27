import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Loading from '../components/Loading';
import ViewFinder from 'react-native-view-finder'
import Icon from 'react-native-vector-icons/Entypo';

import IStoreState from '../store/IStoreState';
import { connect, Dispatch } from 'react-redux';

// import { List, ListItem } from 'react-native-elements';
interface IProps {
  navigation: any,
}

interface IState {
  uuid: string, 
  scanSuccess: boolean,
  isLoading: boolean,
  torchMode: boolean,
  address: string,
  userAddress: string
}

export class Camera extends Component<IProps, IState> {
  constructor(props: IProps){
    super(props);

    this.state = {
      uuid: '',
      scanSuccess: false,
      isLoading: false,
      torchMode: false,
      address: this.props.navigation.getParam('address'),
      userAddress: this.props.navigation.getParam('userAddress')
    }

    this.onBarCodeRead = this.onBarCodeRead.bind(this);
    this.toggleFlash = this.toggleFlash.bind(this);

    }
  
  onBarCodeRead(e) {
    this.setState({uuid: e.data})
    // navigate to detail page 
    this.props.navigation.navigate('ContractDetail', {uuid: this.state.uuid, address: this.state.address, userAddress: this.state.userAddress})
    this.setState({scanSuccess: true});

  }

  toggleFlash() {
    this.state.torchMode == false ? 
    this.setState({torchMode: true}) :
    this.setState({torchMode: false});
  }

  render() {    
    return (
      <View style={styles.container}>
      
        { 
          this.state.isLoading &&
          <Loading />
        }

        <RNCamera
            style={styles.container}
            barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
            onBarCodeRead={this.onBarCodeRead}
            type={RNCamera.Constants.Type.back}
            flashMode={
              this.state.torchMode ? 
              RNCamera.Constants.FlashMode.torch :
              RNCamera.Constants.FlashMode.off
            }
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need permission to use your camera'}/>
            <ViewFinder />

              <TouchableOpacity
                style={styles.button}
                onPress={this.toggleFlash}
              >
              <Icon
                name='flashlight'
                size={35}
                color='rgba(44,55,71,1.0)'
              />
              </TouchableOpacity>

        </View>
    );
  }
}

 // @ts-ignore
 function mapStateToProps(state: IStoreState): IProps {
  // @ts-ignore
  return {
    //visitedNodeList: state.visitedNodeList
  };
}

// @ts-ignore
function mapDispatchToProps(dispatch: Dispatch<IStoreState>) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Camera);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    borderWidth:1,
    borderColor:'rgba(44,55,71,0.3)',
    alignItems:'center',
    alignSelf: 'center',
    justifyContent:'center',
    width:60,
    height:60,
    backgroundColor:'rgba(255,255,255,0.9)',
    borderRadius:100,
    position:'absolute',
    bottom: '5%',
    left: '5%'
  }
});