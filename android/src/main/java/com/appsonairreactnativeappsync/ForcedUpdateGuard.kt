package com.appsonairreactnativeappsync

import android.app.Activity
import android.app.Application
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.util.Log
import com.appsonair.appsync.activities.AppUpdateActivity
import com.appsonair.appsync.activities.MaintenanceActivity
import org.json.JSONException
import org.json.JSONObject

/**
 * Keeps a forced update screen up for as long as the app's process lives.
 *
 * The native SDK starts AppUpdateActivity with FLAG_ACTIVITY_NEW_TASK, so it
 * sits on top of the app's task. React Native's template declares MainActivity
 * with `launchMode="singleTask"`, and opening the app again from its launcher
 * icon or from a notification clears every activity above a singleTask
 * activity -- the forced update screen included. The outdated build is then
 * fully usable, and nothing shows the screen again until sync() runs again,
 * which apps usually do only once, at launch.
 *
 * A forced update screen hides "No thanks" and swallows Back, so the user can
 * never close it. When it is destroyed anyway (and not just recreated for a
 * configuration change), it is started again, with the same response, the next
 * time one of the app's own activities comes to the front. No network call is
 * made. Optional updates are left alone.
 */
internal object ForcedUpdateGuard : Application.ActivityLifecycleCallbacks {
  private const val TAG = "ForcedUpdateGuard"
  private const val RESPONSE_EXTRA = "res"

  private var registered = false

  /** The intent of the forced update screen while it is alive. */
  private var shown: Intent? = null

  /** The intent of a forced update screen that was removed. */
  private var removed: Intent? = null

  /** Registers the guard once per process. Safe to call on every sync. */
  fun install(context: Context) {
    if (registered) return
    val application = context.applicationContext as? Application ?: return
    application.registerActivityLifecycleCallbacks(this)
    registered = true
  }

  /**
   * True when [response] forces an update past [versionCode] -- the same test
   * the native SDK uses to show the screen, so a screen this build no longer
   * needs is never brought back.
   */
  internal fun isForcedUpdate(response: String?, versionCode: Long): Boolean {
    if (response.isNullOrEmpty()) return false
    return try {
      val updateData = JSONObject(response).optJSONObject("updateData") ?: return false
      val forced = updateData.optBoolean("isAndroidForcedUpdate", false)
      val required = updateData.optString("androidBuildNumber").toLongOrNull() ?: return false
      forced && versionCode < required
    } catch (e: JSONException) {
      false
    }
  }

  @Suppress("DEPRECATION")
  private fun installedVersionCode(activity: Activity): Long =
    try {
      val info = activity.packageManager.getPackageInfo(activity.packageName, 0)
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) info.longVersionCode
      else info.versionCode.toLong()
    } catch (e: PackageManager.NameNotFoundException) {
      Long.MAX_VALUE
    }

  override fun onActivityCreated(activity: Activity, savedInstanceState: Bundle?) {
    if (activity !is AppUpdateActivity) return
    // Any update screen, forced or not, supersedes one waiting to come back.
    removed = null
    val response = activity.intent?.getStringExtra(RESPONSE_EXTRA)
    shown =
      if (isForcedUpdate(response, installedVersionCode(activity))) Intent(activity.intent)
      else null
  }

  override fun onActivityDestroyed(activity: Activity) {
    if (activity !is AppUpdateActivity) return
    // A configuration change recreates it straight away; that is not a removal.
    if (activity.isChangingConfigurations) return
    val intent = shown ?: return
    shown = null
    removed = intent
    Log.d(TAG, "Forced update screen was removed; showing it again on resume")
  }

  override fun onActivityResumed(activity: Activity) {
    if (activity is AppUpdateActivity || activity is MaintenanceActivity) return
    val intent = removed ?: return
    removed = null
    try {
      // Started from the app's activity, so it lands on top of the same task.
      activity.startActivity(Intent(intent).setFlags(0))
    } catch (e: RuntimeException) {
      Log.w(TAG, "Could not show the forced update screen again", e)
    }
  }

  override fun onActivityStarted(activity: Activity) {}

  override fun onActivityPaused(activity: Activity) {}

  override fun onActivityStopped(activity: Activity) {}

  override fun onActivitySaveInstanceState(activity: Activity, outState: Bundle) {}
}
