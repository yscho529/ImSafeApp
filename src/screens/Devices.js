import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
export default class Devices extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Devices</Text>
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

