import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import SmsAndroid  from 'react-native-get-sms-android';

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
          text: 'Hey, this is Paul. I am in an emergency situation right now and I need help!'
            + ' My current location is https://www.google.com/maps/search/?api=1&query=',
          latitude: null,
          longitude: null,
          error: null,
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.setState({
              text: this.state.text + position.coords.latitude + ',' + position.coords.longitude,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              error: null,
            });
          },
          (error) => this.setState({ error: error.message }),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
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
                <Button onPress={this.save.bind(this)}
                    title="Save"
                    color="#25CCF7"
                />
            </View>
        );
    }

    save(event) {
        console.log("PRESSED");
        SmsAndroid.autoSend('6786779310', this.state.text, (fail) => {
            console.log("Failed with this error: " + fail)
        }, (success) => {
            console.log("SMS sent successfully");
        });
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});