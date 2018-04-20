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

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      latitude: null,
      longitude: null,
      error: null,
    };

    console.log('in con');
    AsyncStorage.clear();
    this.setEmergencyMessage();
    this.setCancelMessage();
  }

  async setEmergencyMessage() {
    console.log('setEmergencyMessage');
    var defaultEmergMessage = 'Hey, this is Paul. I am in an emergency situation right now and I need help!';
    await AsyncStorage.setItem('emerg_message', defaultEmergMessage);
  }

  async setCancelMessage() {
    console.log('setCancelMessage');
    var defaultCancelMessage = 'Hey, this is Paul. That was just a false alarm! Sorry about that.';
    await AsyncStorage.setItem('cancel_message', defaultCancelMessage);
  }

  render() {
    return (
      <Tabs />
    );
  }
}

const styles = StyleSheet.create({
});