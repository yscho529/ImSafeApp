import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
var Contacts = require('react-native-contacts')

// create a component
export default class ContactsPage extends Component {
    render() {
        
        Contacts.getAll((err,contacts) => {
            console.log(contacts)
        })

        Contacts.requestPermission((err, permission) => {
            console.log("Asked permission")
            console.log(permission)
        });

        return (
            <View style={styles.container}>
                
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

