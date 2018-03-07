import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';

import Devices from '../screens/Devices';
import ContactsPage from '../screens/ContactsPage';
import Message from '../screens/Message';

export const Tabs = TabNavigator({
    Devices: {
        screen: Devices,
    },
    Contacts: {
        screen: ContactsPage,
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

