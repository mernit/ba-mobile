var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SleepUtil from '../services/SleepUtil';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
// import { UsernameChangedActionCreator } from '../actions/AuthActions';
import Toast from 'react-native-easy-toast';
export class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            userAddress: '',
            password: '',
            confirmPassword: '',
            createButtonDisabled: false
        };
        this.createUser = this.createUser.bind(this);
        this.validateSignup = this.validateSignup.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
    updateUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setState({ username: username });
        });
    }
    createUser() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('got user info');
            this.setState({ createButtonDisabled: true });
            this.props.navigation.navigate('Confirmation', { username: this.state.username, password: this.state.password });
        });
    }
    ;
    //   if(this.state.password != this.state.confirmPassword){
    //     this.validateSignup({code:'PasswordsDoNotMatch'}, null);
    //     return;
    //   }
    // }
    validateSignup(err, result) {
        return __awaiter(this, void 0, void 0, function* () {
            var err_msg = '';
            if (err) {
                console.log(err);
                switch (err.code) {
                    case 'NetworkingError':
                        err_msg = 'Unable to connect to server.';
                        break;
                    case 'UsernameExistsException':
                        err_msg = 'That username is taken.';
                        break;
                    case 'InvalidPasswordException':
                        err_msg = 'Passwords must contain at least 1 uppercase letter and 1 number.';
                        break;
                    case 'PasswordsDoNotMatch':
                        err_msg = 'Passwords do not match.';
                        break;
                    default:
                        err_msg = 'Unhandled error: ' + err.code;
                }
            }
            else {
                console.log(result);
                this.setState({ createButtonDisabled: false });
                this.props.navigation.navigate('Confirmation', { username: this.state.username });
            }
            if (err_msg != '') {
                // @ts-ignore
                this.refs.toast.show(err_msg);
                yield SleepUtil.SleepAsync(2000);
                this.setState({ createButtonDisabled: false });
                return;
            }
        });
    }
    render() {
        return (React.createElement(View, { style: styles.view },
            React.createElement(Text, { style: styles.header }, " Signup Below "),
            React.createElement(Card, { containerStyle: styles.loginCard },
                React.createElement(Input, { placeholder: 'Username', leftIcon: React.createElement(Icon, { name: 'user', size: 20, color: '#333333' }), containerStyle: styles.inputPadding, onChangeText: this.updateUsername, value: this.state.username }),
                React.createElement(Input, { placeholder: 'Password', leftIcon: React.createElement(Icon, { name: 'lock', size: 20, color: '#333333' }), secureTextEntry: true, containerStyle: styles.inputPadding, 
                    //@ts-ignore
                    // inputContainerStyle={styles.containerPadding}
                    onChangeText: (password) => this.setState({ password }), value: this.state.password }),
                React.createElement(Input, { placeholder: 'Confirm Password', leftIcon: React.createElement(Icon, { name: 'lock', size: 20, color: '#333333' }), secureTextEntry: true, containerStyle: styles.inputPadding, onChangeText: (confirmPassword) => this.setState({ confirmPassword }), value: this.state.confirmPassword }),
                React.createElement(Button, { onPress: this.createUser, title: 'Create Account', disabled: this.state.createButtonDisabled, buttonStyle: styles.button, containerStyle: { marginTop: 20, marginBottom: 20 } })),
            React.createElement(Toast, { ref: "toast", style: { backgroundColor: '#333333' }, position: 'bottom', positionValue: 225, fadeInDuration: 750, fadeOutDuration: 1000, opacity: 0.8, textStyle: { color: 'white' } })));
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
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
// define styles
const styles = StyleSheet.create({
    loginCard: {},
    header: {
        fontSize: 22
    },
    view: {
        padding: 30,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    button: {
        backgroundColor: "rgba(92, 99,216, 1)",
        width: 300,
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5
    },
    inputPadding: {
        marginTop: 20,
        marginLeft: 15
    },
    containerPadding: {
        borderColor: '#333333',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 5,
        padding: 5,
    }
});
//# sourceMappingURL=Signup.js.map