import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Button, AsyncStorage, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import { StackNavigator } from 'react-navigation';


// create a component
export default class UserContactInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            number: "",
            newContact: {
                recordID: "",
                familyName: "",
                givenName: "",
                phoneNumbers: [{
                    label: "",
                    number: "",
                }],
            }
        };
    }

    componentDidMount() {

    }

    async addContact() {
        if(this.state.name.length == 0 || this.state.number.length == 0){
            Alert.alert(
                '',
                'Incomplete fields',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            )
        } else {
            this.state.newContact.givenName = this.state.name;
            this.state.newContact.phoneNumbers[0].number = this.state.number;

            let response = await AsyncStorage.getItem('emergContacts');
            let parsedResponse = await JSON.parse(response) || [];
            parsedResponse.push(this.state.newContact);
            AsyncStorage.setItem('emergContacts', JSON.stringify(parsedResponse));

            console.log(parsedResponse);

            this.props.navigation.navigate('ContactsPage');
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.heading}>
                        <Text style={{fontWeight: 'bold'}}>Add a contact</Text>
                    </View>
                    <View style={styles.inputFields}>
                        <Fumi
                            label={'Name'}
                            iconClass={Icon}
                            iconName={'user'}
                            iconSize={20}
                            autoCorrect={false}
                            onChangeText={ (text) => { this.setState({name: text}) } }
                        />
                        <Fumi
                            label={'Phone Number'}
                            iconClass={Icon}
                            iconName={'phone'}
                            iconColor='#FD7272'
                            iconSize={20}
                            autoCorrect={false}
                            keyboardType='phone-pad'
                            onChangeText={(text) => { this.setState({number: text}) } }
                        />
                    </View>
                    <View style={styles.buttons}>
                        <View style={styles.button}>
                            <Button onPress={() => { navigate('ContactsPage') }}
                                title="Cancel"
                                color="#FD7272"
                            />
                        </View>
                        <View style={styles.button}>
                            <Button onPress={ this.addContact.bind(this) }
                                title="Add"
                                color="#3B3B98"
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heading: {
        padding: 20,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgba(88, 177, 159, 0.2)',
    },
    inputFields: {
        paddingTop: 0,
    },
    buttons: {
        flexDirection: 'row',
        marginTop: 20,
        backgroundColor: '#3B3B98',
    },
    button: {
        width: '50%',
    }
});

