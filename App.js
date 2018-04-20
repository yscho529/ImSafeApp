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
    }

    render() {
      return (
        <Tabs />
      );
    }
}

const styles = StyleSheet.create({
});