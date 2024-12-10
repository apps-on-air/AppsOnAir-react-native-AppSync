import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { sync, type AppSyncResponse } from 'appsonair-react-native-appsync';

export default function App() {
  const [data, setData] = useState<AppSyncResponse | null>(null);

  useEffect(() => {
    const main = async () => {
      const syncData = await sync();
      setData(syncData);
    };

    main();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(data, null, 2)}</Text>
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
