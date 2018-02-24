import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar } from 'react-native';

// create a component
export default class LoginForm extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"
                />
                <TextInput
                    placeholder="Username or Email"
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    underlineColorAndroid='transparent'
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                />
                <TextInput 
                    placeholder="Password"
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    underlineColorAndroid='transparent'
                    secureTextEntry={true}
                    returnKeyType="go"
                    ref={(input) => this.passwordInput = input}
                    style={styles.input}
                />

                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 20,
        color: '#FFFFFF',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#2ecc71',
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    }
});

