import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Contacts from 'react-native-contacts';

// create a component
export default class UserContacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allContacts: null,
            selectedContacts: []
        };
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

    render() {
        return (
            <View style={styles.container}>
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
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

