import { NativeModules, Platform } from 'react-native';

import type { AppSyncResponse, Options } from './types';

export * from './types';

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

/**
 * Sync data with the server.
 *
 * @param {Options} options
 * @property {boolean} [options.showNativeUI=true] Show native UI while syncing.
 *
 * @returns {Promise<AppSyncResponse>}
 * @throws {Error}
 */
export const sync = async (
  options: Options = {
    showNativeUI: true,
  }
): Promise<AppSyncResponse> => {
  const result = await AppsonairReactNativeAppsync.sync(options);
  return Platform.OS === 'android' ? JSON.parse(result) : result;
};
