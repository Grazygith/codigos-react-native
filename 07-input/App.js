import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button} from 'react-native';
 
class App extends Component{
 
   constructor(props){
      super(props);
      this.state = {
         nome: '',
         input: ''
      };
      // this.pegarNome = this.pegarNome.bind(this)
 
      this.entrar = this.entrar.bind(this);
   }
   
  /* pegarNome(texto){
      if(texto.length > 0){
         this.setState({nome: 'Boas vindas:' + texto})
      } else {
         this.setState({nome: ''})
      }
   }
      */
 
   entrar(){
      if(this.state.input === ""){
         alert("Digite o seu nome!");
         return;
      }
      this.setState({nome: "Boas vindas:" + this.state.input})
   }
 render() {
  return(
  <View style={styles.container}>
    <TextInput
    style={styles.input}
    placeholder='Digite o seu nome'
    underlineColorAndroid={'transparent'}
    onChangeText={(texto) => this.setState({input: texto})}
    >
    </TextInput>
     
    <Button title="Enviar" onPress={this.entrar} />
    <Text style={styles.texto}>{this.state.nome}</Text>
  </View>
  );
 }
}
 
const styles = StyleSheet.create({
 container:{
    flex: 1
 },
 input:{
    height: 45,
    marginBottom: 9,
    borderWidth: 1,
    borderColor: '#222222',
    margin: 10,
    fontSize: 20,
    padding: 10
 },
 texto: {
   textAlign: 'center',
   fontSize: 25
 }
})
 
export default App;
 
 