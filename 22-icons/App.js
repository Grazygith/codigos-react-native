import { View, TouchableOpacity } from "react-native";
import Feather from "@react-native-vector-icons/feather";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
export default function App() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Feather
        name="users"
        size={45}
        color="#FF0000"
      />

      <FontAwesome6
        iconStyle="solid"
        name="users"
        size={45}
        color="#333"

      />

      <TouchableOpacity style={{
        backgroundColor: "#c4da01", width: 100, borderRadius: 5, alignItems: 'center'
      }}>
        <Feather
          name="video"
          size={60}
          color="#000"
        />
      </TouchableOpacity>
    </View>
  )

}
