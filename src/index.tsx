import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
// import App from './components/App';
import App from './components/App';
import { Provider } from 'react-redux';
import ConfigureStore from './store/ConfigureStore';

/*
import {
  Card,
  Text,
} from 'react-native-elements';
*/

import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Class RCTCxxModule']);

const store = ConfigureStore();


class MobileApp extends Component {

  componentWillMount() {

  }

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('MobileApp', () => MobileApp);
