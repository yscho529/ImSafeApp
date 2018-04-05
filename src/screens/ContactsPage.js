import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, AsyncStorage } from 'react-native';
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/FontAwesome';
import { StackNavigator } from 'react-navigation';
import { ContactsNav } from '../config/router'

var Contacts = require('react-native-contacts')

// create a component
export default class ContactsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emergContacts: []
        };
    }
    
    componentDidMount() {
        this._updateList();
    }

    componentWillMount() {
        console.log("Returned here");
        this._updateList();
    }

    async _updateList () {
        let response = await AsyncStorage.getItem('emergContacts'); 
        let parsedResponse = await JSON.parse(response) || []; 
        this.setState({
            emergContacts: parsedResponse,
        });
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <FlatList 
                    data={this.state.emergContacts}
                    renderItem={ ({item}) => <Text style={styles.item}>{item.givenName} {item.familyName} {item.phoneNumbers[0].number}</Text> }
                    extraData={this.state} 
                    //keyExtractor={(item, index) => item.id}
                />
                <ActionButton buttonColor='#EAB543' onPress={() => {}}>
                    <ActionButton.Item buttonColor='#BDC581' title="From Contacts" onPress={() => { navigate('UserContacts') }}>
                        <Icon name="address-book" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#FEA47F' title="Input Manually" onPress={() => { navigate('UserContactInput') }}>
                        <Icon name="edit" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});

