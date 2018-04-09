import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button, TouchableHighlight, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Contacts from 'react-native-contacts';
import { StackNavigator } from 'react-navigation';

// create a component
export default class UserContacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allContacts: null,
            selectedContacts: []
        };
        const { navigate } = this.props.navigation;
    }

    componentDidMount() {
        Contacts.requestPermission((err, permission) => {
            console.log("Permission Level: " + permission)
        });

        Contacts.getAll((err,contacts) => {
            if(err == 'denied'){
                // error
            } else {
                contacts.map(info => {
                    info.check = false;
                    return contacts;
                })
                console.log(contacts)
                this.setState({ allContacts: contacts.sort() });
            }
        });
    }

    press = (hey) => {
        this.state.allContacts.map((item) => {
            if (item.recordID === hey.recordID) {
              item.check = !item.check
              if (item.check === true) {
                this.state.selectedContacts.push(item);
                console.log('selected:' + item.givenName);
              } else if (item.check === false) {
                const i = this.state.selectedContacts.indexOf(item)
                if (1 != -1) {
                  this.state.selectedContacts.splice(i, 1)
                  console.log('unselect:' + item.givenName)
                  return this.state.selectedContacts
                }
              }
            }
          })
          this.setState({allContacts: this.state.allContacts})
          console.log(this.state.selectedContacts)
    }

    async addContacts() {
        let response = await AsyncStorage.getItem('emergContacts');
        let parsedResponse = await JSON.parse(response) || [];
        
        for(var contact of this.state.selectedContacts){
            parsedResponse.push(contact);
        }

        AsyncStorage.setItem('emergContacts', JSON.stringify(parsedResponse));

        this.props.navigation.navigate('ContactsPage');
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.heading}>
                    <Text style={{fontWeight: 'bold'}}>Select contacts to add</Text>
                </View>
                 <FlatList data={this.state.allContacts} 
                        keyExtractor={item => item.recordID} 
                        extraData={this.state} 
                        ListHeaderComponent={this.renderHeader} 
                        renderItem={({item}) => {
                            return <TouchableOpacity style={{
                                flexDirection: 'row',
                                padding: 10,
                                borderBottomWidth: 1,
                                borderStyle: 'solid',
                                borderColor: 'rgba(88, 177, 159, 0.2)'
                                }} onPress={() => {
                                this.press(item)
                                }}>
                                <View style={{
                                    flex: 3,
                                    alignItems: 'flex-start',
                                    justifyContent: 'center'
                                }}>
                                    {item.check
                                    ? (
                                        <Text style={{
                                        fontWeight: 'bold'
                                        }}>{`${item.familyName} ${item.givenName}`}
                                            <Text style={{color: 'rgba(0,0,0,0.3)'}}>{`   ${item.phoneNumbers[0].number}`}</Text>
                                        </Text>
                                    )
                                    : (
                                        <Text>{`${item.familyName} ${item.givenName}`}
                                            <Text style={{color: 'rgba(0,0,0,0.3)'}}>{`   ${item.phoneNumbers[0].number}`}</Text>
                                        </Text>
                                    )}
                                </View>
                                <View style={{
                                    flex: 1,
                                    alignItems: 'flex-end',
                                    justifyContent: 'center'
                                }}>
                                    {item.check
                                    ? (
                                        <Icon name="check-circle" size={30} color={'#1B9CFC'}></Icon>
                                    )
                                    : (
                                        <Icon name="circle-thin" size={30} color={'#cad3c8'}></Icon>
                                    )}
                                </View>
                            </TouchableOpacity>
                }}/>
                <View style={styles.buttons}>
                    <View style={styles.button}>
                        <Button onPress={() => { navigate('ContactsPage') }}
                            title="Cancel"
                            color="#FD7272"
                        />
                    </View>
                    <View style={styles.button}>
                        <Button onPress={ this.addContacts.bind(this) }
                            title="Add"
                            color="#3B3B98"
                        />
                    </View>
                </View>
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
    buttons: {
        flexDirection: 'row',
        backgroundColor: '#3B3B98',
    },
    button: {
        width: '50%',
    }
});

