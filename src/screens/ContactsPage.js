import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
var Contacts = require('react-native-contacts')

// create a component
export default class ContactsPage extends Component {
    render() {

        Contacts.requestPermission((err, permission) => {
            console.log("Permission Level: " + permission)
        });

        Contacts.getAll((err,contacts) => {
            console.log("Number of contacts: " + contacts.length)
        });

        return (
            <View style={styles.container}>
                <Text>Contacts</Text>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

