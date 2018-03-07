import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';


class CustomMessage extends Component {
    render() {
      return (
        <TextInput
          {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
          editable = {true}
        />
      );
    }
}

// create a component
export default class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
          text: 'Hey, this is login.name and I am in an emergency situation right now and I need help!! My current location is location.current.',
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <CustomMessage
                    multiline = {true}
                    numberOfLines = {1}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                />
                <Button
                    title="Save"
                    color="#25CCF7"
                />
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