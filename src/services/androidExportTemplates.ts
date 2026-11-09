export const ANDROID_MANIFEST_XML = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.fluent.win10launcher">

    <!-- Launcher Permissions -->
    <uses-permission android:name="android.permission.QUERY_ALL_PACKAGES" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />
    <uses-permission android:name="android.permission.BLUETOOTH" />
    <uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-feature android:name="android.hardware.camera.flash" android:required="false" />
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.BATTERY_STATS" />
    <uses-permission android:name="android.permission.EXPAND_STATUS_BAR" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="Windows 10 Launcher"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.Design.NoActionBar"
        android:hardwareAccelerated="true">

        <!-- Default Home Screen Activity -->
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:launchMode="singleTask"
            android:clearTaskOnLaunch="true"
            android:stateNotNeeded="true"
            android:windowSoftInputMode="adjustResize"
            android:configChanges="orientation|screenSize|screenLayout|keyboardHidden">

            <!-- HOME CATEGORY REGISTERS AS DEFAULT ANDROID LAUNCHER -->
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.HOME" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <!-- Notification Listener Service -->
        <service
            android:name=".LauncherNotificationService"
            android:label="Win10 Notification Listener"
            android:permission="android.permission.BIND_NOTIFICATION_LISTENER_SERVICE"
            android:exported="true">
            <intent-filter>
                <action android:name="android.service.notification.NotificationListenerService" />
            </intent-filter>
        </service>

    </application>
</manifest>`;

export const MAIN_ACTIVITY_JAVA = `package com.fluent.win10launcher;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.hardware.camera2.CameraAccessException;
import android.hardware.camera2.CameraManager;
import android.os.BatteryManager;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.util.Base64;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.activity.OnBackPressedCallback;
import androidx.appcompat.app.AppCompatActivity;
import org.json.JSONArray;
import org.json.JSONObject;
import java.io.ByteArrayOutputStream;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    public static WebView webView;
    private boolean isTorchOn = false;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.launcherWebView);
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setDatabaseEnabled(true);
        settings.setMediaPlaybackRequiresUserGesture(false);

        // Inject Native Android Bridge
        webView.addJavascriptInterface(new AndroidBridge(this), "AndroidBridge");
        webView.setWebChromeClient(new WebChromeClient());
        webView.setWebViewClient(new WebViewClient());

        // Load your bundled assets (or hosted web app URL)
        webView.loadUrl("file:///android_asset/dist/index.html");

        // Handle Android Back Gesture / Button
        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                webView.evaluateJavascript("window.handleAndroidBackKey ? window.handleAndroidBackKey() : false;", value -> {
                    // If false, back key is at root desktop - do nothing (stay on launcher)
                });
            }
        });
    }

    public class AndroidBridge {
        private final Context context;

        public AndroidBridge(Context context) {
            this.context = context;
        }

        @JavascriptInterface
        public String getInstalledApps() {
            JSONArray appList = new JSONArray();
            PackageManager pm = context.getPackageManager();
            Intent intent = new Intent(Intent.ACTION_MAIN, null);
            intent.addCategory(Intent.CATEGORY_LAUNCHER);

            List<ResolveInfo> activities = pm.queryIntentActivities(intent, 0);
            for (ResolveInfo ri : activities) {
                try {
                    JSONObject obj = new JSONObject();
                    obj.put("name", ri.loadLabel(pm).toString());
                    obj.put("packageName", ri.activityInfo.packageName);
                    
                    // Convert App Icon to Base64 data URL
                    Drawable icon = ri.activityInfo.loadIcon(pm);
                    Bitmap bitmap = drawableToBitmap(icon);
                    ByteArrayOutputStream stream = new ByteArrayOutputStream();
                    bitmap.compress(Bitmap.CompressFormat.PNG, 80, stream);
                    String base64 = Base64.encodeToString(stream.toByteArray(), Base64.NO_WRAP);
                    obj.put("icon", "data:image/png;base64," + base64);
                    
                    obj.put("isSystem", (ri.activityInfo.applicationInfo.flags & ApplicationInfo.FLAG_SYSTEM) != 0);
                    appList.put(obj);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            return appList.toString();
        }

        @JavascriptInterface
        public void launchApp(String packageName) {
            PackageManager pm = context.getPackageManager();
            Intent launchIntent = pm.getLaunchIntentForPackage(packageName);
            if (launchIntent != null) {
                launchIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                context.startActivity(launchIntent);
            }
        }

        @JavascriptInterface
        public String getBatteryLevel() {
            try {
                BatteryManager bm = (BatteryManager) context.getSystemService(BATTERY_SERVICE);
                int level = bm.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY);
                boolean isCharging = bm.isCharging();
                JSONObject obj = new JSONObject();
                obj.put("level", level);
                obj.put("isCharging", isCharging);
                return obj.toString();
            } catch (Exception e) {
                return "{\\"level\\": 85, \\"isCharging\\": false}";
            }
        }

        @JavascriptInterface
        public boolean toggleTorch() {
            CameraManager camManager = (CameraManager) context.getSystemService(Context.CAMERA_SERVICE);
            try {
                String cameraId = camManager.getCameraIdList()[0];
                isTorchOn = !isTorchOn;
                camManager.setTorchMode(cameraId, isTorchOn);
                return isTorchOn;
            } catch (CameraAccessException e) {
                e.printStackTrace();
                return false;
            }
        }

        @JavascriptInterface
        public void openSettings(String type) {
            Intent intent;
            switch (type) {
                case "wifi":
                    intent = new Intent(Settings.ACTION_WIFI_SETTINGS);
                    break;
                case "bluetooth":
                    intent = new Intent(Settings.ACTION_BLUETOOTH_SETTINGS);
                    break;
                case "display":
                    intent = new Intent(Settings.ACTION_DISPLAY_SETTINGS);
                    break;
                case "apps":
                    intent = new Intent(Settings.ACTION_APPLICATION_SETTINGS);
                    break;
                default:
                    intent = new Intent(Settings.ACTION_SETTINGS);
            }
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(intent);
        }

        @JavascriptInterface
        public boolean isAndroid() {
            return true;
        }
    }

    private Bitmap drawableToBitmap(Drawable drawable) {
        if (drawable instanceof BitmapDrawable) {
            return ((BitmapDrawable) drawable).getBitmap();
        }
        Bitmap bitmap = Bitmap.createBitmap(
            Math.max(1, drawable.getIntrinsicWidth()),
            Math.max(1, drawable.getIntrinsicHeight()),
            Bitmap.Config.ARGB_8888
        );
        Canvas canvas = new Canvas(bitmap);
        drawable.setBounds(0, 0, canvas.getWidth(), canvas.getHeight());
        drawable.draw(canvas);
        return bitmap;
    }
}`;

export const NOTIFICATION_SERVICE_JAVA = `package com.fluent.win10launcher;

