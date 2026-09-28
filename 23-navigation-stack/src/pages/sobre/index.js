import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import { useRoute, useNavigation } from "@react-navigation/native";

export default function Sobre(){

    const route = useRoute();
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <Text>Tela Sobre</Text>
            <Text>{route.params?.nome}</Text>
            <Text>{route.params?.email}</Text>
            <Button title="Vá para contatos" onPress={() => navigation.navigate('contato')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})