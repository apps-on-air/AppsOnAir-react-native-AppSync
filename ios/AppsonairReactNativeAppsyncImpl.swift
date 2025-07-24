import AppsOnAir_AppSync
import Foundation

@objc public class AppsonairReactNativeAppsyncImpl: NSObject {
  @objc public func sync(directory: [String: Any],
                        result: @escaping ([String: Any]) -> Void,
                        rejecter: @escaping (String, String) -> Void) {
                          
    DispatchQueue.main.async {
      let appSyncService = AppSyncService()
      let nsDirectory = NSDictionary(dictionary: directory)
      appSyncService.sync(directory: nsDirectory) { syncResult in
        if let error = syncResult["error"] as? String {
          rejecter("SYNC_ERROR", error)
        } else {
          let swiftResult = syncResult as? [String: Any] ?? [:]
          result(swiftResult)
        }
      }
    }
  }
}
