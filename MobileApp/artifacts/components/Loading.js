import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { Overlay } from 'react-native-elements';
export default class Loading extends Component {
    render() {
        return (React.createElement(View, { style: styles.mainView },
            React.createElement(Overlay, { overlayStyle: styles.overlay, isVisible: true, windowBackgroundColor: "rgba(255, 255, 255, 0.6)" // the last number is opacity
                , overlayBackgroundColor: "white", width: "auto", height: "auto" },
                React.createElement(ActivityIndicator, { style: styles.indicator, size: "large", color: "#0000ff", animating: true }),
                React.createElement(Text, { style: styles.loadingText }, "Loading..."))));
    }
}
;
const styles = StyleSheet.create({
    mainView: {
        justifyContent: 'center',
        zIndex: 5,
    },
    overlay: {
        marginTop: -100,
        borderRadius: 10,
        borderColor: 'rgba(44,55,71,0.1)',
        borderWidth: 1,
        width: '75%',
        height: '40%'
    },
    indicator: {
        padding: 75,
    },
    loadingText: {
        fontFamily: 'Menlo',
        fontSize: 14,
        paddingBottom: 50,
        alignSelf: 'center',
    },
});
//# sourceMappingURL=Loading.js.map