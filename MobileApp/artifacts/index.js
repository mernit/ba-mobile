import React, { Component } from 'react';
import { AppRegistry, Platform } from 'react-native';
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
import Logger, { LogLevel } from './services/Logger';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Class RCTCxxModule']);
const store = ConfigureStore();
class MobileApp extends Component {
    componentWillMount() {
        Logger.CreateLogger({
            logzToken: 'oPnvyWXcbTWyjQjjHEmQhqDHOzZjGnuB',
            toConsole: __DEV__,
            level: LogLevel.Info,
            sendIntervalMs: 60000,
            logzType: `mobileapp-${Platform.OS}`,
            bufferSize: 1000,
            deviceId: '',
            bundleId: '',
            logAppState: true,
            logNetState: true,
            logRNErrors: true,
        });
        Logger.info(` MobileApp - Starting up`);
    }
    render() {
        return (React.createElement(Provider, { store: store },
            React.createElement(App, null)));
    }
}
AppRegistry.registerComponent('MobileApp', () => MobileApp);
//# sourceMappingURL=index.js.map