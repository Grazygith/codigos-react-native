import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
 
import { useNavigation } from '@react-navigation/native';
 
export default function Home(){
 
    const navigation = useNavigation();
 
    function navegaSobre(){
        navigation.navigate('Sobre', { nome: 'Ana', email: 'ana@gmail.com' })
    }
 
    function navigateDetalhes(){
        navigation.navigate('Detalhes')
    }
    return(
        <View style={styles.container}>
            <Text>Tela HOME</Text>
            <Button title="Vá para sobre" onPress={navegaSobre} />
            <Button title="Vá para page Detalhes" onPress={navigateDetalhes} />
            <Button 
            color= '#202020'
            title= "Botão abre Drawer"
            onPress={() => navigation.openDrawer()}
            />
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
 