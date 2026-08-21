import React, { Component } from 'react';
import { View, Text } from 'react-native';

class App extends Component {
  render() {
    return (

    //Justify aceita por exemplo: center, flex-end, space-between, space-around...
    // flexDirection aceita por exemplo: row, column...
      <View style={{ flex: 1, flexDirection: 'column',justifyContent: "center", alignItems: 'center' }}>
        <View style={{ width: 100, height: 100, backgroundColor: 'red' }}></View>
        <View style={{ width: 100, height: 100, backgroundColor: 'blue' }}></View>
        <View style={{ width: 100, height: 100, backgroundColor: 'green' }}></View>
      </View>
    );
  }
}

export default App;