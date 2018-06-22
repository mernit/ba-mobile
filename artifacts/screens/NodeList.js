import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
export class LifeCycle extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(View, null,
            React.createElement(Text, { style: styles.text }, "Test")));
    }
}
;
const styles = StyleSheet.create({
    text: {
        fontSize: 14,
    }
});
//# sourceMappingURL=NodeList.js.map