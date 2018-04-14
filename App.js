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

      console.log('in con')
      AsyncStorage.clear()
      this.updateText = this.updateText.bind(this)
      this.updateText()
    }
    
    async updateText() {
      console.log('updateText')
      var defaultMessage = 'Hey, this is Paul. I am in an emergency situation right now and I need help!'
                            + ' My current location is https://www.google.com/maps/search/?api=1&query='

      await AsyncStorage.getItem('emerg_message').then((data) => {
        if(data == null){
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
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
          this.setMessage(position.coords)
          console.log('set')
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
      )
    }

    async setMessage(coords) {
      await AsyncStorage.setItem('emerg_message', this.state.text + coords.latitude + ',' + coords.longitude);
    }

  render() {
    return (
      <Tabs />
    );
  }
}

const styles = StyleSheet.create({
});