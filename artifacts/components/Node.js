import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-elements';
export default class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.goToCamera = this.goToCamera.bind(this);
    }
    goToCamera() {
        this.props.navigation.navigate('Camera', { action: "scan_node", nodeId: this.props.nodeId });
    }
    render() {
        return (React.createElement(View, null,
            React.createElement(Card, { containerStyle: styles.nodeCard },
                React.createElement(Text, { h4: true, style: styles.nodeTitle }, this.props.title),
                React.createElement(Text, null,
                    this.props.description,
                    "\n"),
                React.createElement(View, { style: styles.buttonView },
                    React.createElement(Button, { icon: {
                            name: 'camera-alt',
                            size: 60,
                            color: 'rgba(44,55,71,0.8)'
                        }, style: styles.scanButton, containerStyle: styles.buttonContainer, buttonStyle: styles.transparentButton, title: '', onPress: this.goToCamera }),
                    React.createElement(Button, { icon: {
                            name: 'wifi',
                            size: 60,
                            color: 'rgba(44,55,71,0.8)'
                        }, style: styles.cameraButton, containerStyle: styles.buttonContainer, buttonStyle: styles.transparentButton, title: '' })))));
    }
}
;
// @ts-ignore
const styles = StyleSheet.create({
    nodeCard: {
        height: '95%',
        borderRadius: 1,
        borderColor: 'rgba(53,53,53,0.1)',
        flexDirection: 'row'
    },
    nodeTitle: {
        alignSelf: 'center',
        marginBottom: 10
    },
    buttonContainer: {
        backgroundColor: 'rgba(44,55,71,0.0)',
        padding: 0,
        width: '50%',
        height: '100%',
        borderRightWidth: 0,
        borderRightColor: 'rgba(44,55,71,0.3)',
    },
    buttonView: {
        flex: 1,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: 'rgba(44,55,71,0.1)',
        marginTop: 15
    },
    scanButton: {
        width: '100%',
        height: '100%',
        alignSelf: 'flex-start',
        padding: 0,
    },
    cameraButton: {
        width: '100%',
        height: '100%',
        alignSelf: 'flex-end',
        padding: 0,
    },
    transparentButton: {
        backgroundColor: 'rgba(44,55,71,0.0)',
        paddingTop: 15,
    }
});
//# sourceMappingURL=Node.js.map