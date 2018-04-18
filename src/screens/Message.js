import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import SmsAndroid  from 'react-native-get-sms-android';

class CustomMessage extends Component {
    render() {
      return (
        <TextInput
          {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
          editable = {true}
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
          message1: '',
          message2: '',
          cancel_message: '',
          latitude: null,
          longitude: null,
          error: null,
        };
    }

    componentDidMount() {
        this.updateMessage1();
        this.updateMessage2();
        this.check();
        this.updateCancelMessage();
    }

    async check() {
        let response = await AsyncStorage.getItem('emerg_message');
        console.log('emerg_message: '+ response);
    }

    async updateCancelMessage() {
        console.log('updateCancelMessage');
        var defaultCancelMessage = 'Hey, this is Paul. That was just a false alarm! Sorry about that.';

        let response = await AsyncStorage.getItem('cancel_message');
        if (response == null) {
            await AsyncStorage.setItem('cancel_message', defaultCancelMessage);
            this.setState({ cancel_message: defaultCancelMessage});
        }
        console.log('cancel_message: ' + this.state.cancel_message);
    }

    async updateMessage1() {
        console.log('updateMessage1');
        var defaultMessage1 = 'Hey, this is Paul. I am in an emergency situation right now and I need help!';

        let response = await AsyncStorage.getItem('message1');
        if (response == null) {
            await AsyncStorage.setItem('message1', defaultMessage1);
            this.setState({ message1: defaultMessage1});
        }
        console.log('message1: ' + this.state.message1);
    }

    async updateMessage2() {
        console.log('updateMessage2');
        let response = await AsyncStorage.getItem('message2');
        this.setState({ message2: response});
        console.log('message2: ' + this.state.message2);
    }

    async updateMessage() {
        console.log('updateMessage');
        this.setState({ emerg_message: this.state.message1 + this.state.message2 });
        await AsyncStorage.setItem('emerg_message', this.state.emerg_message);
    } 

    async saveMessage() {
        console.log("saving messages");
        AsyncStorage.setItem('message1', this.state.message1);
        AsyncStorage.setItem('emerg_message', this.state.message1 + this.state.message2);
        this.setState({
            emerg_message: this.state.message1 + this.state.message2,
        });
        AsyncStorage.setItem('cancel_message', this.state.cancel_message);
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
                        if(this.state.editState){
                            this.setState({ editState : false })
                        } else {
                            this.setState({ editState : true })
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
                                    multiline = {true}
                                    numberOfLines = {1}
                                    onChangeText={(message1) => this.setState({message1})}
                                    value={this.state.message1}
                                />
                            </View>
                        ) : (
                            <Text>{this.state.message1}</Text> 
                        )}
                    </View>
                </View>
                <View style={styles.header}>
                    <View style={styles.headerText}>
                        <Text>Cancel Message: </Text>
                        {this.state.editState ? (
                            <View>
                                <CustomMessage
                                    multiline = {true}
                                    numberOfLines = {1}
                                    onChangeText={(cancel_message) => this.setState({cancel_message})}
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