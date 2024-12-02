import { StyleSheet, View, Text } from 'react-native';
import { sync } from 'appsonair-react-native-appsync';

sync();

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Test</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
