import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Timeline from 'react-native-timeline-listview';
import { Button } from 'react-native-elements';
export default class LifeCycle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: '',
            timestamp: '',
            name: '',
            status: '',
            data: [
                { time: '09:00', title: 'Manufacturer', description: 'Confirmation of goods dispatched to shipper', lineColor: '#009688' },
                { time: '10:45', title: 'Warehouse - Receiving', description: 'Confirmation of authenticity' },
                { time: '12:00', title: 'Warehouse - Pack & Pick', description: 'Update which unit has been picked from which carton' },
                { time: '14:00', title: 'Warehouse - Ship', description: 'Confirmation that box has been dispatched', lineColor: '#009688' },
                { time: '16:30', title: 'Destination', description: 'Confirmation of delivery' }
            ]
        };
    }
    componentDidMount() {
        this.getState();
    }
    getState() {
        const blocURL = 'http://localhost/bloc/v2.2/contracts/SupplyChain/b823216ffb44fcea8eb4e2a53d7275eee8435aef/state?name=itemIndex';
        fetch(blocURL, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(json => {
            console.log(json);
            this.setState({
                location: json.itemIndex[0].location,
                timestamp: json.itemIndex[0].timestamp,
            });
        })
            .catch(function (error) {
            throw error;
        });
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(Text, { style: styles.text }, "Manufacturing Lifecycle"),
            React.createElement(Text, { style: styles.text },
                "Package Location: ",
                this.state.location),
            React.createElement(Text, { style: styles.text },
                "Checked In: ",
                this.state.timestamp),
            React.createElement(Timeline, { style: styles.list, data: this.state.data, circleSize: 20, circleColor: 'rgb(45,156,219)', lineColor: 'rgb(45,156,219)', timeContainerStyle: { minWidth: 52, marginTop: -5 }, timeStyle: { textAlign: 'center', backgroundColor: '#ff9797', color: 'white', padding: 5, borderRadius: 13 }, descriptionStyle: { color: 'gray' }, innerCircle: 'dot', options: {
                    style: { paddingTop: 5 }
                } }),
            React.createElement(Button, { containerStyle: styles.buttonSignup, onPress: () => { this.props.navigation.navigate('Signup'); }, title: 'Return to Contracts' })));
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        //paddingTop:65,
        backgroundColor: 'white'
    },
    buttonSignup: {
        backgroundColor: "rgba(92, 99,216, 1)",
        width: 300,
        height: 45,
        alignSelf: 'center',
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 3,
    },
    text: {
        alignSelf: 'center',
        fontSize: 20,
    },
    list: {
        flex: 1,
        marginTop: 20
    }
});
//# sourceMappingURL=LifeCycle.js.map