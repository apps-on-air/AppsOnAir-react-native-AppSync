import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { sync, type AppSyncResponse } from 'appsonair-react-native-appsync';

export default function App() {
  const [data, setData] = useState<AppSyncResponse | null>(null);

  useEffect(() => {
    sync({ showNativeUI: false }).then((res) => {
      setData(res);
    });
  }, []);

  /**
   * Handles the synchronization process with the server.
   *
   * This function calls the `sync` method to initiate data synchronization.
   * Logs the result on success and logs an error message on failure.
   */

  const handleSync = async () => {
    try {
      const result = await sync();
      console.log('Sync result:', result);
    } catch (error) {
      console.error('Sync error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(data, null, 2)}</Text>
      <Button title="Sync" onPress={handleSync} />
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
