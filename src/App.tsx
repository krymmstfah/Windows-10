/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  AppItem, 
  LiveTile, 
  NotificationItem, 
  SystemSettings, 
  WindowItem, 
  WindowAppType 
} from './types';
import { 
  androidBridge, 
  DEFAULT_ANDROID_APPS, 
  INITIAL_NOTIFICATIONS 
} from './services/androidBridge';
import { sounds } from './services/soundEffects';

// Components
import { Desktop } from './components/Desktop';
import { Taskbar } from './components/Taskbar';
import { StartMenu } from './components/StartMenu';
import { ActionCenter } from './components/ActionCenter';
import { SearchOverlay } from './components/SearchOverlay';
import { TaskView } from './components/TaskView';
import { WindowFrame } from './components/WindowFrame';
import { 
  CalendarFlyout, 
  NetworkFlyout, 
  VolumeFlyout, 
  BatteryFlyout 
} from './components/Flyouts';

// Window Apps
import { FileExplorerApp } from './components/apps/FileExplorerApp';
import { SettingsApp, WALLPAPERS } from './components/apps/SettingsApp';
import { EdgeBrowserApp } from './components/apps/EdgeBrowserApp';
import { CalculatorApp } from './components/apps/CalculatorApp';
import { WeatherApp } from './components/apps/WeatherApp';
import { PhotosApp } from './components/apps/PhotosApp';

const INITIAL_TILES: LiveTile[] = [
  {
    id: 'tile-edge',
    appId: 'edge',
    title: 'Microsoft Edge',
    size: 'medium',
    group: 'Productivity',
    color: '#0078d7',
    customIcon: '🌊',
    isLive: false
  },
  {
    id: 'tile-mail',
    appId: 'gmail',
    title: 'Mail',
    size: 'medium',
    group: 'Productivity',
    color: '#005a9e',
    customIcon: '✉️',
    isLive: true,
    liveType: 'mail'
  },
  {
    id: 'tile-calendar',
    appId: 'calendar',
    title: 'Calendar',
    size: 'small',
    group: 'Productivity',
    color: '#107c10',
    customIcon: '📅'
  },
  {
    id: 'tile-files',
    appId: 'files',
    title: 'File Explorer',
    size: 'small',
    group: 'Productivity',
    color: '#f9a825',
    customIcon: '📁'
  },
  {
    id: 'tile-calc',
    appId: 'calculator',
    title: 'Calculator',
    size: 'small',
    group: 'Productivity',
    color: '#5c6bc0',
    customIcon: '🔢'
  },
  {
    id: 'tile-settings',
    appId: 'settings',
    title: 'Settings',
    size: 'small',
    group: 'Productivity',
    color: '#4c4a48',
    customIcon: '⚙️'
  },
  {
    id: 'tile-weather',
    appId: 'weather',
    title: 'MSN Weather',
    size: 'wide',
    group: 'Life at a glance',
    color: '#0078d7',
    customIcon: '☀️',
    isLive: true,
    liveType: 'weather'
  },
  {
    id: 'tile-photos',
    appId: 'photos',
    title: 'Photos',
    size: 'wide',
    group: 'Life at a glance',
    color: '#005a9e',
    customIcon: '🖼️',
    isLive: true,
    liveType: 'photos'
  },
  {
    id: 'tile-store',
    appId: 'playstore',
    title: 'Google Play Store',
    size: 'medium',
    group: 'Play & Explore',
    color: '#00a4ef',
    customIcon: '🛍️'
  },
  {
    id: 'tile-youtube',
    appId: 'youtube',
    title: 'YouTube',
    size: 'medium',
    group: 'Play & Explore',
    color: '#ff0000',
    customIcon: '▶️'
  },
  {
    id: 'tile-spotify',
    appId: 'spotify',
    title: 'Spotify',
    size: 'small',
    group: 'Play & Explore',
    color: '#1db954',
    customIcon: '🎧'
  },
  {
    id: 'tile-whatsapp',
    appId: 'whatsapp',
    title: 'WhatsApp',
    size: 'small',
    group: 'Play & Explore',
    color: '#25d366',
    customIcon: '💬'
  }
];

