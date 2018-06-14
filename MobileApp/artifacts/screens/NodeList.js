import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
export class NodeList extends Component {
    constructor(props) {
        super(props);
        this._renderItem = ({ item }) => (React.createElement(ListItem, { onPress: () => this._onTouchNode(item), containerStyle: styles.nodeListItem, leftIcon: { name: 'place', color: "rgba(51, 51, 51, 0.8)" }, rightIcon: { name: 'chevron-right', color: "rgba(51, 51, 51, 0.8)" }, title: item.data.title, subtitle: item.data.distance_in_miles.toString(), subtitleStyle: styles.nodeListItemSubtitle }));
    }
    componentWillMount() {
    }
    componentWillUnmount() {
    }
    _onTouchNode(node) {
        let region = {
            latitude: parseFloat(node.data.latitude),
            longitude: parseFloat(node.data.longitude),
            latitudeDelta: parseFloat(node.data.latDelta),
            longitudeDelta: parseFloat(node.data.longDelta),
        };
        console.log(region);
        this.props.navigation.navigate('Map', { region: region });
    }
    render() {
        return (React.createElement(View, null,
            React.createElement(FlatList, { data: this.props.nodeList, renderItem: this._renderItem, extraData: this.state, keyExtractor: item => item.id })));
    }
}
;
// @ts-ignore
function mapStateToProps(state) {
    // @ts-ignore
    return {};
}
// @ts-ignore
function mapDispatchToProps(dispatch) {
    return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(NodeList);
const styles = StyleSheet.create({
    nodeListItem: {
        borderBottomWidth: 1,
        borderBottomColor: "rgba(51, 51, 51, 0.2)",
        minHeight: 80,
        maxHeight: 80
    },
    nodeListItemSubtitle: {}
});
//# sourceMappingURL=NodeList.js.map