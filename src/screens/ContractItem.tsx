// import React, { Component } from 'react';
// import {
//     StyleSheet,
//     TouchableOpacity,
//     Text,
//     View
// } from 'react-native';
    
// interface IProps {
//     navigation: any,
// }

// interface IState {
//     address: string,

// }
  
// export default class ContractItem extends Component<IProps, IState> {
//     constructor(props: IProps){
//       super(props);
  
//       this.state = {
//         address: this.props.navigation.getParam('address'),
//       }
//   }

//   render() {
//     return(
//       <TouchableOpacity onPress={()=> this.props.navigation.navigate('ContractDetail', {address: this.state.address})
//         <View style={styles.rowContainer}>
//           <View style={styles.rowText}>
//             <Text style={styles.creator} numberOfLines={1} ellipsizeMode ={'tail'}>
//               {this.props.address}
//             </Text>
//           </View>
//       </TouchableOpacity>
//     ); 

// const styles = StyleSheet.create({
//   rowContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#FFF',
//     height: 100,
//     padding: 10,
//     marginRight: 10,
//     marginLeft: 10,
//     marginTop: 10,
//     borderRadius: 4,
//     shadowOffset:{  width: 1,  height: 1,  },
//     shadowColor: '#CCC',
//     shadowOpacity: 1.0,
//     shadowRadius: 1
//   },
//   title: {
//     paddingLeft: 10,
//     paddingTop: 5,
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#777'
//   },
//   creator: {
//     paddingLeft: 10,
//     marginTop: 5,
//     fontSize: 14,
//     color: '#777'
//   },
//   payout: {
//     paddingLeft: 10,
//     marginTop: 5,
//     fontSize: 14,
//     color: '#777'
//   },
//   status: {
//     alignSelf: 'flex-end',
//     color: 'green',
//     marginBottom: 20,
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
//   thumbnail: {
//     flex: 1,
//     height: undefined,
//     width: undefined
//   },
//   rowText: {
//     flex: 4,
//     flexDirection: 'column'
//   });