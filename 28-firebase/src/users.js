import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { db } from "./firebaseConnection";
import { deleteDoc, doc } from 'firebase/firestore';


export function UsersList({ data, handleEdit }) {

    async function handleDeleteItem() {
        const docRef = doc(db, "clientes", data.id)
        await deleteDoc(docRef)
    }

    function handleEditItem(){
    handleEdit(data);
    }

    return (
        <View style={styles.container}>
            <Text>Nome: {data.nome}</Text>
            <Text>Idade: {data.idade}</Text>
            <Text>Email: {data.email}</Text>
            <TouchableOpacity style={styles.button} onPress={handleDeleteItem}>
                <Text style={styles.buttonText}>Deletar cliente</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonEdit} onPress={handleEditItem}>
                <Text style={styles.buttonText}>Alterar dados</Text>
            </TouchableOpacity>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F0F0F0",
        padding: 8,
        borderRadius: 4,
        marginBottom: 14
    },
    button: {
        backgroundColor: '#B3261E',
        alignSelf: 'flex-start',
        padding: 4,
        borderRadius: 4,
        marginTop: 16

    },
    buttonText: {
        color: '#FFF',
        paddingLeft: 8,
        paddingRight: 8
    },
    buttonEdit: {
        backgroundColor: '#2a096f',
        alignSelf: 'flex-start',
        padding: 4,
        borderRadius: 4,
        marginTop: 16
    }
})