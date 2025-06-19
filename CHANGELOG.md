## 0.3.1

- Update native iOS dependecy

## 0.3.0

- Update native iOS dependecy

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
