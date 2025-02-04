import { NativeModules, Platform } from 'react-native';

import type { AppSyncNativeResponse, AppSyncResponse, Options } from './types';

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

  const data = convertToPlatformSpecificFormat(
    Platform.OS === 'android' ? JSON.parse(result) : result,
    Platform.OS
  );

  return data;
};

const convertToPlatformSpecificFormat = (
  data: AppSyncNativeResponse,
  platform: typeof Platform.OS
): AppSyncResponse => {
  const updateData = data.updateData;

  return {
    id: data.id,
    appName: data.appName,
    appLogo: data.appLogo,
    isMaintenance: data.isMaintenance,
    updateData: {
      isUpdateEnabled:
        platform === 'ios'
          ? updateData.isIOSUpdate
          : updateData.isAndroidUpdate,
      isForcedUpdate:
        platform === 'ios'
          ? updateData.isIOSForcedUpdate
          : updateData.isAndroidForcedUpdate,
      updateLink:
        platform === 'ios'
          ? updateData.iosUpdateLink
          : updateData.androidUpdateLink,
      buildNumber: Number(
        platform === 'ios'
          ? updateData.iosBuildNumber
          : updateData.androidBuildNumber
      ),
      minBuildVersion: Number(
        platform === 'ios'
          ? updateData.iosMinBuildVersion
          : updateData.androidMinBuildVersion
      ),
    },
    updatedAt: new Date(data.updatedAt),
  };
};
