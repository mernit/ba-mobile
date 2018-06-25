import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import IStoreState from '../store/IStoreState';
import { connect, Dispatch } from 'react-redux';

import {ListItem} from 'react-native-elements';

import {NavigationActions} from 'react-navigation';

// import Icon from 'react-native-vector-icons/FontAwesome';

/*
import { bindActionCreators } from 'redux';
import { UserLoggedInActionCreator } from '../actions/AuthActions';
*/

interface IProps {
    navigation?: any,
    loggedIn: boolean
}

interface IState {
  apexHash: Array<any>,
}

export class SideBar extends Component<IProps, IState> {
  resetAction: any
    constructor(props: IProps){
        super(props);

        this.state = {
          apexHash: [],
        }

        this.resetAction = NavigationActions.replace({ routeName: 'Map' });
        this.navigateToScreen = this.navigateToScreen.bind(this);
        this.resetNavigation = this.resetNavigation.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

    }

    componentDidMount() {
        fetch('http://localhost/apex-api/status', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: null,
        })
        .then(response => response.json())
        .then(json => {
          console.log('got apex status', json.lastBlock.hash);
          this.setState({
            apexHash: json.lastBlock.hash,
          });
        })
        .catch(function (error) {
          console.log('unable to get apex info', error);
          throw error;
        });
    }

    resetNavigation(route) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: route }),
        ],
      });
      this.props.navigation.dispatch(resetAction);
    }


    navigateToScreen = (route) => () => {
      const navigateAction = NavigationActions.navigate({
        routeName: route
      });
      this.props.navigation.dispatch(navigateAction);
    }

    render() {
      let apexHash = JSON.stringify(this.state.apexHash);
         return (
        <View style={styles.view}>
                <ListItem
                  // roundAvatar
                  // avatar={{uri:l.avatar_url}}
                  containerStyle={styles.navItem}
                  key='Contracts'
                  title='Contracts'
                  leftIcon={{name: 'lock', color: "rgba(51, 51, 51, 0.8)"}}

                  onPress={ () => {
                    this.resetNavigation('ContractList');
                  }} 
                />

                <ListItem
                  containerStyle={styles.navItem}
                  key='LifeCycle'
                  title='LifeCycle'
                  leftIcon={{name: 'fingerprint', color: "rgba(51, 51, 51, 0.8)"}}

                  onPress={ () => {
                    this.resetNavigation('LifeCycle');
                  }} 
                />

                 <ListItem
                  containerStyle={styles.navItem}
                  key='ContractBuilder'
                  title='ContractBuilder'
                  leftIcon={{name: 'description', color: "rgba(51, 51, 51, 0.8)"}}

                  onPress={ () => {
                    this.resetNavigation('ContractBuilder');
                  }} 
                />

                <ListItem
                  containerStyle={styles.navItem}
                  key='ContractDetail'
                  title='ContractDetail'
                  leftIcon={{name: 'camera', color: "rgba(51, 51, 51, 0.8)"}}

                  onPress={ () => {
                    this.resetNavigation('ContractDetail');
                  }} 
                />

              {/* START APEX STATUS */}
              
              <Text style={styles.apexHeader}>Node Stats</Text>
              <Text style={styles.apex}>Hash: {apexHash}</Text>

              {/* END APEX STATUS */}

             <Text style={styles.poweredBy}>Powered by BlockApps STRATO</Text>



            }
        </View>
      )
    }
};


export function mapStateToProps(state: IStoreState): IProps {
  // @ts-ignore
  return {
    loggedIn: state.loggedIn
  };
}

// @ts-ignore
export function mapDispatchToProps(dispatch: Dispatch<IStoreState>) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);

const styles = StyleSheet.create({
  view: {
    marginTop:20,
    flex: 1,
    // backgroundColor: '#2f424d'
  },
  apexHeader: {
    left: 20,
    paddingTop: 50,
    fontSize: 16,
    fontWeight: 'bold',
  },
  apex: {
    borderColor: 'black',
    fontSize: 10,
    color: 'green',
    padding: 20,
  },
  navItem: {
    borderBottomWidth: 1,
    paddingTop: 30,
    paddingBottom: 30,
    borderBottomColor:"rgba(51, 51, 51, 0.2)",
  },
  poweredBy: {

    marginTop: 120,
    alignSelf: 'center',
  }
});