import android.service.notification.NotificationListenerService;
import android.service.notification.StatusBarNotification;
import android.app.Notification;
import android.os.Bundle;

public class LauncherNotificationService extends NotificationListenerService {

    @Override
    public void onNotificationPosted(StatusBarNotification sbn) {
        if (sbn == null || sbn.getNotification() == null) return;
        Notification n = sbn.getNotification();
        Bundle extras = n.extras;
        
        String title = extras != null ? extras.getString(Notification.EXTRA_TITLE, "") : "";
        CharSequence textSeq = extras != null ? extras.getCharSequence(Notification.EXTRA_TEXT) : "";
        String text = textSeq != null ? textSeq.toString() : "";
        String pkg = sbn.getPackageName();
        String id = String.valueOf(sbn.getId());

        if (MainActivity.webView != null) {
            MainActivity.webView.post(() -> {
                String js = String.format("window.postNotification && window.postNotification('%s', '%s', '%s', '%s');",
                    escapeJs(id), escapeJs(title), escapeJs(text), escapeJs(pkg));
                MainActivity.webView.evaluateJavascript(js, null);
            });
        }
    }

    @Override
    public void onNotificationRemoved(StatusBarNotification sbn) {
        if (sbn == null) return;
        String id = String.valueOf(sbn.getId());
        if (MainActivity.webView != null) {
            MainActivity.webView.post(() -> {
                String js = String.format("window.removeNotification && window.removeNotification('%s');", escapeJs(id));
                MainActivity.webView.evaluateJavascript(js, null);
            });
        }
    }

    private String escapeJs(String str) {
        if (str == null) return "";
        return str.replace("\\\\", "\\\\\\\\")
                  .replace("'", "\\\\'")
                  .replace("\\n", " ")
                  .replace("\\r", "");
    }
}`;

export const BUILD_GRADLE = `plugins {
    id 'com.android.application'
}

android {
    namespace 'com.fluent.win10launcher'
    compileSdk 34

    defaultConfig {
        applicationId "com.fluent.win10launcher"
        minSdk 26
        targetSdk 34
        versionCode 1
        versionName "1.0.0"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }
}

dependencies {
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.11.0'
    implementation 'androidx.activity:activity:1.8.2'
}`;
