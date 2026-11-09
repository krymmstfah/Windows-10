import { AppItem, NotificationItem } from '../types';

declare global {
  interface Window {
    AndroidBridge?: {
      getInstalledApps?: () => string;
      launchApp?: (pkg: string) => boolean | void;
      getBatteryLevel?: () => string; // returns JSON: { level: number, isCharging: boolean }
      openSettings?: (type: string) => void;
      toggleTorch?: () => boolean;
      getWifiStatus?: () => boolean;
      toggleWifi?: () => boolean;
      getBluetoothStatus?: () => boolean;
      toggleBluetooth?: () => boolean;
      isAndroid?: () => boolean;
      vibrate?: (ms: number) => void;
    };
    handleAndroidBackKey?: () => boolean;
    postNotification?: (id: string, title: string, text: string, pkg: string) => void;
    removeNotification?: (id: string) => void;
  }
}

// Default realistic Android Apps catalog for browser / emulation mode
export const DEFAULT_ANDROID_APPS: AppItem[] = [
  {
    id: 'android-studio',
    name: 'Android Studio',
    packageName: 'com.google.android.studio',
    icon: '🤖',
    category: 'Development',
    isPinnedTaskbar: true,
    isSystem: false,
    color: '#3ddc84'
  },
  {
    id: 'virtualbox',
    name: 'Oracle VirtualBox',
    packageName: 'org.virtualbox.app',
    icon: '📦',
    category: 'Development',
    isPinnedTaskbar: true,
    isSystem: false,
    color: '#1e3a5f'
  },
  {
    id: 'cadcraft',
    name: 'CADCraft',
    packageName: 'com.cadcraft.app',
    icon: '📐',
    category: 'Engineering',
    isPinnedTaskbar: false,
    isSystem: false,
    color: '#0078d7'
  },
  {
    id: 'chrome',
    name: 'Google Chrome',
    packageName: 'com.android.chrome',
    icon: '🌐',
    category: 'Internet',
    isPinnedTaskbar: true,
    isSystem: true,
    color: '#ea4335'
  },
  {
    id: 'spotify',
    name: 'Spotify',
    packageName: 'com.spotify.music',
    icon: '🎧',
    category: 'Media',
    isPinnedTaskbar: true,
    isSystem: false,
    color: '#1ed760'
  },
  {
    id: 'autocad',
    name: 'AutoCAD',
    packageName: 'com.autodesk.autocad',
    icon: '🅰️',
    category: 'Engineering',
    isPinnedTaskbar: false,
    isSystem: false,
    color: '#d32f2f'
  },
  {
    id: 'revit',
    name: 'Revit',
    packageName: 'com.autodesk.revit',
    icon: '🏢',
    category: 'Engineering',
    isPinnedTaskbar: false,
    isSystem: false,
    color: '#0288d1'
  },
  {
    id: 'etabs',
    name: 'ETABS',
    packageName: 'com.csiamerica.etabs',
    icon: '📊',
    category: 'Engineering',
    isPinnedTaskbar: false,
    isSystem: false,
    color: '#f57c00'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    packageName: 'com.whatsapp',
    icon: '💬',
    category: 'Communication',
    isPinnedTaskbar: true,
    isSystem: false,
    color: '#25d366'
  },
  {
    id: 'facebook',
    name: 'فيسبوك',
    packageName: 'com.facebook.katana',
    icon: '👥',
    category: 'Social',
    isPinnedTaskbar: false,
    isSystem: false,
    color: '#1877f2'
  },
  {
    id: 'telegram',
    name: 'Telegram',
    packageName: 'org.telegram.messenger',
    icon: '✈️',
    category: 'Communication',
    isPinnedTaskbar: false,
    isSystem: false,
    color: '#229ed9'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    packageName: 'com.google.android.youtube',
    icon: '▶️',
    category: 'Media',
    isPinnedTaskbar: true,
    isSystem: false,
    color: '#ff0000'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    packageName: 'com.google.android.apps.bard',
    icon: '✦',
    category: 'AI',
    isPinnedTaskbar: false,
    isSystem: false,
    color: '#8e24aa'
  },
  {
    id: 'retroarch',
    name: 'RetroArch',
    packageName: 'org.libretro.retroarch',
    icon: '👾',
    category: 'Games',
    isPinnedTaskbar: false,
    isSystem: false,
    color: '#424242'
  },
  {
    id: 'gdrive',
    name: 'Google Drive (G)',
    packageName: 'com.google.android.apps.docs',
    icon: '🔺',
    category: 'Storage',
    isPinnedTaskbar: false,
    isSystem: true,
    color: '#0f9d58'
  },
  {
    id: 'camera',
    name: 'Camera',
    packageName: 'com.android.camera',
    icon: '📷',
    category: 'Utilities',
    isPinnedTaskbar: false,
    isSystem: true,
    color: '#0078d7'
  },
  {
    id: 'calculator',
    name: 'Calculator',
    packageName: 'com.android.calculator2',
    icon: '🔢',
    category: 'Utilities',
    isPinnedTaskbar: false,
    isSystem: true,
    color: '#0078d7'
  },
  {
    id: 'photos',
    name: 'Photos',
    packageName: 'com.google.android.apps.photos',
    icon: '🖼️',
    category: 'Media',
    isPinnedTaskbar: false,
    isSystem: true,
    color: '#1a73e8'
  },
  {
    id: 'files',
    name: 'File Explorer',
    packageName: 'com.android.documentsui',
    icon: '📁',
    category: 'System',
    isPinnedTaskbar: true,
    isSystem: true,
    color: '#f9a825'
  },
  {
    id: 'settings',
    name: 'Settings',
    packageName: 'com.android.settings',
    icon: '⚙️',
    category: 'System',
    isPinnedTaskbar: true,
    isSystem: true,
    color: '#607d8b'
  },
  {
    id: 'excel',
    name: 'Excel',
    packageName: 'com.microsoft.office.excel',
    icon: '📊',
    category: 'Productivity',
    isPinnedTaskbar: false,
    isSystem: false,
    color: '#107c41'
  },
  {
    id: 'store',
    name: 'Microsoft Store',
    packageName: 'com.microsoft.store',
    icon: '🛍️',
    category: 'Store',
    isPinnedTaskbar: false,
    isSystem: true,
    color: '#0078d7'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    packageName: 'com.whatsapp',
    appName: 'WhatsApp',
    title: 'Sarah Jenkins',
    text: 'Hey! Are we still reviewing the mobile UI launch today at 4?',
    timestamp: '10m ago',
    icon: '💬',
    color: '#25d366'
  },
  {
    id: 'n-2',
    packageName: 'com.google.android.gm',
    appName: 'Gmail',
    title: 'Google Cloud Platform',
    text: 'Billing notice: Your Cloud Run cluster deployed successfully.',
    timestamp: '25m ago',
    icon: '✉️',
    color: '#ea4335'
  },
  {
    id: 'n-3',
    packageName: 'com.android.vending',
    appName: 'Google Play',
    title: 'App Updates Available',
    text: '5 applications updated automatically via Wi-Fi.',
    timestamp: '1h ago',
    icon: '🛍️',
    color: '#00a4ef'
  }
];

