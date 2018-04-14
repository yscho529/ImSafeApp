import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, AsyncStorage, TouchableOpacity, Button } from 'react-native'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/FontAwesome'
import { StackNavigator } from 'react-navigation'
import { ContactsNav } from '../config/router'

var Contacts = require('react-native-contacts')

// create a component
export default class ContactsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            removeState: false,
            emergContacts: [],
            selectedContacts: []
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
        parsedResponse.map(info => {
            info.check = false;
            return parsedResponse;
        })
        this.setState({
            emergContacts: parsedResponse.sort((a,b) => {return a.givenName.localeCompare(b.givenName) }),
        })
        console.log(this.state.emergContacts)
    }

    press = (hey) => {
        this.state.emergContacts.map((item) => {
            console.log(item)
            if (item.givenName+item.familyName === hey.givenName+hey.familyName) {
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
          this.setState({emergContacts: this.state.emergContacts})
    }

    cancelBtn() {
        this.setState({ selectedContacts: []})
        for(var contact of this.state.emergContacts){
            contact.check = false;
        }
        this.setState({ removeState: false })
    }

    removeContacts() {
        console.log(this.state.emergContacts)
        var _e = this.state.emergContacts
        for(var contact of this.state.selectedContacts){
            _e = _e.filter(el => el.givenName+el.familyName !== contact.givenName+contact.familyName)
        }

        AsyncStorage.setItem('emergContacts', JSON.stringify(_e));
        this.setState({ emergContacts: _e })
        this.setState({ removeState: false })
    }

    listRender(item) {
        return (item !== "undefined" && 
                item.givenName !== "undefined" && 
                item.familyName !== "undefined" && 
                item.phoneNumbers.length > 0 &&
                item.phoneNumbers[0].number !== "undefined" ? 
                (
                    this.state.removeState ? (<TouchableOpacity style={{
                            flexDirection: 'row',
                            padding: 10,
                            borderBottomWidth: 1,
                            borderStyle: 'solid',
                            borderColor: 'rgba(88, 177, 159, 0.2)'
                        }}

                        onPress={() => {
                            this.press(item)
                        }}>
                            <View style={{
                                flex: 3,
                                alignItems: 'flex-start',
                                justifyContent: 'center'
                            }}>
                                {item.check ? (
                                    <Text style={{
                                        fontWeight: 'bold'
                                        }}>
                                        {item.givenName} {item.familyName}
                                        <Text style={{color: 'rgba(0,0,0,0.3)'}}>  {item.phoneNumbers[0].number}</Text>
                                    </Text>
                                ) : (
                                    <Text>
                                        {item.givenName} {item.familyName}
                                        <Text style={{color: 'rgba(0,0,0,0.3)'}}>  {item.phoneNumbers[0].number}</Text>
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
                                    <Icon name="minus-circle" size={30} color={'#FD7272'}></Icon>
                                )
                                : (
                                    <Icon name="circle-thin" size={30} color={'#cad3c8'}></Icon>
                                )}
                            </View>
                        </TouchableOpacity>
                        ) : (
                            <View style={{
                                flexDirection: 'row',
                                padding: 10,
                                borderBottomWidth: 1,
                                borderStyle: 'solid',
                                borderColor: 'rgba(88, 177, 159, 0.2)',
                            }}>
                                <View style={{
                                    flex: 3,
                                    alignItems: 'flex-start',
                                    justifyContent: 'center'
                                }}>
                                    <Text>
                                        {item.givenName} {item.familyName}
                                        <Text style={{color: 'rgba(0,0,0,0.3)'}}>  {item.phoneNumbers[0].number}</Text>
                                    </Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    alignItems: 'flex-end',
                                    justifyContent: 'center'
                                }}>
                                    <Icon name="circle-thin" size={30} color={'rgba(0,0,0,0)'}></Icon>
                                </View>
                            </View>
                        )
                    ) : (
                        <Text>No</Text>
                    ));
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <TouchableOpacity style={{
                        flexDirection: 'row',
                        padding: 10,
                        borderBottomWidth: 1,
                        borderStyle: 'solid',
                        borderColor: 'rgba(88, 177, 159, 0.2)'
                    }}
                    onPress={() => {
                        if(this.state.removeState){
                            this.cancelBtn()
                        } else {
                            this.setState({ removeState : true })
                        }
                    }}>
                    <View style={{
                        flex: 3,
                        alignItems: 'flex-start',
                        justifyContent: 'center'
                    }}>
                        {this.state.removeState ? (
                            <Text style={styles.heading}>Select Contacts to Remove:</Text>
                        ) : (
                            <Text style={styles.heading}>List of Added Emergency Contacts:</Text>
                        )}
                    </View>
                    <View style={{
                        flex: 1,
                        alignItems: 'flex-end',
                        justifyContent: 'center'
                    }}>
                        <Icon name="bars" size={30} color={'#FD7272'}></Icon>
                    </View>
                </TouchableOpacity>
                <FlatList data={this.state.emergContacts} 
                        keyExtractor={item => item.givenName+item.familyName} 
                        extraData={this.state} 
                        ListHeaderComponent={this.renderHeader} 
                        renderItem= {({item}) => (this.listRender(item))}/>
                {this.state.removeState ? (
                    <View style={styles.buttons}>
                        <View style={styles.button}>
                            <Button onPress={ this.cancelBtn.bind(this) }
                                title="Cancel"
                                color="#1B9CFC"
                            />
                        </View>
                        <View style={styles.button}>
                            <Button onPress={ this.removeContacts.bind(this) }
                                title="Remove"
                                color="#FD7272"
                            />
                        </View>
                    </View>                    
                ) : (
                    <ActionButton buttonColor='#EAB543' onPress={() => {}}>
                        <ActionButton.Item buttonColor='#BDC581' title="From Contacts" onPress={() => { navigate('UserContacts') }}>
                            <Icon name="address-book" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        <ActionButton.Item buttonColor='#FEA47F' title="Input Manually" onPress={() => { navigate('UserContactInput') }}>
                            <Icon name="edit" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                    </ActionButton>
                )}
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
    buttons: {
        flexDirection: 'row',
        marginTop: 20,
        backgroundColor: '#FD7272',
    },
    button: {
        width: '50%',
    }
});

