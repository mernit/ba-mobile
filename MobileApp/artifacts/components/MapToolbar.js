import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
export default class MapToolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (React.createElement(View, { style: styles.toolbarView },
            React.createElement(Button, { icon: {
                    name: 'refresh',
                    size: 30,
                    color: 'rgba(44,55,71,1.0)'
                }, style: styles.refreshButton, containerStyle: styles.buttonContainer, buttonStyle: styles.transparentButton, title: '', onPress: this.props.functions.updateNodeList }),
            React.createElement(Button, { icon: {
                    name: 'location-searching',
                    size: 30,
                    color: 'rgba(44,55,71,1.0)'
                }, style: styles.locationButton, containerStyle: styles.buttonContainer, buttonStyle: styles.transparentButton, title: '', 
                // @ts-ignore
                onPress: this.props.functions.zoomToUserLocation }),
            this.props.loggedIn
                &&
                    React.createElement(Button, { icon: {
                            name: 'keyboard-arrow-down',
                            size: 25,
                            color: 'rgba(44,55,71,0.5)'
                        }, style: styles.walletButton, containerStyle: styles.center, buttonStyle: styles.transparentButton, title: '', onPress: this.props.functions.toggleWallet }),
            React.createElement(Button, { icon: {
                    name: 'list',
                    size: 30,
                    color: 'rgba(44,55,71,1.0)'
                }, style: styles.nodeButton, containerStyle: styles.floatRight, buttonStyle: styles.transparentButton, title: '', onPress: this.props.functions.viewNodeList })));
    }
}
;
// @ts-ignore
const styles = StyleSheet.create({
    toolbarView: {
        backgroundColor: '#ffffff',
        padding: 0,
        flexDirection: 'row',
        borderBottomColor: 'rgba(44,55,71,0.3)',
        borderBottomWidth: 1,
    },
    refreshButton: {
        width: '100%',
        height: '100%',
        alignSelf: 'flex-start',
        padding: 0,
    },
    locationButton: {
        width: '100%',
        height: '100%',
        alignSelf: 'flex-start',
        padding: 0
    },
    createNodeButton: {
        width: '100%',
        height: '100%',
        alignSelf: 'flex-start',
        padding: 0
    },
    nodeButton: {
        width: '100%',
        height: '100%',
        padding: 0
    },
    walletButton: {
        width: '100%',
        height: '100%',
        padding: 0
    },
    buttonContainer: {
        backgroundColor: 'rgba(44,55,71,0.0)',
        padding: 0,
        width: '10%',
        height: '100%',
        borderRightWidth: 1,
        borderRightColor: 'rgba(44,55,71,0.3)',
    },
    floatRight: {
        backgroundColor: 'rgba(44,55,71,0.0)',
        padding: 0,
        width: '10%',
        height: '100%',
        borderRightWidth: 1,
        borderRightColor: 'rgba(44,55,71,0.3)',
        position: 'absolute',
        right: 0,
    },
    center: {
        backgroundColor: 'rgba(44,55,71,0.0)',
        padding: 0,
        width: '10%',
        height: '100%',
        borderRightWidth: 0,
        borderRightColor: 'rgba(44,55,71,0.3)',
        position: 'absolute',
        right: '45%'
    },
    transparentButton: {
        backgroundColor: 'rgba(44,55,71,0.0)',
        paddingTop: 8,
    }
});
//# sourceMappingURL=MapToolbar.js.map