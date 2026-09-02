import React, { use, useState, useEffect, useMemo, useRef } from 'react';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard} from 'react-native';

export default function App() {
  const [nome, setNome] = useState('');
  const [input, setInput] = useState('');
  const nomeInput = useRef(null);

  function alterarNome() {
    if (input.trim === '') return; // Evita salvar nomes vazios 
    setNome(input);
    setInput('');
    Keyboard.dismiss(); // Fecha o teclado automaticamente ao clicar no botão
  }

   function novoNome(){
    nomeInput.current.focus();
  }


  useEffect(() => {
    async function getStorage() {
      try {
        const nomeStorage = await AsyncStorage.getItem('nomes');
        if (nomeStorage !== null) {
          setNome(nomeStorage)
        }
      } catch (error) {
        console.log("Erro ao buscar dados:", error);
      }
    }

    getStorage();
  }, []);

  useEffect(() => {
    async function saveStorage() {
      try {
        if (nome !== '') {
          await AsyncStorage.setItem('nomes', nome);
        }
      } catch (error) {
        console.log("Erro ao salvar dados:", error);
      }
    }
    saveStorage();
  }, [nome]);

  const letrasNome = useMemo(() => {
   console.log("Mudou o texto");
   return nome.length;
  }, [nome]);

 
  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Digite seu nome aqui'
        value={input}
        onChangeText={(texto) => setInput(texto)}
        ref={nomeInput}
      />
      <TouchableOpacity style={styles.btn} onPress={alterarNome}>
        <Text style={styles.btnText}>Alterar nome</Text>
      </TouchableOpacity>
      <Text style={styles.texto}>
        {nome}
      </Text>

      <Text style={styles.texto}>
        Tem {letrasNome} caracteres.
      </Text>

    <TouchableOpacity style={styles.btnNovo} onPress={novoNome}>
      <Text style={styles.btnText}>Novo Nome</Text>
    </TouchableOpacity>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15
  },
  texto: {
    color: "#'87CEFA",
    fontSize: 25,
  },
  btn: {
    backgroundColor: "#0c6969ff",
    alignItems: 'center',
    marginTop: 20,
    margin: 40,
    borderRadius: 10,
    padding: 10

  },
  btnText: {
    color: "#ffffff"
  },
  btnNovo:{
    backgroundColor: '#72109f',
    alignItems: 'center',
    marginTop: 400,
    padding: 10
  }
})