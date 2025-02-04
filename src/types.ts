export interface AppSyncNativeResponse {
  id: string;
  appName: string;
  appLogo: string;
  isMaintenance: boolean;
  updateData: {
    isIOSUpdate: boolean;
    iosBuildNumber: string | null;
    iosMinBuildVersion: string | null;
    iosUpdateLink: string | null;
    isIOSForcedUpdate: boolean;
    isAndroidUpdate: boolean;
    androidBuildNumber: string | null;
    androidMinBuildVersion: string | null;
    androidUpdateLink: string | null;
    isAndroidForcedUpdate: boolean;
  };
  maintenanceData: {
    title: string | null;
    description: string | null;
    image: string | null;
    textColorCode: string | null;
    backgroundColorCode: string | null;
    isMaintenance: boolean;
  };
  updatedAt: string;
}

export interface AppSyncResponse {
  id: string;
  appName: string;
  appLogo: string;
  isMaintenance: boolean;
  updateData: {
    isUpdateEnabled: boolean;
    isForcedUpdate: boolean;
    updateLink: string | null;
    buildNumber: number | null;
    minBuildVersion: number | null;
  };
  updatedAt: Date;
}

export interface Options {
  showNativeUI: boolean;
}
