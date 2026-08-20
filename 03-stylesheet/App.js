import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class App extends Component {
  render() {
    return (
      <View style={styles.area}>
        <Text style={styles.textoPrincipal}>Primeiro texto</Text>
        <Text style={styles.alinhaTexto}>Segundo texto</Text>
        <Text>Terceiro texto</Text>
        <Text style={styles.textoPrincipal}>Quarto texto</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  area:{
    marginTop: 40
  },
  textoPrincipal:{
    fontSize: 25,
    color: '#24979f'
  },
  alinhaTexto:{
    textAlign: 'center'
  }

})

export default App;