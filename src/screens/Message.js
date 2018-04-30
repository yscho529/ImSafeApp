import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button, AsyncStorage, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import SmsAndroid from 'react-native-get-sms-android';

class CustomMessage extends Component {
    render() {
        return (
            <TextInput
                {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
                editable={true}
            />
        );
    }
}

// create a component
export default class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editState: false,
            emerg_message: '',
            cancel_message: '',
            latitude: null,
            longitude: null,
            error: null,
        };
    }

    componentDidMount() {
        this.updateEmergencyMessage();
        this.updateCancelMessage();
    }

    async updateEmergencyMessage() {
        let response = await AsyncStorage.getItem('emerg_message');
        this.setState({ emerg_message: response });
    }

    async updateCancelMessage() {
        let response = await AsyncStorage.getItem('cancel_message');
        this.setState({ cancel_message: response });
    }

    async saveMessage() {
        console.log("saving messages");
        await AsyncStorage.setItem('emerg_message', this.state.emerg_message);
        await AsyncStorage.setItem('cancel_message', this.state.cancel_message);
        console.log("saved messages");
        this.setState({ editState: False });
    }

    render() {
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
                        if (this.state.editState) {
                            this.setState({ editState: false })
                        } else {
                            this.setState({ editState: true })
                        }
                    }}>
                    <View style={{
                        flex: 3,
                        alignItems: 'flex-start',
                        justifyContent: 'center'
                    }}>
                        {this.state.editState ? (
                            <Text>Editing Custom Messages:</Text>
                        ) : (
                                <Text>Click to Edit Custom Messages:</Text>
                            )}
                    </View>
                    <View style={{
                        flex: 1,
                        alignItems: 'flex-end',
                        justifyContent: 'center'
                    }}>
                        <Icon name="edit" size={30} color={'#FD7272'}></Icon>
                    </View>
                </TouchableOpacity>
                <View style={styles.header}>
                    <View style={styles.headerText}>
                        <Text>Emergency Message: </Text>
                        {this.state.editState ? (
                            <View>
                                <CustomMessage
                                    multiline={true}
                                    numberOfLines={1}
                                    maxLength={150}
                                    onChangeText={(emerg_message) => this.setState({ emerg_message })}
                                    value={this.state.emerg_message}
                                />
                            </View>
                        ) : (
                                <Text>{this.state.emerg_message}</Text>
                            )}
                    </View>
                </View>
                <View style={styles.header}>
                    <View style={styles.headerText}>
                        <Text>Cancel Message: </Text>
                        {this.state.editState ? (
                            <View>
                                <CustomMessage
                                    multiline={true}
                                    numberOfLines={1}
                                    maxLength={150}
                                    onChangeText={(cancel_message) => this.setState({ cancel_message })}
                                    value={this.state.cancel_message}
                                />
                                <Button onPress={this.saveMessage.bind(this)}
                                    title="Save"
                                    color="#25CCF7"
                                    borderBottomWidth="1"
                                />
                            </View>
                        ) : (
                                <Text>{this.state.cancel_message}</Text>
                            )}
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
    header: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgba(88, 177, 159, 0.2)'
    },
    headerText: {
        flex: 3,
        alignItems: 'flex-start',
        justifyContent: 'center'
    }
});