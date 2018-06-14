var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { View, AsyncStorage, ActivityIndicator, StyleSheet, Text } from 'react-native';
export default class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            userInfo: {}
        };
        this.loadWallet = this.loadWallet.bind(this);
        this.loadWallet();
    }
    loadWallet() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.props.loggedIn) {
                let userInfo = yield AsyncStorage.getItem('userInfo');
                yield this.setState({ isLoading: false, userInfo: userInfo });
                console.log('USER INFO');
                console.log(this.state.userInfo);
            }
        });
    }
    render() {
        return (React.createElement(View, { style: styles.mainView },
            this.state.isLoading &&
                React.createElement(View, { style: [styles.loadingContainer, styles.horizontal] },
                    React.createElement(ActivityIndicator, { size: "large", color: "#0000ff", animating: true, style: styles.loaderWheel })),
            !this.state.isLoading &&
                React.createElement(View, { style: styles.walletContainer },
                    React.createElement(Text, null,
                        " Wallet address ",
                        this.state.userInfo,
                        " "))));
    }
}
;
const styles = StyleSheet.create({
    mainView: {
        flex: 1
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        height: '100%',
        zIndex: 1
    },
    walletContainer: {
        flex: 1,
        justifyContent: 'center',
        height: '100%',
        zIndex: 1
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 0
    },
    loaderWheel: {
        alignSelf: 'center',
    }
});
//# sourceMappingURL=Wallet.js.map