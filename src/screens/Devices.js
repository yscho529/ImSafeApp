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
    PermissionsAndroid,
    TouchableOpacity,
    FlatList,
    Button,
} from 'react-native';
<<<<<<< HEAD
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button'
import BT from 'easy-bluetooth-classic';
import SmsAndroid  from 'react-native-get-sms-android';

=======
import BleManager from 'react-native-ble-manager';

const window = Dimensions.get('window');
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

// create a component
>>>>>>> 7760864c50558757b0ea475ea083f5c6c64f2dd8
export default class Devices extends Component {
    
    constructor(){
        super()
        this.state = {
          scanning:false,
          peripherals: [],
          connectedDevices: [],
          appState: '',
          removeState: false,
          modalVisible: false,
        }
<<<<<<< HEAD
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

        // this.setState({ connectedDevices: new Map() })
        // this.setState({ peripherals: new Map() })
        this.setState({ modalVisible: false })

        BT.init(config)
            .then(function (config) {
              console.log("config done!");
            })
            .catch(function (ex) {
              console.warn(ex);
            });

        // BT.startScan()
        //     .then(function (devices) {
        //         this.setState({ peripherals: devices })
        //     })
        //     .catch(function (ex) {
        //         console.warn(ex);
        //     });

        // var dev = {
        //     name: "test",
        //     address: "33"
        // }
        // this.state.peripherals.push(dev)
        // console.log(this.state.peripherals)
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
        console.log(data);
        
        SmsAndroid.autoSend('6786779310', this.getMessage(), (fail) => {
            console.log("Failed with this error: " + fail)
        }, (success) => {
            console.log("SMS sent successfully");
=======
    
        this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
        this.handleStopScan = this.handleStopScan.bind(this);
        this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
        this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);

        BleManager.start({showAlert: false});

        this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral );
        this.handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', this.handleStopScan );
        this.handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral );
        this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic );
    }

    componentWillUnmount() {
        this.handlerDiscover.remove();
        this.handlerStop.remove();
        this.handlerDisconnect.remove();
        this.handlerUpdate.remove();
      }

    handleAppStateChange(nextAppState) {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
          console.log('App has come to the foreground!')
          BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
            console.log('Connected peripherals: ' + peripheralsArray.length);
          });
        }
        this.setState({appState: nextAppState});
      }

    startScan() {
        if (!this.state.scanning) {
          this.setState({peripherals: new Map()});
          BleManager.scan([], 3, true).then((results) => {
            console.log('Scanning...');
            this.setState({scanning:true});
          });
        }
      }

    handleStopScan() {
        console.log('Scan is stopped');
        this.setState({ scanning: false });
      }

    retrieveConnected(){
        BleManager.getConnectedPeripherals([]).then((results) => {
          console.log(results);
          var peripherals = this.state.peripherals;
          for (var i = 0; i < results.length; i++) {
            var peripheral = results[i];
            peripheral.connected = true;
            peripherals.set(peripheral.id, peripheral);
            this.setState({ peripherals });
          }
>>>>>>> 7760864c50558757b0ea475ea083f5c6c64f2dd8
        });
      }

