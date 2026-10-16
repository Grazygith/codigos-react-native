import { View, StyleSheet } from 'react-native';
import FormsUsers from './src/FormsUsers';

export default function App() {
return(
  <View style={styles.container}>
    <FormsUsers />
  </View>
)
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  }
})