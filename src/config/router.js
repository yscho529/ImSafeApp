import React, { Component } from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

import Devices from '../screens/Devices';
import ContactsPage from '../screens/ContactsPage';
import Message from '../screens/Message';
import UserContacts from '../screens/UserContacts'
import UserContactInput from '../screens/UserContactInput'

export const ContactsNav = StackNavigator({
    ContactsPage: { screen: ContactsPage },
    UserContacts: { screen: UserContacts },
    UserContactInput: { screen: UserContactInput }
},{
    navigationOptions: { header: null }
});


export const Tabs = TabNavigator({
    Devices: {
        screen: Devices,
    },
    Contacts: {
        screen: ContactsNav,
    },
    Message: {
        screen: Message,
    }
}, {
    tabBarOptions: {
        style: {
            backgroundColor: '#25CCF7'
        }
    }
});

