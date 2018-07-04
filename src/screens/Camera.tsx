import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Loading from '../components/Loading';
import ViewFinder from 'react-native-view-finder'
import Icon from 'react-native-vector-icons/Entypo';
import Geocoder from 'react-native-geocoder';
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
  lat: any,
  lng: any,
  location: string,
  username: string,
  password: string
}

export default class Camera extends Component<IProps, IState> {
  constructor(props: IProps){
    super(props);

    this.state = {
      uuid: '',
      scanSuccess: false,
      isLoading: false,
      torchMode: false,
      address: this.props.navigation.getParam('address'),
      userAddress: this.props.navigation.getParam('userAddress'),
      username: this.props.navigation.getParam('username'),
      password: this.props.navigation.getParam('password'),
      lat: '',
      lng: '',
      location: '',
  }

    this.onBarCodeRead = this.onBarCodeRead.bind(this);
    this.toggleFlash = this.toggleFlash.bind(this);
    this.goToDetails = this.goToDetails.bind(this);
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

    //let address = AsyncStorage.getItem('address');
    //console.log('got address from storage', address)


  async getUserLocation() {
    const position = {lat: this.state.lat, lng: this.state.lng}
    console.log('got position', position)
    const response = await Geocoder.geocodePosition(position);
    console.log('got response from geocoder', response[0].locality)
    this.setState({location: response[0].locality})
  }
  
  onBarCodeRead(e) {
    this.setState({uuid: e.data, isLoading: true});
    this.goToDetails();
  }

  goToDetails() {
    this.props.navigation.navigate('ContractDetail', {
      username: this.state.username,
      password: this.state.password,
      location: this.state.location, 
      uuid: this.state.uuid, 
      address: this.state.address, 
      userAddress: this.state.userAddress
    });
  }

  toggleFlash() {
      this.state.torchMode == false ? this.setState({torchMode: true}) :
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
              this.state.torchMode ? RNCamera.Constants.FlashMode.torch :
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