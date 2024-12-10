export interface AppSyncResponse {
  id: string;
  appName: string;
  isMaintenance: boolean;
  appLogo: string;
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