export class AndroidBridgeService {
  private torchMediaTrack: MediaStreamTrack | null = null;
  private torchState = false;

  // Check if true Android Bridge is injected into WebView
  isNativeAndroid(): boolean {
    return !!(window.AndroidBridge && typeof window.AndroidBridge.getInstalledApps === 'function');
  }

  // Fetch installed applications from Android OS or fallback
  getInstalledApps(): AppItem[] {
    if (this.isNativeAndroid() && window.AndroidBridge?.getInstalledApps) {
      try {
        const raw = window.AndroidBridge.getInstalledApps();
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((app, idx) => ({
            id: app.packageName || `app-${idx}`,
            name: app.name || 'Application',
            packageName: app.packageName || `com.app.${idx}`,
            icon: app.icon || '📱',
            category: app.category || 'Applications',
            isPinnedTaskbar: !!app.isPinnedTaskbar,
            isSystem: !!app.isSystem,
            color: app.color || '#0078d7'
          }));
        }
      } catch (err) {
        console.warn('Failed parsing native Android apps:', err);
      }
    }
    // Return saved localStorage apps or default catalog
    const saved = localStorage.getItem('win10_android_apps');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return DEFAULT_ANDROID_APPS;
  }

  // Launch application via package intent
  launchApp(pkg: string): boolean {
    if (this.isNativeAndroid() && window.AndroidBridge?.launchApp) {
      window.AndroidBridge.launchApp(pkg);
      return true;
    }
    console.log(`[AndroidBridge Simulation] Launching package: ${pkg}`);
    return false;
  }

  // Open native Android settings menu
  openSettings(type: string = 'system') {
    if (this.isNativeAndroid() && window.AndroidBridge?.openSettings) {
      window.AndroidBridge.openSettings(type);
      return;
    }
    console.log(`[AndroidBridge Simulation] Opening Android settings: ${type}`);
  }

  // Battery monitoring
  async getBatteryLevel(): Promise<{ level: number; isCharging: boolean }> {
    if (this.isNativeAndroid() && window.AndroidBridge?.getBatteryLevel) {
      try {
        const raw = window.AndroidBridge.getBatteryLevel();
        const data = JSON.parse(raw);
        return {
          level: Math.round(data.level ?? 85),
          isCharging: !!data.isCharging
        };
      } catch {}
    }

    // Try HTML5 Battery API
    if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
      try {
        const battery: any = await (navigator as any).getBattery();
        return {
          level: Math.round(battery.level * 100),
          isCharging: battery.charging
        };
      } catch {}
    }

    return { level: 86, isCharging: false };
  }

  // Flashlight / Torch toggle
  async toggleTorch(forceState?: boolean): Promise<boolean> {
    if (this.isNativeAndroid() && window.AndroidBridge?.toggleTorch) {
      return window.AndroidBridge.toggleTorch();
    }

    // Browser MediaStream flashlight attempt
    const target = forceState !== undefined ? forceState : !this.torchState;
    try {
      if (target) {
        if (!this.torchMediaTrack) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
          });
          this.torchMediaTrack = stream.getVideoTracks()[0];
        }
        await (this.torchMediaTrack as any).applyConstraints({
          advanced: [{ torch: true }]
        });
        this.torchState = true;
      } else {
        if (this.torchMediaTrack) {
          await (this.torchMediaTrack as any).applyConstraints({
            advanced: [{ torch: false }]
          });
          this.torchMediaTrack.stop();
          this.torchMediaTrack = null;
        }
        this.torchState = false;
      }
    } catch {
      // Fallback state toggle when camera API is unavailable
      this.torchState = target;
    }
    return this.torchState;
  }

  vibrate(ms: number = 25) {
    if (this.isNativeAndroid() && window.AndroidBridge?.vibrate) {
      window.AndroidBridge.vibrate(ms);
      return;
    }
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(ms);
    }
  }
}

export const androidBridge = new AndroidBridgeService();
