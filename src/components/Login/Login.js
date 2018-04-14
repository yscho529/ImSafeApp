import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import LoginForm from './LoginForm'

// create a component
export default class Login extends Component {
    render() {
        return (
            <KeyboardAvoidingView 
                behavior="padding"
                style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image 
                        style={styles.logo}
                        source={require('../../images/Octocat.png')} 
                    />
                    <Text style={styles.title}>A</Text>
                </View>

                <View style={styles.formContainer}>
                    <LoginForm/>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db'
    },
    logoContainer : {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 100
    },
    title: {
        color: '#FFFFFF',
        marginTop: 10,
        width: 120,
        textAlign: 'center',
        opacity: 0.8
    }
});