<<<<<<< HEAD
    async getMessage() {
        let response = await AsyncStorage.getItem('emerg_message')
        return response
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
=======
    handleDiscoverPeripheral(peripheral){
        var peripherals = this.state.peripherals;
        if (!peripherals.has(peripheral.id)){
          console.log('Got ble peripheral', peripheral);
          peripherals.set(peripheral.id, peripheral);
          this.setState({ peripherals })
        }
      }

    handleDisconnectedPeripheral(data) {
        let peripherals = this.state.peripherals;
        let peripheral = peripherals.get(data.peripheral);
        if (peripheral) {
          peripheral.connected = false;
          peripherals.set(peripheral.id, peripheral);
          this.setState({peripherals});
        }
        console.log('Disconnected from ' + data.peripheral);
      }

    handleUpdateValueForCharacteristic(data) {
        console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
      }

    test(peripheral) {
        if (peripheral){
          if (peripheral.connected){
            BleManager.disconnect(peripheral.id);
          }else{
            BleManager.connect(peripheral.id).then(() => {
              let peripherals = this.state.peripherals;
              let p = peripherals.get(peripheral.id);
              if (p) {
                p.connected = true;
                peripherals.set(peripheral.id, p);
                this.setState({peripherals});
              }
              console.log('Connected to ' + peripheral.id);
    
    
              setTimeout(() => {
    
                /* Test read current RSSI value
                BleManager.retrieveServices(peripheral.id).then((peripheralData) => {
                  console.log('Retrieved peripheral services', peripheralData);
                  BleManager.readRSSI(peripheral.id).then((rssi) => {
                    console.log('Retrieved actual RSSI value', rssi);
                  });
                });*/
    
                // Test using bleno's pizza example
                // https://github.com/sandeepmistry/bleno/tree/master/examples/pizza
                BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
                  console.log(peripheralInfo);
                  var service = '13333333-3333-3333-3333-333333333337';
                  var bakeCharacteristic = '13333333-3333-3333-3333-333333330003';
                  var crustCharacteristic = '13333333-3333-3333-3333-333333330001';
    
                  setTimeout(() => {
                    BleManager.startNotification(peripheral.id, service, bakeCharacteristic).then(() => {
                      console.log('Started notification on ' + peripheral.id);
                      setTimeout(() => {
                        BleManager.write(peripheral.id, service, crustCharacteristic, [0]).then(() => {
                          console.log('Writed NORMAL crust');
                          BleManager.write(peripheral.id, service, bakeCharacteristic, [1,95]).then(() => {
                            console.log('Writed 351 temperature, the pizza should be BAKED');
                            /*
                            var PizzaBakeResult = {
                              HALF_BAKED: 0,
                              BAKED:      1,
                              CRISPY:     2,
                              BURNT:      3,
                              ON_FIRE:    4
                            };*/
                          });
                        });
    
                      }, 500);
                    }).catch((error) => {
                      console.log('Notification error', error);
                    });
                  }, 200);
                });
    
              }, 900);
            }).catch((error) => {
              console.log('Connection error', error);
            });
          }
>>>>>>> 7760864c50558757b0ea475ea083f5c6c64f2dd8
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

<<<<<<< HEAD
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
=======
      render() {
        const list = Array.from(this.state.peripherals.values());
        const dataSource = ds.cloneWithRows(list);
        
        return (
          <View style={styles.container}>
            <TouchableHighlight style={{marginTop: 40,margin: 20, padding:20, backgroundColor:'#ccc'}} onPress={() => this.startScan() }>
              <Text>Scan Bluetooth ({this.state.scanning ? 'on' : 'off'})</Text>
            </TouchableHighlight>
            <TouchableHighlight style={{marginTop: 0,margin: 20, padding:20, backgroundColor:'#ccc'}} onPress={() => this.retrieveConnected() }>
              <Text>Retrieve connected peripherals</Text>
            </TouchableHighlight>
            <ScrollView style={styles.scroll}>
              {(list.length == 0) &&
                <View style={{flex:1, margin: 20}}>
                  <Text style={{textAlign: 'center'}}>No peripherals</Text>
                </View>
              }
              <ListView
                enableEmptySections={true}
                dataSource={dataSource}
                renderRow={(item) => {
                  const color = item.connected ? 'green' : '#fff';
                  return (
                    <TouchableHighlight onPress={() => this.test(item) }>
                      <View style={[styles.row, {backgroundColor: color}]}>
                        <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10}}>{item.name}</Text>
                        <Text style={{fontSize: 8, textAlign: 'center', color: '#333333', padding: 10}}>{item.id}</Text>
                      </View>
                    </TouchableHighlight>
                  );
                }}
              />
            </ScrollView>
          </View>
>>>>>>> 7760864c50558757b0ea475ea083f5c6c64f2dd8
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