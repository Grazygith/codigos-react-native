import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Button, Modal } from 'react-native';
import Entrarmodal from './src/Entrarmodal/Entrarmodal';
 
 
class App extends Component {
 
   constructor(props) {
      super(props);
      this.state = {
         modalVisible: false
      }
 
      this.entrar = this.entrar.bind(this);
      this.sair = this.sair.bind(this)
   }
 
   entrar() {
      this.setState({ modalVisible: true })
   }
 
   sair(visible) {
      this.setState({ modalVisible: visible })
   }
 
   render() {
      return (
         <View style={styles.container}>
            <Button title="Entrar" onPress={this.entrar} />
 
            {/* animationType aceita por exemplo: slide e fade */}
            <Modal transparent={true} animationType='fade' visible={this.state.modalVisible}>
               <View style={{margin: 15, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                  <Entrarmodal fecharmodal={() => this.sair(false)} />
               </View>
            </Modal>
 
         </View>
      )
   }
}
 
const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ddd'
   },
 
})
 
 
export default App;
 
 