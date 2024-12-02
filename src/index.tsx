import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'appsonair-react-native-appsync' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const AppsonairReactNativeAppsync = NativeModules.AppsonairReactNativeAppsync
  ? NativeModules.AppsonairReactNativeAppsync
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export async function sync() {
  try {
    const response = await AppsonairReactNativeAppsync.sync();
    const parsedData: AppSyncResponse = JSON.parse(response);
    return parsedData;
  } catch (error) {
    console.error(error);
    throw new Error('Error syncing with AppsOnAir');
  }
}
