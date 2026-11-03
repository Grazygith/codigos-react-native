import { useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


import { Feather } from '@expo/vector-icons';
import Produtos from '../../components/Produtos';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from '../../contexts/CartContext';

export default function Home() {

    const { cart, addItemCart } = useContext(CartContext);

    const navigation = useNavigation();

    const [products, setProducts] = useState([
        {
            "id": 1,
            "name": "Pastilha de Freio Dianteira",
            "price": 89.90
        },
        {
            "id": 2,
            "name": "Kit Relação Corrente e Coroa",
            "price": 249.90
        },
        {
            "id": 3,
            "name": "Filtro de Óleo",
            "price": 24.90
        },
        {
            "id": 4,
            "name": "Vela de Ignição",
            "price": 34.50
        },
        {
            "id": 5,
            "name": "Retrovisor Universal",
            "price": 59.90
        }
    ])

    function handleAddCart(item) {
        addItemCart(item)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cartContent}>
                <Text style={styles.title}>Lista de Produtos</Text>
                <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate("Carrinho")}>

                    {/* Exibe o zero na bolinha do carrinho */}
                    {/* <View style={styles.dot}>
                        <Text style={styles.dotText}>
                            {cart.reduce((acumulator, obj) => acumulator + obj.amount, 0)}
                        </Text>
                    </View> */}

                    {/* Só exibe a bolinha se a quantidade total for maior que 0 */}
                    {cart.reduce((acumulador, obj) => acumulador + obj.amount, 0) > 0 && (
                        <View style={styles.dot}>
                            <Text style={styles.dotText}>
                                 {cart.reduce((acumulator, obj) => acumulator + obj.amount, 0)}
                            </Text>
                        </View>
                    )}
                    <Feather name="shopping-cart" size={30} color="#000" />
                </TouchableOpacity>
            </View>

            <FlatList
                style={styles.list}
                data={products}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <Produtos data={item} addToCart={() => handleAddCart(item)} />}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        paddingEnd: 14,
        paddingStart: 14
    },
    cartContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 24
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    dot: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        width: 20,
        height: 20,
        borderRadius: 12,
        position: 'absolute',
        zIndex: 99,
        bottom: -2,
        left: -4
    },
    dotText: {
        fontSize: 12
    }


})