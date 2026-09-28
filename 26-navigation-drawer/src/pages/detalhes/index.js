import React from "react";
 
import { View, Text, Button } from 'react-native';
 
import { useNavigation } from "@react-navigation/native";
 
export default function Detalhes(){
 
    const navigation = useNavigation();
 
    function handleHomeNovamente(){
        navigation.navigate("HomeStack", {screen: 'Home'});
    }
 
    return(
        <View>
            <Text>Páginas de detalhes</Text>
            <Button
            color='#9e1919'
            title="Voltar para Home"
            onPress={handleHomeNovamente}
            />
        </View>
    )
}
 