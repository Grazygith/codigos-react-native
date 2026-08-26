import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Pessoa from "./src/Pessoas/index";
 
class App extends Component{
 
   constructor(props){
      super(props);
      this.state = {
      feed: [
         {id: "1", nome: "Ana", idade: 36, email: 'ana@senac.com'},
         {id: "2", nome: "Fabiana", idade: 46, email: 'fabiana@senac.com'},
         {id: "3", nome: "Luan", idade: 17, email: 'luan@senac.com'},
         {id: "4", nome: "Marli", idade: 49, email: 'marli@senac.com'},
         {id: "5", nome: "Ivan", idade: 20, email: 'ivan@senac.com'},
         {id: "6", nome: "Edgar", idade: 59, email: 'edgar@senac.com'}
      ]
   }
   }
   render() {
      return(
         <View style={styles.container}>
           <FlatList
           data={this.state.feed}
           keyExtractor={(item) => item.id}
           renderItem={({item}) => <Pessoa data={item} /> }
           />
         </View>
      )
   }
}
 
const styles = StyleSheet.create({
   container: {
      flex: 1
   },
  
})
 

export default App;
 
 