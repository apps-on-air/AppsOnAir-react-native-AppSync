package com.appsonairreactnativeappsync

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableType
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
  fun sync(options: ReadableMap, promise: Promise) {
    val payload = options.toMap()

    AppSyncService.sync(
      reactApplicationContext,
      payload,
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

    fun ReadableMap.toMap(): Map<String, Any> {
    val map = mutableMapOf<String, Any>()
    val iterator = this.keySetIterator()
    while (iterator.hasNextKey()) {
      val key = iterator.nextKey()
      when (this.getType(key)) {
        ReadableType.String -> map[key] = this.getString(key) ?: ""
        ReadableType.Boolean -> map[key] = this.getBoolean(key)
        ReadableType.Number -> map[key] = this.getDouble(key)
        ReadableType.Map -> this.getMap(key)?.toMap()?.let { map[key] = it }
        else -> Unit
      }
    }
    return map
  }

  companion object {
    const val NAME = "AppsonairReactNativeAppsync"
  }
}
