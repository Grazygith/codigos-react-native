import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from '../pages/Home';
import Carrinho from "../pages/Carrinho";


const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShow: false
                }}
            />

            <Stack.Screen
                name="Carrinho"
                component={Carrinho}
                options={{
                    headerTitle: 'Meu Carrinho'
                }}
            />

        </Stack.Navigator>
    )
}