package com.appsonairreactnativeappsync

import com.appsonair.appsync.services.AppSyncService
import com.appsonair.appsync.interfaces.UpdateCallBack
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableType
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = AppsonairReactNativeAppsyncModule.NAME)
class AppsonairReactNativeAppsyncModule(reactContext: ReactApplicationContext) :
  NativeAppsonairReactNativeAppsyncSpec(reactContext) {

  companion object {
    const val NAME = "AppsonairReactNativeAppsync"
    private const val TAG = "AppsonairAppsync"
  }

  override fun getName(): String {
    return NAME
  }

  override fun sync(options: ReadableMap, promise: Promise) {
    try {
      val payload = options.toMap()

      val callback = object : UpdateCallBack {
        override fun onSuccess(response: String?) {
          promise.resolve(response)
        }
        
        override fun onFailure(message: String?) {
          promise.reject("SYNC_ERROR", message ?: "Unknown sync error")
        }
      }
      
      AppSyncService.sync(reactApplicationContext, payload, callback)
      
    } catch (e: Exception) {
      promise.reject("SYNC_EXCEPTION", e.message ?: "Unknown exception occurred")
    }
  }

  private fun ReadableMap.toMap(): Map<String, Any> {
    val map = mutableMapOf<String, Any>()
    val iterator = this.keySetIterator()
    while (iterator.hasNextKey()) {
      val key = iterator.nextKey()
      when (this.getType(key)) {
        ReadableType.String -> map[key] = this.getString(key) ?: ""
        ReadableType.Boolean -> map[key] = this.getBoolean(key)
        ReadableType.Number -> map[key] = this.getDouble(key)
        ReadableType.Map -> this.getMap(key)?.toMap()?.let { map[key] = it }
        ReadableType.Array -> this.getArray(key)?.let { map[key] = it.toArrayList() }
        ReadableType.Null -> map[key] = ""
      }
    }
    return map
  }
}
