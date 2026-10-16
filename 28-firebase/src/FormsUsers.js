import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, ScrollView } from 'react-native';
import { db } from './firebaseConnection';
import { doc, getDoc, onSnapshot, setDoc, collection, addDoc, getDocs, updateDoc } from 'firebase/firestore';

import { UsersList } from './users';
export default function FormsUsers () {

  const [nome, setNome] = useState("")
  const [idade, setIdade] = useState("")
  const [email, setEmail] = useState("")

  const [users, setUsers] = useState([])

  const [showForm, setShowForm] = useState(true)
  const [isEditing, setIsEditing] = useState("")

  useEffect(() => {
    async function getDados() {
      const usersRef = collection(db, "clientes");

      onSnapshot(usersRef, (snapshot) => {
        let lista = [];
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            nome: doc.data().nome,
            idade: String(doc.data().idade),
            email: doc.data().email
          })
        })
        setUsers(lista);
      })
    } 
    getDados();
  }, [])

  async function handleRegister() {
    await addDoc(collection(db, "clientes"), {
      nome: nome,
      idade: Number(idade),
      email: email
    })
      .then(() => {
        console.log("Cadastro realizado!")
        setNome("")
        setIdade("")
        setEmail("")
      })
      .catch((erro) => {
        console.log(erro)
      })
  }

  function handleToggle() {
    setShowForm(!showForm);
  }

  function editUser(data) {
    setNome(data.nome)
    setIdade(String(data.idade))
    setEmail(data.email)
    setIsEditing(data.id)
  }

  async function handleEditUser() {
    const docRef = doc(db, "clientes", isEditing)
    await updateDoc(docRef, {
      nome: nome,
      idade: Number(idade),
      email: email
    })
    setNome("")
    setIdade("")
    setEmail("")
    setIsEditing("")
  }

  function handleCancelarEdit() {
    setNome("")
    setIdade("")
    setEmail("")
    setIsEditing("")
  }

  return (
    <View style={styles.container}>
      {/* ScrollView adicionada aqui para rolar apenas o formulário */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {showForm && (
          <View>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
              style={styles.input}
              placeholder='Digite seu nome...'
              value={nome}
              onChangeText={(text) => setNome(text)}
            />

            <Text style={styles.label}>Idade:</Text>
            <TextInput
              style={styles.input}
              placeholder='Digite sua idade...'
              value={idade}
              onChangeText={(text) => setIdade(text)}
            />

            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder='Digite seu email...'
              value={email}
              onChangeText={(text) => setEmail(text)}
            />

            {isEditing !== "" ? (
              <View>
                <TouchableOpacity style={styles.buttonEnviarEditado} onPress={handleEditUser}>
                  <Text style={styles.buttonTextEnviarEditado}>Enviar editado</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonCancel} onPress={handleCancelarEdit}>
                  <Text style={styles.buttonCancelText}>Cancelar edição</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Adicionar</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        <TouchableOpacity style={{ marginTop: 8 }} onPress={handleToggle}>
          <Text style={{ textAlign: "center", color: "#000", fontSize: 15 }}>
            {showForm ? "Esconder o formulário" : "Mostrar o formulário"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Text style={{ marginTop: 14, marginLeft: 8, fontSize: 20, color: "#000" }}>
        Usuários:
      </Text>

      <FlatList
        style={styles.list}
        data={users}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <UsersList data={item} handleEdit={editUser} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40
  },
  button: {
    backgroundColor: '#a9a9a9',
    borderRadius: 5,
    margin: 15
  },
  buttonText: {
    padding: 8,
    color: '#d4ff13',
    textAlign: 'center',
    fontSize: 15
  },
  label: {
    color: "#000",
    margin: 8
  },
  input: {
    borderWidth: 1,
    margin: 8,
    borderRadius: 10,
    paddingHorizontal: 8
  },
  list: {
    margin: 8
  },
  buttonEnviarEditado: {
    backgroundColor: "#ab7312",
    borderRadius: 2,
    margin: 8
  },
  buttonTextEnviarEditado: {
    padding: 8,
    color: "#000",
    textAlign: 'center',
    fontSize: 15
  },
  buttonCancel: {
    backgroundColor: '#8a8a8a',
    borderRadius: 2,
    marginHorizontal: 8,
    marginBottom: 8
  },
  buttonCancelText: {
    padding: 8,
    color: '#1a0dc7',
    textAlign: 'center',
    fontSize: 15
  }
});