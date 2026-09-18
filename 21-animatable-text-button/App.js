import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';

import * as Animatable from 'react-native-animatable';

export default function app() {

  const ButtonAnimated = Animatable.createAnimatableComponent(TouchableOpacity);
  const buttonRef = useRef(null);

  function handleClick() {
    buttonRef.current.bounce()
  }
  return (
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

      <ButtonAnimated style={styles.button}
        //animation="fadeInUp"
        animation="lightSpeedIn"
        ref={buttonRef}
        onPress={{ handleClick }}
      >
        <Text style={{ color: "#fff" }}>Animar</Text>
      </ButtonAnimated>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 25
  },
  button: {
    width: '70%',
    height: 40,
    backgroundColor: '#782121',
    justifyContent: 'center',
    marginTop: 15,
    alignItems: 'center',
    borderRadius: 20
  }
})