import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button, AsyncStorage } from 'react-native';
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
          message: null,
          message1: 'Hey, this is Paul. I am in an emergency situation right now and I need help!',
          message2: null,
          latitude: null,
          longitude: null,
          error: null,
        };
    }

    componentDidMount() {
        this.updateMessage1();
        this.updateMessage2();
    }

    async updateMessage1() {
        let response = await AsyncStorage.getItem('message1');
        this.setState({
            message1: response,
        });
    }    

    async updateMessage2() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
              this.setState({
                message2: ' My current location is https://www.google.com/maps/search/?api=1&query=' +
                    position.coords.latitude + ',' + position.coords.longitude,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
              });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
        );
    } 

    async saveMessage() {
        console.log("PRESSED");
        AsyncStorage.setItem('message1', this.state.message1)
        AsyncStorage.setItem('message', this.state.message1 + this.state.message2);
        this.setState({
            message: this.state.message1 + this.state.message2,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerText}>
                        <Text>Emergency Message: </Text>
                    </View>
                </View>
                <CustomMessage
                    multiline = {true}
                    numberOfLines = {1}
                    onChangeText={(message1) => this.setState({message1})}
                    value={this.state.message1}
                />
                <Button onPress={this.saveMessage.bind(this)}
                    title="Save"
                    color="#25CCF7"
                    borderBottomWidth="1"
                />
                <Text> Message: {this.state.message}</Text>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgba(88, 177, 159, 0.2)'
    },
    headerText: {
        flex: 3,
        alignItems: 'flex-start',
        justifyContent: 'center'
    }
});