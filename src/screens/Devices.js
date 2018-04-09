import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    AppRegistry,
    TouchableHighlight,
    ListView,
    ScrollView,
} from 'react-native';

import BleManager from 'react-native-ble-manager';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

// create a component
export default class Devices extends Component {
    
    constructor(){
        super()
    
        this.state = {
          scanning:false,
          peripherals: new Map(),
          appState: ''
        }
    }

    componentDidMount() {
        BleManager.start({showAlert: false});
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
        });
    }

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
                            <TouchableHighlight>
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
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        width: window.width,
        height: window.height
    },
    scroll: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        margin: 10,
    },
    row: {
        margin: 10
    },
});