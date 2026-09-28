import React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import home from './src/pages/home';
import sobre from './src/pages/sobre';
import contato from './src/pages/contato';

const Stack = createNativeStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={home} 
        options={{
          title: 'tela inicial do app',
          headerStyle: {
            backgroundColor: '#121212',
          },
          headerTintColor: '#a7e121',
          //comando para sumir o cabeçalho
          headerShown: false
        }}
        />
        <Stack.Screen name="sobre" component={sobre} 
        options={{
          title: 'Sobre a empresa'
        }}
        />

         <Stack.Screen name="contato" component={contato} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}