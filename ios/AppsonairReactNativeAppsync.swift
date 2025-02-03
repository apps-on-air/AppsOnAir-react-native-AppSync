import AppsOnAir_AppSync

@objc(AppsonairReactNativeAppsync)
class AppsonairReactNativeAppsync: NSObject {

    @objc func sync(_ directory: NSDictionary, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.main.async {
            let appSyncService = AppSyncService()
            appSyncService.sync(directory: directory) { result in
                if let error = result["error"] as? String {
                    rejecter("SYNC_ERROR", error, nil)
                } else {
                    resolver(result)
                }
            }
        }
    }
}
