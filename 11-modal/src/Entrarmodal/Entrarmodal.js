import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Button, Modal } from 'react-native';
 
class Entrarmodal extends Component {
    render() {
        return (
            <View style={{ backgroundColor: '#292929', width: '100%', height: 350, borderRadius: 15 }}>
                <Text style={{ padding: 10, textAlign: 'center', color: '#fff839', fontSize: 28 }}>Boas vindas</Text>
                <Button title="Sair" onPress={this.props.fecharmodal} />
            </View>
        )
    }
}
 
export default Entrarmodal;