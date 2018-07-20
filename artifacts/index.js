import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
// import App from './components/App';
import App from './components/App';
import { Provider } from 'react-redux';
import ConfigureStore from './store/ConfigureStore';
import { YellowBox } from 'react-native';
console.disableYellowBox = true;
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Class RCTCxxModule']);
const store = ConfigureStore();
class MobileApp extends Component {
    componentWillMount() {
        console.log('');
        console.log('************ BA DEMO APP ************');
        console.log('');
    }
    render() {
        return (React.createElement(Provider, { store: store },
            React.createElement(App, null)));
    }
}
AppRegistry.registerComponent('MobileApp', () => MobileApp);
//# sourceMappingURL=index.js.map