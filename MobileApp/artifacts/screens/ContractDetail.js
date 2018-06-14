// import React, { Component } from 'react';
// import { View, StyleSheet, Text } from 'react-native';
// import { Input, Button } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Toast from 'react-native-easy-toast';// import * as HttpStatus from 'http-status-codes';
// // import Logger from '../services/Logger';
// import IStoreState from '../store/IStoreState';
// import { connect, Dispatch } from 'react-redux';
// // import { List, ListItem } from 'react-native-elements';
// interface IProps {
//     navigation: any,
// }
// interface IState {
//     loading: boolean,
//     username: string,
//     password: string, 
//     contractAddress: string,
//     contractName: string,
//     address: any,
//     storedData: string,
//     status: string,
//     value: string,
//     method: string,
//     args: string,
// }
// export class ContractDetail extends Component<IProps, IState> {
//   constructor(props: IProps){
//     super(props);
//     this.state = {
//         loading: true,
//         address: '',
//         contractAddress: '',
//         contractName: '',
//         storedData: '',
//         status: '',
//         value: '',
//         method: '',
//         args: '',
//         username: this.props.navigation.getParam('username'),
//         password: this.props.navigation.getParam('password'),
//     }
//     this.componentDidMount = this.componentDidMount.bind(this);
//     this.getContract = this.getContract.bind(this);
//     }
//     componentDidMount() {
//       this.getContract()
//       // GET CONTRACT STATE VARIABLES 
//       // USER CAN MODIFY STATE VARIABLES IN INPUT FIELDS
//       // CALL CONTRACT AND PUSH UPDATED STATE VARIABLES
//     }
//   getContract(){
//     const blocURL = 'localhost';
//     const contractName = this.state.contractName;
//     const contractAddress = this.state.contractAddress;
//     fetch(
//         blocURL + 
//         '/contracts' + 
//         contractName + 
//         contractAddress + 
//         '/state?length=', {
//       method: 'GET',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//     })
//     .then(response => response.json())
//     .then(json => {
//       console.log(json);
//       this.setState({
//         storedData: json.storedData,
//       });
//     })
//     .catch(function (error) {
//       console.log('unable to call contract', error);
//       throw error;
//     });
// }
//     render() {
//       return (
//         <View style={styles.view}>
//           <View style={styles.loginCard}> 
//             <Text style={styles.header}> Contract Manager </Text>
//             <Input
//                 placeholder='Method'
//                 leftIcon={
//                   <Icon
//                     name='user'
//                     size={20}
//                     color='#333333'
//                   />
//                 }
//                 containerStyle={styles.inputPadding}
//                 onChangeText={(method) => this.setState({method})}
//                 value={this.state.method}
//                 />
//                <Input
//               placeholder='Args'
//               leftIcon={
//                 <Icon
//                   name='lock'
//                   size={20}
//                   color='#333333'
//                 />
//               }
//               secureTextEntry
//               containerStyle={styles.inputPadding}
//               onChangeText={(args) => this.setState({args})}
//               value={this.state.args}
//               />
//               <Input
//               placeholder='Value'
//               leftIcon={
//                 <Icon
//                   name='lock'
//                   size={20}
//                   color='#333333'
//                 />
//               }
//               secureTextEntry
//               containerStyle={styles.inputPadding}
//               onChangeText={(value) => this.setState({value})}
//               value={this.state.value}
//               />
//               {/* TODO: DROPDOWN LIST OF USERNAMES */}
//               <Input
//               placeholder='Password'
//               leftIcon={
//                 <Icon
//                   name='lock'
//                   size={20}
//                   color='#333333'
//                 />
//               }
//               secureTextEntry
//               containerStyle={styles.inputPadding}
//               onChangeText={(password) => this.setState({password})}
//               value={this.state.password}
//               />
//               <Button containerStyle={styles.buttonLogin}
//                     onPress={this.callContract}
//                     title='Call Contract'
//                 />
//               <Toast ref="toast"
//                   style={{backgroundColor:'#333333'}}
//                   position='top'
//                   positionValue={300}
//                   fadeInDuration={750}
//                   fadeOutDuration={1000}
//                   opacity={0.8}
//                   textStyle={{color:'white'}}
//               />
//               </View>
//               <View style={styles.signupCard}> 
//                 <Button containerStyle={styles.buttonSignup}
//                     onPress={() => { this.props.navigation.navigate('Signup') } }
//                     title='Signup'
//                 />
//               </View>
//         </View>
//       )
//     }
//   };
//  // @ts-ignore
//  function mapStateToProps(state: IStoreState): IProps {
//     // @ts-ignore
//     return {
//     };
//   }
//   // @ts-ignore
//   function mapDispatchToProps(dispatch: Dispatch<IStoreState>) {
//     return {
//     };
//   }
//   export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
//   const styles = StyleSheet.create({
//     view: {
//       padding:10,
//       flex: 1,
//       alignItems: 'center',
//       backgroundColor: '#ffffff'
//     },
//     loginCard: {
//       flex: 6,
//       alignSelf: 'stretch',
//     },
//     signupCard: {
//       flex: 1,
//     },
//     header:{
//       marginTop: 12,
//       fontSize: 22,
//       alignSelf: 'center'
//     },
//     buttonSignup: {
//       backgroundColor: "rgba(92, 99,216, 1)",
//       width: 300,
//       height: 45,
//       borderColor: "transparent",
//       borderWidth: 0,
//       borderRadius: 3,
//     },
//     buttonLogin: {
//       backgroundColor: "rgba(92, 99,216, 1)",
//       width: 100,
//       height: 45,
//       borderColor: "transparent",
//       borderWidth: 0,
//       borderRadius: 3,
//       alignSelf: 'center',
//       marginTop: 20
//     },
//     inputPadding:{
//       marginTop: 20,
//       marginLeft: 15
//     },
//     containerPadding: {
//       borderColor:'#333333',
//       borderTopWidth: 1,
//       borderLeftWidth: 1,
//       borderRightWidth: 1,
//       borderBottomWidth: 1,
//       borderRadius: 5,
//       padding: 5,
//     }
//   });
//# sourceMappingURL=ContractDetail.js.map