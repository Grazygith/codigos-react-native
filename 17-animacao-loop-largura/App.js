import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function App(){
  const larguraAnimada = useRef(new Animated.Value(150)).current;
  const alturaAnimada = useRef(new Animated.Value(50)).current;
  const opacidadeAnimada = useRef(new Animated.Value(1)).current;

  useEffect(() => {
   Animated.loop(
    Animated.sequence([
      Animated.timing(larguraAnimada, {
        toValue: 300,
        duration: 2000,
        useNativeDriver: false
      }),

        Animated.timing(larguraAnimada, {
        toValue: 150,
        duration: 2000,
        useNativeDriver: false
      })
    ])
   ).start()
  }, [])


  return(
    <View style = {styles.container}>
      <Animated.View
      style={{
        width: larguraAnimada,
        height: alturaAnimada,
        backgroundColor: '#456787',
        justifyContent: 'center',
        opacity: opacidadeAnimada,
        borderRadius: 30
      }}
      >
        <Text style={{textAlign: 'center', fontSize: 20, color: '#fff'}}>
          Testando efeito...
        </Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})