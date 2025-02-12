export interface AppSyncResponse {
  id: string;
  appName: string;
  appLogo: string;
  isMaintenance: boolean;
  updateData: {
    isUpdateEnabled: boolean;
    buildNumber: string;
    minBuildVersion: string;
    updateLink: string;
    isForcedUpdate: boolean;
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

export interface Options {
  showNativeUI: boolean;
}
