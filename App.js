/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';
import Login from './src/components/Login/Login';
import { Tabs } from './src/config/router';

export default class App extends Component<Props> {
    constructor(props) {
      super(props);
      this.state = {
        text: '',
        latitude: null,
        longitude: null,
        error: null,
      };

      this.updateText = this.updateText.bind(this)
      this.updateText()
    }
    
    async updateText() {
      console.log('updateText')
      var defaultMessage = 'Hey, this is Paul. I am in an emergency situation right now and I need help!'
                            + ' My current location is https://www.google.com/maps/search/?api=1&query='

      await AsyncStorage.getItem('emerg_message').then((data) => {
        if(data.length === 0){
          console.log('in default')
          this.setState({ text: defaultMessage })
        }
        else{
          console.log('not default')
          this.setState({ text: data })
        }
        this.getGPS()
      })
    }

    getGPS() {
      console.log('getGPS')
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            text: this.state.text + position.coords.latitude + ',' + position.coords.longitude,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
          this.setMessage()
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
      )
    }

    async setMessage() {
      await AsyncStorage.setItem('emerg_message', this.state.text);
    }

  render() {
    return (
      <Tabs />
    );
  }
}

const styles = StyleSheet.create({
});