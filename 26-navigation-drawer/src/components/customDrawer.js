import React from 'react';

import { View, Text, Image } from 'react-native';

import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

export default function CustomDrawer(props) {
    return (
        <DrawerContentScrollView {...props}>
            <View style={{
                width: '100%',
                height: 85,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 30
            }}>

                <Image
                    source={require('../assets/profile.png')}
                    style={{ width: 65, height: 65 }}
                />
                <Text style={{ color: '#fff', fontSize: 17, marginTop: 17, marginBottom: 35 }}>
                    Boas vindas ao nosso App!
                </Text>
            </View>

            <DrawerItemList {...props}/>
        </DrawerContentScrollView>

    )
}