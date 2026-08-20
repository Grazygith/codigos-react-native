import React, { Component } from "react";
import { View, Text } from "react-native";

class App extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFD7CF'}}>
        <View style={{ flex: 1, backgroundColor:'red'}}></View>
        <View style={{ flex: 1, backgroundColor:'green'}}></View>
        <View style={{ flex: 1, backgroundColor:'yellow'}}></View>
      </View>
    );
  }
}

export default App;