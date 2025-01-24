# AppsOnAir-react-native-AppSync

## Features Overview

- App Update 📤

  > By enabling App Update feature, users will be able to see any new releases published in this app.

- App Maintenance 🛠️
  > By enabling Maintenance mode feature, users won’t be able to access the app and will be noted as the app is under Maintenance mode.

#### To learn more about AppsOnAir AppSync, please visit the [AppsOnAir](https://documentation.appsonair.com) website.

## Android Setup

### Minimum Requirements

- Android Gradle Plugin (AGP): Version 8.0.2 or higher
- Kotlin: Version 1.7.10 or higher
- Gradle: Version 8.0 or higher

Add meta-data to the app's AndroidManifest.xml file under the application tag.

> Make sure meta-data name is “appId”.

> Provide your application id in meta-data value.

```sh
</application>
    ...
    <meta-data
        android:name="appId"
        android:value="********-****-****-****-************" />
</application>
```

> Make sure meta-data name is “com.appsonair.icon”.

> Provide your application logo in meta-data value.

```sh
</application>
    ...
    <meta-data
       android:name="com.appsonair.icon"
       android:resource="@mipmap/ic_launcher" />
</application>
```

## iOS Setup

### Minimum Requirements

iOS deployment target: 12.0

Provide your application id in your app info.plist file.

```sh
<key>AppsOnAirAPIKey</key>
<string>XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX</string>
```

If `CFBundleDisplayName` is not added in your app then added in your app info.plist file.

```sh
<key>CFBundleDisplayName</key>
<string>YourAppName</string>
```

## Usage

### Example 1: Call `sync` in `useEffect` with default design

```typescript
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { sync, type AppSyncResponse } from "appsonair-react-native-appsync";

const App = () => {
  const [data, setData] = useState<AppSyncResponse | null>(null);

  useEffect(() => {
    sync().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <View>
      <Text>App Sync Example</Text>
      {data && <Text>Sync Status: {JSON.stringify(data)}</Text>}
    </View>
  );
};

export default App;
```

By default, the `sync` method displays the native UI for app update alerts and maintenance mode.

---

### Example 2: Call `sync` in `useEffect` with custom design

If you want to show a custom alert for app updates, pass options in the `sync` method. Use the `options` parameter as follows:

> **`showNativeUI`** (boolean):  
>  Set to `false` to disable the default native UI for the app update alert.  
>  Default: `true`.

```typescript
import React, { useEffect, useState } from "react";
import { Alert, Linking, Text, View } from "react-native";
import { sync, type AppSyncResponse } from "appsonair-react-native-appsync";

const App = () => {
  const [data, setData] = useState<AppSyncResponse | null>(null);

  useEffect(() => {
    sync({ showNativeUI: false }).then((res) => {
      setData(res);

      // Custom alert for android app update
      if (res.updateAvailable) {
        Alert.alert(
          "Update Available",
          "A new version of the app is available. Please update to the latest version.",
          [
            {
              text: "OK",
              onPress: () => Linking.openURL(res.updateData.androidUpdateLink!),
            },
          ]
        );
      }
    });
  }, []);

  return (
    <View>
      <Text>App Sync Example with Custom Design</Text>
      {data && <Text>Sync Status: {JSON.stringify(data)}</Text>}
    </View>
  );
};

export default App;
```