const WALLPAPERS_CYCLE = [
  '/windows10_hero.svg',
  '/assets/aistudio/image_7623b29c.png',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80'
];

export default function App() {
  // System Settings State
  const [settings, setSettings] = useState<SystemSettings>({
    theme: 'dark',
    accentColor: '#0078d7',
    accentName: 'Windows Blue',
    wallpaper: '/windows10_hero.svg',
    soundEnabled: true,
    brightness: 100,
    volume: 75,
    wifiEnabled: true,
    bluetoothEnabled: true,
    torchEnabled: false,
    batterySaver: false,
    airplaneMode: false,
    nightLight: false,
    activeDesktop: 1
  });

  // Launcher Installed State
  const [apps, setApps] = useState<AppItem[]>([]);
  const [tiles, setTiles] = useState<LiveTile[]>([]);

  // Notifications (Action Center)
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'welcome-notif',
      packageName: 'com.fluent.win10launcher',
      appName: 'Windows 10 Launcher',
      title: 'Action Center Ready',
      text: 'Windows 10 Launcher active. Manage Wi-Fi, Bluetooth, and Brightness from the Quick Actions panel.',
      timestamp: 'Just now',
      icon: '🛡️'
    }
  ]);

  // Shell Navigation & Menus
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isActionCenterOpen, setIsActionCenterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTaskViewOpen, setIsTaskViewOpen] = useState(false);
  const [activeFlyout, setActiveFlyout] = useState<'calendar' | 'network' | 'volume' | 'battery' | null>(null);

  // Windows State
  const [windows, setWindows] = useState<WindowItem[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [nextZIndex, setNextZIndex] = useState(100);

  // Time and Battery
  const [timeString, setTimeString] = useState('12:00 PM');
  const [dateString, setDateString] = useState('1/1/2026');
  const [batteryLevel, setBatteryLevel] = useState(88);
  const [isCharging, setIsCharging] = useState(false);

  // Close all flyouts & popups helper
  const closeAllPopups = useCallback(() => {
    let closed = false;
    if (isStartOpen) { setIsStartOpen(false); closed = true; }
    if (isActionCenterOpen) { setIsActionCenterOpen(false); closed = true; }
    if (isSearchOpen) { setIsSearchOpen(false); closed = true; }
    if (isTaskViewOpen) { setIsTaskViewOpen(false); closed = true; }
    if (activeFlyout) { setActiveFlyout(null); closed = true; }
    return closed;
  }, [isStartOpen, isActionCenterOpen, isSearchOpen, isTaskViewOpen, activeFlyout]);

  // 1. Android Back Key Handler
  useEffect(() => {
    const handleBackKey = () => {
      // 1. Check open menus
      if (closeAllPopups()) return true;

      // 2. Check top focused window
      if (activeWindowId) {
        const topWin = windows.find((w) => w.id === activeWindowId && w.isOpen && !w.isMinimized);
        if (topWin) {
          // Minimize the active window
          setWindows((prev) =>
            prev.map((w) => (w.id === activeWindowId ? { ...w, isMinimized: true } : w))
          );
          setActiveWindowId(null);
          sounds.playWindowSnap();
          return true;
        }
      }

      return false; // at desktop root
    };

    window.handleAndroidBackKey = handleBackKey;

    // Physical Escape / Backspace key fallback
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleBackKey();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeAllPopups, activeWindowId, windows]);

  // 2. Android Notification Bridge Hooks
  useEffect(() => {
    window.postNotification = (id: string, title: string, text: string, pkg: string) => {
      const newNotif: NotificationItem = {
        id: id || `notif-${Date.now()}`,
        packageName: pkg || 'com.android.system',
        appName: pkg.split('.').pop() || 'Android',
        title: title || 'Notification',
        text: text || '',
        timestamp: 'Just now',
        icon: '🔔'
      };
      setNotifications((prev) => [newNotif, ...prev]);
      sounds.playNotification();
    };

    window.removeNotification = (id: string) => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    };
  }, []);

  // 3. System Clock & Battery Polling
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }));
      setDateString(now.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    const updateBattery = async () => {
      const batt = await androidBridge.getBatteryLevel();
      setBatteryLevel(batt.level);
      setIsCharging(batt.isCharging);
    };
    updateBattery();
    const battTimer = setInterval(updateBattery, 8000);

    return () => {
      clearInterval(timer);
      clearInterval(battTimer);
    };
  }, []);

  // 5. Save Tiles
  const handleUpdateTiles = (newTiles: LiveTile[]) => {
    setTiles(newTiles);
    localStorage.setItem('win10_tiles', JSON.stringify(newTiles));
  };

  // 6. Window Management
  const openWindow = (appType: WindowAppType, title: string, icon: string) => {
    sounds.playStartMenu();
    closeAllPopups();

    // Check if window already exists
    const existing = windows.find((w) => w.appType === appType);
    if (existing) {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === existing.id
            ? { ...w, isOpen: true, isMinimized: false, zIndex: nextZIndex + 1 }
            : w
        )
      );
      setActiveWindowId(existing.id);
      setNextZIndex((z) => z + 1);
      return;
    }

    // Default window position & size
    const newWindow: WindowItem = {
      id: `win-${appType}`,
      title,
      appType,
      icon,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      position: {
        x: Math.max(20, Math.min(window.innerWidth - 700, 60 + windows.length * 30)),
        y: Math.max(20, Math.min(window.innerHeight - 540, 40 + windows.length * 25))
      },
      size: { width: 720, height: 500 },
      zIndex: nextZIndex + 1,
      desktopId: settings.activeDesktop
    };

    setWindows((prev) => [...prev, newWindow]);
    setActiveWindowId(newWindow.id);
    setNextZIndex((z) => z + 1);
  };

  const focusWindow = (id: string) => {
    const win = windows.find((w) => w.id === id);
    if (win && win.isMinimized) {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, isMinimized: false, zIndex: nextZIndex + 1 } : w))
      );
    } else {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, zIndex: nextZIndex + 1 } : w))
      );
    }
    setActiveWindowId(id);
    setNextZIndex((z) => z + 1);
  };

  const minimizeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const toggleMaximizeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const updateWindowPosition = (id: string, pos: { x: number; y: number }) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, position: pos } : w)));
  };

  const updateWindowSize = (id: string, size: { width: number; height: number }) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, size } : w)));
  };

  // Launch Android App
  const launchApp = (pkgOrId: string) => {
    // Check if it corresponds to an internal desktop window
    if (pkgOrId === 'com.android.documentsui' || pkgOrId === 'files') {
      openWindow('explorer', 'File Explorer', '📁');
      return;
    }
    if (pkgOrId === 'com.android.settings' || pkgOrId === 'settings') {
      openWindow('settings', 'Settings', '⚙️');
      return;
    }
    if (pkgOrId === 'com.android.calculator2' || pkgOrId === 'calculator') {
      openWindow('calculator', 'Calculator', '🔢');
      return;
    }
    if (pkgOrId === 'com.microsoft.bing.weather' || pkgOrId === 'weather') {
      openWindow('weather', 'MSN Weather', '☀️');
    }
    if (pkgOrId === 'com.google.android.apps.photos' || pkgOrId === 'photos') {
      openWindow('photos', 'Photos', '🖼️');
      return;
    }
    if (pkgOrId === 'com.microsoft.emmx' || pkgOrId === 'edge') {
      openWindow('browser', 'Microsoft Edge', '🌊');
      return;
    }

    // Call native Android bridge launch intent
    const launched = androidBridge.launchApp(pkgOrId);
    if (!launched) {
      alert(`[Android Launcher] Launching Android package: ${pkgOrId}\nIn native WebView wrapper, this starts the Android Intent.`);
    }
    closeAllPopups();
  };

  // Pin app to taskbar
  const pinToTaskbar = (app: AppItem) => {
    const updated = apps.map((a) => (a.id === app.id ? { ...a, isPinnedTaskbar: true } : a));
    setApps(updated);
    localStorage.setItem('win10_android_apps', JSON.stringify(updated));
  };

  // Add custom app
  const addCustomApp = (newApp: AppItem) => {
    const updated = [newApp, ...apps];
    setApps(updated);
    localStorage.setItem('win10_android_apps', JSON.stringify(updated));
  };

  // Simulate Android Notification
  const handleSimulateNotification = () => {
    const templates = [
      { app: 'WhatsApp', pkg: 'com.whatsapp', title: 'Alex Rivers', text: 'Hey, did you finish testing the Android launcher APK?', icon: '💬' },
      { app: 'Gmail', pkg: 'com.google.android.gm', title: 'Security Alert', text: 'New sign-in from your Android device.', icon: '✉️' },
      { app: 'Phone', pkg: 'com.google.android.dialer', title: 'Missed Call', text: 'Missed call from +1 (555) 019-2831', icon: '📞' }
    ];
    const picked = templates[Math.floor(Math.random() * templates.length)];
    if (window.postNotification) {
      window.postNotification(`sim-${Date.now()}`, picked.title, picked.text, picked.pkg);
    }
  };

  // Show Desktop (Minimize all)
  const showDesktop = () => {
    const hasOpen = windows.some((w) => w.isOpen && !w.isMinimized);
    setWindows((prev) =>
      prev.map((w) => ({ ...w, isMinimized: hasOpen ? true : false }))
    );
    closeAllPopups();
  };

  // Cycle Wallpaper Helper
  const cycleWallpaper = () => {
    const currentIndex = WALLPAPERS_CYCLE.indexOf(settings.wallpaper);
    const nextIndex = (currentIndex + 1) % WALLPAPERS_CYCLE.length;
    setSettings((prev) => ({ ...prev, wallpaper: WALLPAPERS_CYCLE[nextIndex] }));
  };

  const pinnedAppsList = apps.filter((a) => a.isPinnedTaskbar);

  return (
    <div className={`w-screen h-screen overflow-hidden ${settings.theme === 'light' ? 'light' : 'dark'}`}>
      {/* Main Desktop Screen */}
      <Desktop
        wallpaper={settings.wallpaper}
        brightness={settings.brightness}
        nightLight={settings.nightLight}
        onOpenWindow={openWindow}
        onLaunchApp={launchApp}
        onOpenSettings={(tab) => openWindow('settings', 'Settings', '⚙️')}
        onCycleWallpaper={cycleWallpaper}
      >
        {/* Render Open Windows */}
        {windows.map((win) => {
          if (win.desktopId !== settings.activeDesktop) return null;
          return (
            <WindowFrame
              key={win.id}
              window={win}
              isActive={activeWindowId === win.id && !win.isMinimized}
              onFocus={() => focusWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
              onMaximizeToggle={() => toggleMaximizeWindow(win.id)}
              onClose={() => closeWindow(win.id)}
              onUpdatePosition={(pos) => updateWindowPosition(win.id, pos)}
              onUpdateSize={(size) => updateWindowSize(win.id, size)}
            >
              {win.appType === 'explorer' && <FileExplorerApp />}
              {win.appType === 'settings' && (
                <SettingsApp
                  settings={settings}
                  onUpdateSettings={(up) => setSettings((s) => ({ ...s, ...up }))}
                  installedApps={apps}
                  onAddCustomApp={addCustomApp}
                />
              )}
              {win.appType === 'browser' && <EdgeBrowserApp />}
              {win.appType === 'calculator' && <CalculatorApp />}
              {win.appType === 'weather' && <WeatherApp />}
              {win.appType === 'photos' && <PhotosApp />}
            </WindowFrame>
          );
        })}
      </Desktop>

      {/* Start Menu */}
      <StartMenu
        isOpen={isStartOpen}
        onClose={() => setIsStartOpen(false)}
        apps={apps}
        onLaunchApp={launchApp}
        onOpenWindow={openWindow}
      />

      {/* Action Center */}
      <ActionCenter
        isOpen={isActionCenterOpen}
        onClose={() => setIsActionCenterOpen(false)}
        notifications={notifications}
        settings={settings}
        onUpdateSettings={(up) => setSettings((s) => ({ ...s, ...up }))}
        onClearNotifications={() => setNotifications([])}
        onDismissNotification={(id) => setNotifications((n) => n.filter((x) => x.id !== id))}
        onLaunchApp={launchApp}
        onOpenSettingsWindow={() => openWindow('settings', 'Settings', '⚙️')}
        onSimulateNotification={handleSimulateNotification}
      />

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        apps={apps}
        onLaunchApp={launchApp}
        onOpenWindow={openWindow}
      />

      {/* Task View */}
      <TaskView
        isOpen={isTaskViewOpen}
        onClose={() => setIsTaskViewOpen(false)}
        windows={windows}
        activeDesktop={settings.activeDesktop}
        onSelectDesktop={(id) => setSettings((s) => ({ ...s, activeDesktop: id }))}
        onAddDesktop={() => setSettings((s) => ({ ...s, activeDesktop: s.activeDesktop === 1 ? 2 : 1 }))}
        onFocusWindow={focusWindow}
        onCloseWindow={closeWindow}
      />

      {/* System Tray Flyouts */}
      <CalendarFlyout
        isOpen={activeFlyout === 'calendar'}
        onClose={() => setActiveFlyout(null)}
        timeString={timeString}
        dateString={dateString}
      />

      <NetworkFlyout
        isOpen={activeFlyout === 'network'}
        onClose={() => setActiveFlyout(null)}
        settings={settings}
        onUpdateSettings={(up) => setSettings((s) => ({ ...s, ...up }))}
        onOpenSettings={() => openWindow('settings', 'Settings', '⚙️')}
      />

      <VolumeFlyout
        isOpen={activeFlyout === 'volume'}
        onClose={() => setActiveFlyout(null)}
        volume={settings.volume}
        onChangeVolume={(v) => setSettings((s) => ({ ...s, volume: v }))}
      />

      <BatteryFlyout
        isOpen={activeFlyout === 'battery'}
        onClose={() => setActiveFlyout(null)}
        batteryLevel={batteryLevel}
        isCharging={isCharging}
      />

      {/* Windows 10 Taskbar */}
      <Taskbar
        isStartOpen={isStartOpen}
        onToggleStart={() => {
          if (isStartOpen) {
            setIsStartOpen(false);
          } else {
            closeAllPopups();
            setIsStartOpen(true);
          }
        }}
        isActionCenterOpen={isActionCenterOpen}
        onToggleActionCenter={() => {
          if (isActionCenterOpen) {
            setIsActionCenterOpen(false);
          } else {
            closeAllPopups();
            setIsActionCenterOpen(true);
          }
        }}
        isSearchOpen={isSearchOpen}
        onToggleSearch={() => {
          if (isSearchOpen) {
            setIsSearchOpen(false);
          } else {
            closeAllPopups();
            setIsSearchOpen(true);
          }
        }}
        isTaskViewOpen={isTaskViewOpen}
        onToggleTaskView={() => {
          if (isTaskViewOpen) {
            setIsTaskViewOpen(false);
          } else {
            closeAllPopups();
            setIsTaskViewOpen(true);
          }
        }}
        pinnedApps={pinnedAppsList}
        windows={windows.filter((w) => w.desktopId === settings.activeDesktop)}
        activeWindowId={activeWindowId}
        onFocusWindow={(id) => {
          if (activeWindowId === id) {
            minimizeWindow(id);
          } else {
            focusWindow(id);
          }
        }}
        onLaunchApp={(app) => launchApp(app.packageName || app.id)}
        onToggleFlyout={(flyout) => {
          if (activeFlyout === flyout) {
            setActiveFlyout(null);
          } else {
            closeAllPopups();
            setActiveFlyout(flyout);
          }
        }}
        activeFlyout={activeFlyout}
        unreadCount={notifications.length}
        batteryLevel={batteryLevel}
        isCharging={isCharging}
        volume={settings.volume}
        wifiEnabled={settings.wifiEnabled}
        timeString={timeString}
        dateString={dateString}
        onShowDesktop={showDesktop}
      />
    </div>
  );
}
