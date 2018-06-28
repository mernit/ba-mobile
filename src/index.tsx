import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
// import App from './components/App';
import App from './components/App';

/*
import {
  Card,
  Text,
} from 'react-native-elements';
*/

import { YellowBox } from 'react-native';

console.disableYellowBox = true
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Class RCTCxxModule']);

class MobileApp extends Component {

  componentWillMount() {

  }

  render() {
    return (
        <App />
    );
  }
}

AppRegistry.registerComponent('MobileApp', () => MobileApp);
