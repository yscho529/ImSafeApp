import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    NativeAppEventEmitter,
    NativeEventEmitter,
    NativeModules,
    Platform,
    PermissionsAndroid,
    ListView,
    ScrollView,
    AppState,
    Dimensions,
    TouchableOpacity,
    FlatList,
    Button,
    AsyncStorage,
} from 'react-native';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button'
import BT from 'easy-bluetooth-classic';
import SmsAndroid  from 'react-native-get-sms-android';

export default class Devices extends Component {
    
    constructor(){
        super()
        this.state = {
          emerg_message: '',
          cancel_message: '',
          scanning:false,
          peripherals: [],
          connectedDevices: [],
          appState: '',
          removeState: false,
          modalVisible: false,
        }
    }

    componentDidMount() {
        
    }

    componentWillMount() {
        this.onDataReadEvent = BT.addOnDataReadListener(this.onDataRead.bind(this));
        this.onDeviceFoundEvent = BT.addOnDeviceFoundListener(this.onDeviceFound.bind(this));
        this.cancelBtn = this.cancelBtn.bind(this)        
        this.openModal = this.openModal.bind(this)
        this.scan = this.scan.bind(this)
        this.connectDevice = this.connectDevice.bind(this)
        this.renderScanList = this.renderScanList.bind(this)
        BT.startScan = BT.startScan.bind(this)

        var config = {
            "uuid": "00001101-0000-1000-8000-00805f9b34fb",
            "deviceName": "Bluetooth",
            "bufferSize": 1024,
            "characterDelimiter": "\n"
        }

        this.setState({ modalVisible: false })

        BT.init(config)
            .then(function (config) {
              console.log("config done!");
            })
            .catch(function (ex) {
              console.warn(ex);
            });
    }

    scan() {
        console.log('scanning...')
        this.setState({ scanning: true })

        BT.startScan()
            .then(function (devices) {
                this.setState({ peripherals: devices })
            }.bind(this))
            .catch(function (ex) {
                console.warn(ex);
            });

        console.log('done scanning')
    }

    connectDevice(item) {
        console.log('connect to: ' + item.name)
        BT.connect(item)
            .then(() => {
                var c = this.state.connectedDevices
                c.push(item)
                this.setState({ connectedDevices: c })
                console.log("Connected!");
            })
            .catch((ex) => {
                console.warn(ex);
            })
        
        this.setState({ modalVisible: false })
    }

    onDataRead(data) {
        console.log("onDataRead");
        console.log('data: ' + data)
        console.log('data string lenght: ' + data.toString().length)
        if (data.toString().length == 5) {
            this.getEmergencyMessage();
            SmsAndroid.autoSend('6786779310', this.state.emerg_message, (fail) => {
                console.log("Failed with this error: " + fail)
            }, (success) => {
                console.log("SMS sent successfully");
            });
        } else if (data.toString().length == 7) {
            this.getCancelMessage();
            SmsAndroid.autoSend('6786779310', this.state.cancel_message, (fail) => {
                console.log("Failed with this error: " + fail)
            }, (success) => {
                console.log("SMS sent successfully");
            });
        }
      }

    async getEmergencyMessage() {
        console.log('get emergency message');
        let response = await AsyncStorage.getItem('emerg_message');
        this.setState({ emerg_message: response });
        this.getGPS();
    }

