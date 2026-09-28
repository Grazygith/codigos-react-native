import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function Home(){

    const navigation = useNavigation();

    function navegaSobre(){
        navigation.navigate('sobre', { nome: 'Ana', email: 'ana@gmail.com'})
    }
    
    return(
        <View style={styles.container}>
            <Text>Tela HOME</Text>
            <Button title="Vá para sobre" onPress={navegaSobre}/>
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