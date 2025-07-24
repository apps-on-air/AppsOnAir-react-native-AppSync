import { Platform } from 'react-native';

import type {
  AppSyncResponse,
  SyncOptions,
} from './NativeAppsonairReactNativeAppsync';
import AppsonairReactNativeAppsync from './NativeAppsonairReactNativeAppsync';

export type { AppSyncResponse, SyncOptions };

/**
 * Sync data with the server.
 *
 * @param {SyncOptions} options
 * @property {boolean} [options.showNativeUI=true] Show native UI while syncing.
 *
 * @returns {Promise<AppSyncResponse>}
 */
export const sync = async (
  options: SyncOptions = {
    showNativeUI: true,
  }
): Promise<AppSyncResponse> => {
  const res = await AppsonairReactNativeAppsync.sync(options);

  if (Platform.OS === 'android' && typeof res === 'string') {
    return JSON.parse(res) as AppSyncResponse;
  }

  return res as AppSyncResponse;
};
