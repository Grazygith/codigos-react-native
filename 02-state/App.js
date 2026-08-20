import React, { Component, component } from 'react';
import { View, Text, Button } from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: ''
    };

    //deixando a fiunção acessar as propriedades
    this.entrar = this.entrar.bind(this)
  }

  entrar() {
    this.setState({
      nome: 'Graziele'
    })
  }
  render() {
    return (
      <View style={{ marginTop: 50 }}>
        <Button title='Entrar' onPress={this.entrar} />
        <Text style={{ fontSize: 23, color: 'orange', textAlign: 'center' }}>
          {this.state.nome}
        </Text>
      </View>

    );
  }
}

export default App;
