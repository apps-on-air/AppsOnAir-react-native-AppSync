## 1.1.0

- Update native iOS dependency to 1.4.0 (iOS 27 / Xcode 27 support, UIScene-based window resolution)
- Update native Android dependency to 1.2.2 (fixes excessive memory use when loading the maintenance image)
- **Note:** The native iOS SDK now requires iOS 15.0 or later

## 1.0.3

- Update native Android dependency to 1.2.1 (fixes AppUpdateActivity crash when started without extras)

## 1.0.2

- Dependencies upgrade and improvements

## 1.0.1

- Dependencies upgrade and improvements

## 1.0.0

- Dependencies upgrade and improvements

## 0.4.0

- Update native dependency

## 0.3.1

- Update native iOS dependency

## 0.3.0

- Update native iOS dependency

## 0.2.0

- Native dependencies version upgrade

- Standardized the update alert response across platforms.

**Breaking Changes:**

- There are breaking changes in the sync method. Moving forward, the update response will be shared based on the respective Android and iOS platforms. Detailed changes to the properties are outlined below.

  - Replaced `androidBuildNumber` and `iOSBuildNumber` with `buildNumber`
  - Replaced `isAndroidUpdate` and `isIOSUpdate` with `isUpdateEnabled`
  - Replaced `isAndroidForcedUpdate` and `isIOSForcedUpdate` with `isForcedUpdate`
  - Replaced `androidMinBuildVersion` and `iosMinBuildVersion` with `minBuildVersion`
  - Replaced `androidUpdateLink` and `iosUpdateLink` with `updateLink`

## 0.1.0

- Initial Release
