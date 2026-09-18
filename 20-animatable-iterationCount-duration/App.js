import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import * as Animatable from 'react-native-animatable';

export default function app(){
return(
<View style={styles.container}>
<Animatable.Text
style={styles.title}
//animation= "bounce"
//iterationCount={3}
//iterationCount={Infinity}
animation="tada"
duration={5000}

>
Meu aplicativo
</Animatable.Text>
</View>

)
}

const styles = StyleSheet .create({
  container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
  },
  title: {
    fontSize: 25
  }
})