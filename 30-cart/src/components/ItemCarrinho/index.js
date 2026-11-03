import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function CardItem({ data, addAmount, removeAmount }) {
    const [amount, setAmount] = useState(data?.amount)

    function handleIncrease() {
        addAmount();
        setAmount(item => item + 1)
    }

    function handleDecrease() {
        removeAmount();
        if (amount === 0) {
            setAmount(0);
            return;
        }
        setAmount(item => item - 1)

    }

    // Calcula o total do item (Preço unitario x Quantidade)
    const totalItem =  Number(data.price) * amount;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{data.name}</Text>

            {/* Preço unitario + Indicador de unidade */}
            <Text style={styles.price}>
                {Number(data.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                <Text style={styles.unit}>/ un</Text>
            </Text>

            {/* Preço total do item */}
            <Text style={styles.totalItem}>
                Subtotal do item acima: {totalItem.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
            </Text>

            <View style={styles.amountContainer}>
                <TouchableOpacity style={styles.buttonItem} onPress={handleDecrease}>
                    <Text>-</Text>
                </TouchableOpacity>

                <Text style={styles.amount}>{amount}</Text>

                <TouchableOpacity style={styles.buttonItem} onPress={handleIncrease}>
                    <Text>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#DFDFDF',
        borderRadius: 2,
        marginBottom: 14,
        padding: 8
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    },
    price: {
        fontSize: 16
    },
    amountContainer: {
        marginTop: 14,
        marginBottom: 14,
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonItem: {
        backgroundColor: '#168fff',
        padding: 6,
        paddingLeft: 14,
        paddingRight: 14,
        borderRadius: 2
    },
    amount: {
        marginLeft: 14,
        marginRight: 14
    },
    unit:{
        fontSize:12,
        color: '#888'
    },
    totalItem:{
        fontSize: 16,
        fontWeight: 'bold',
        color:'#00701a',
        marginTop: 4
    }

})