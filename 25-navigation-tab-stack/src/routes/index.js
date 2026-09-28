import React from 'react';
 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Feather from 'react-native-vector-icons/Feather';
 
import Stack from './stack';
import Sobre from '../pages/sobre';
import Contato from '../pages/contato';
 
const Tab = createBottomTabNavigator();
 
export default function Routes(){
  return(
     <Tab.Navigator
     screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#ffa1a1',
      tabBarStyle: {
        backgroundColor: '#680209',
        borderTopWidth: 0
      }
     }}
     >


      <Tab.Screen name='HomeStack' component={Stack}
      options={{
        tabBarIcon:({ color, size}) => {
          return <Feather  name="home" color={color} size={size}/>
        }
          
      }}
      />
      <Tab.Screen name='Sobre' component={Sobre} 
  
   options={{
        tabBarIcon:({ color, size}) => {
          return <Feather  name="file-text" color={color} size={size}/>
        }
          
      }}
      />
      <Tab.Screen name='Contato' component={Contato} 
        options={{
        tabBarIcon:({ color, size}) => {
          return <Feather  name="phone-call" color={color} size={size}/>
        }
          
      }}
      />
     </Tab.Navigator>
  )
}
 