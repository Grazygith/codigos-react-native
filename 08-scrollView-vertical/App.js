import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native';

class App extends Component {
    render() {
        return (
            <View style={style.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={style.box1}></View>
                    <View style={style.box2}></View>
                    <View style={style.box3}></View>
                    <View style={style.box4}></View>
                    <View style={style.box5}></View>
                </ScrollView>

            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    box1: {
        backgroundColor: 'blue',
        height: 250
    },
    box2: {
        backgroundColor: 'orange',
        height: 250
    },
    box3: {
        backgroundColor: 'purple',
        height: 250
    },
    box4: {
        backgroundColor: 'green',
        height: 250
    },
    box5: {
        backgroundColor: 'red',
        height: 250
    },

})

export default App;