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
          latitude: null,
          longitude: null,
          error: null,
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.setState({
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
                <Button onPress={this._handlePress}
                    title="Save"
                    color="#25CCF7"
                />
                <Text>Latitude: {this.state.latitude}</Text>
                <Text>Longitude: {this.state.longitude}</Text>
                {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
            </View>
        );
    }

    _handlePress(event) {
        console.log("PRESSED");
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});