    async getGPS() {
        console.log('getGPS');
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
                this.updateMessage(position.coords);
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 2000, maximumAge: 1000 },
        );
    }
  
    async updateMessage(coords) {
        console.log('updateMessage');
        this.setState({ emerg_message: this.state.emerg_message +
            ' My current location is https://www.google.com/maps/search/?api=1&query=' +
            coords.latitude + ',' + coords.longitude});
    }

    async getCancelMessage() {
        let response = await AsyncStorage.getItem('cancel_message');
        this.setState({ cancel_message: response });
    }

    onDeviceFound(device) {
        console.log("onDeviceFound");
        console.log(device);
        var p = this.state.peripherals
        p.push(device)
        this.setState({ peripherals: p })
        console.log(this.state.peripherals)
    }

    removeDevices() {
        
    }

    btDevicesModal() {

    }

    openModal(visible) {
        this.setState({ modalVisible: visible })
        // this.scan()
    }

    cancelBtn() {
        console.log('cancel')
        this.setState({ selectedDevices: [] })
        for(var device of this.state.connectedDevices){
            device.check = false;
        }
        this.setState({ removeState: false })
    }

    renderScanList() {
        console.log('renderScanList')
        console.log(this.state.peripherals.length > 0)
        return <FlatList data={(this.state.peripherals.length > 0 ? this.state.peripherals : null)}
                keyExtractor={item => item.address} 
                extraData={this.state} 
                ListHeaderComponent={this.renderHeader} 
                renderItem= {({item}) => {
                    return <TouchableOpacity style={{
                                    flexDirection: 'row',
                                    // padding: 10,
                                    borderBottomWidth: 1,
                                    borderStyle: 'solid',
                                    borderColor: 'rgba(88, 177, 159, 0.2)'
                                }} 
                                onPress={() => { this.connectDevice(item) }}>
                                    {/* <View style={{
                                        flex: 3,
                                        alignItems: 'flex-start',
                                        justifyContent: 'center'
                                    }}>
                                        <Text>
                                            {item.name}
                                            <Text style={{color: 'rgba(0,0,0,0.3)'}}>  {item.address}</Text>
                                        </Text>
                                    </View> */}
                                    <Text>
                                        {item.name}
                                        <Text style={{color: 'rgba(0,0,0,0.3)'}}>  {item.address}</Text>
                                    </Text>
                            </TouchableOpacity>
            }}/>
    }

    listRender(item) {
        return (item !== "undefined" ? 
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
                                        {item.name}
                                        <Text style={{color: 'rgba(0,0,0,0.3)'}}>  {item.address}</Text>
                                    </Text>
                                ) : (
                                    <Text>
                                        {item.name}
                                        <Text style={{color: 'rgba(0,0,0,0.3)'}}>  {item.address}</Text>
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
                                        {item.name}
                                        <Text style={{color: 'rgba(0,0,0,0.3)'}}>  {item.address}</Text>
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
                            <Text>Select Devices to Remove:</Text>
                        ) : (
                            <Text>List of Connected Devices:</Text>
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
                <FlatList data={(this.state.connectedDevices.length > 0 ? this.state.connectedDevices : null)}
                        keyExtractor={item => item.address} 
                        extraData={this.state} 
                        ListHeaderComponent={this.renderHeader} 
                        renderItem= {({item}) => (this.listRender(item))}/>
                {this.state.removeState ? (
                    <View style={styles.buttons}>
                        <View style={styles.button}>
                            <Button onPress={ () => { this.setState({ removeState: false }) } }
                                title="Cancel"
                                color="#1B9CFC"
                            />
                        </View>
                        <View style={styles.button}>
                            <Button onPress={ () => { console.log('a') } }
                                title="Remove"
                                color="#FD7272"
                            />
                        </View>
                    </View>                    
                ) : (
                    <ActionButton buttonColor='#3B3B98' onPress={ () => { this.openModal(true) } }>
                    </ActionButton>
                )}
                <Modal isVisible={ this.state.modalVisible }
                        backdropColor={"black"}
                        backdropOpacity={0.5}
                        animationIn="slideInUp"
                        animationOut="slideOutDown"
                        animationInTiming={1000}
                        animationOutTiming={1000}
                        backdropTransitionInTiming={1000}
                        backdropTransitionOutTiming={1000}>
                    <View style={styles.modalContent}>
                        <View>
                            <Text style={{ 
                                fontWeight: 'bold'
                            }}>Connect A Device</Text>
                        </View>
                        <Text>Select a device to connect</Text>
                        <View style={styles.scanList}>
                            { this.renderScanList() }
                            {/* <Text>{ this.state.scanning ? 'Scanning...' : 'Not Scanning' }</Text> */}
                        </View>
                        <View style={styles.modalButtons}>
                            <TouchableHighlight
                                activeOpacity={0.5}
                                underlayColor='rgba(0,0,0,0)'
                                onPress={() => {
                                    this.setState({ modalVisible: false })
                                }}>
                                <View style={styles.buttonBack}>
                                    <Text>Back</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                activeOpacity={0.5}
                                underlayColor='rgba(0,0,0,0)'
                                onPress={this.scan}>
                                <View style={styles.buttonScan}>
                                    <Text>Scan</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scroll: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        margin: 10,
    },
    row: {
        margin: 10
    },
    buttons: {
        flexDirection: 'row',
        marginTop: 20,
        backgroundColor: '#FD7272',
    },
    button: {
        width: '50%',
    },
    buttonScan: {
        backgroundColor: "lightblue",
        padding: 12,
        margin: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    buttonBack: {
        backgroundColor: "lightblue",
        padding: 12,
        margin: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    scanList: {
        backgroundColor: "white",
        justifyContent: "center",
        marginTop:10,
        padding: 50,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(44,58,71,0.5)"
    },
    modalContent: {
        backgroundColor: "white",
        padding: 22,
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    }
});