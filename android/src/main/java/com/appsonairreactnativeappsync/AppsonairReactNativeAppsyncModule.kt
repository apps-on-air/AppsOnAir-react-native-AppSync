package com.appsonairreactnativeappsync

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.appsonair.appsync.interfaces.UpdateCallBack
import com.appsonair.appsync.services.AppSyncService

class AppsonairReactNativeAppsyncModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {
  private val TAG = "AppsonairReactNativeAppsyncModule"

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun sync(promise: Promise) {
    AppSyncService.sync(
      reactApplicationContext,
      options = mapOf("showNativeUI" to true),
      callBack = object : UpdateCallBack {
        override fun onSuccess(response: String?) {
          Log.d(TAG, "onSuccess: $response")
          promise.resolve(response)
        }

        override fun onFailure(message: String?) {
          Log.d(TAG, "onFailure: $message")
          promise.reject("SYNC_FAILED", message)
        }
      }
    )
  }

  companion object {
    const val NAME = "AppsonairReactNativeAppsync"
  }
}
