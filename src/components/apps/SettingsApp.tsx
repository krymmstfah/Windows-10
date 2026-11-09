import React, { useState } from 'react';
import { 
  Palette, 
  Smartphone, 
  Code, 
  Info, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Flashlight, 
  Battery, 
  Plus, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { SystemSettings, AppItem } from '../../types';
import { androidBridge } from '../../services/androidBridge';
import { sounds } from '../../services/soundEffects';
import { 
  ANDROID_MANIFEST_XML, 
  MAIN_ACTIVITY_JAVA, 
  NOTIFICATION_SERVICE_JAVA, 
  BUILD_GRADLE 
} from '../../services/androidExportTemplates';

interface SettingsAppProps {
  settings: SystemSettings;
  onUpdateSettings: (updates: Partial<SystemSettings>) => void;
  installedApps: AppItem[];
  onAddCustomApp: (app: AppItem) => void;
}

export const ACCENT_COLORS = [
  { name: 'Windows Blue', hex: '#0078d7' },
  { name: 'Electric Purple', hex: '#881798' },
  { name: 'Emerald Green', hex: '#107c10' },
  { name: 'Crimson Red', hex: '#e81123' },
  { name: 'Cyan Blue', hex: '#00bcf2' },
  { name: 'Sunset Orange', hex: '#d83b01' },
  { name: 'Gold Rush', hex: '#ffb900' },
  { name: 'Slate Gray', hex: '#5c6bc0' }
];

export const WALLPAPERS = [
  {
    id: 'user-bliss',
    name: 'Bliss Anime Hill (User Wallpaper)',
    url: '/assets/aistudio/image_7623b29c.png',
    color: '#387800'
  },
  {
    id: 'hero',
    name: 'Windows 10 Hero (Classic)',
    url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1920&q=80',
    color: '#004275'
  },
  {
    id: 'aurora',
    name: 'Dark Aurora Minimal',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
    color: '#0f172a'
  },
  {
    id: 'geometry',
    name: 'Fluent Geometry Dark',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80',
    color: '#18181b'
  }
];

export const SettingsApp: React.FC<SettingsAppProps> = ({
  settings,
  onUpdateSettings,
  installedApps,
  onAddCustomApp
}) => {
  const [activeTab, setActiveTab] = useState<'personalize' | 'launcher' | 'export' | 'about'>('personalize');
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const [customWallInput, setCustomWallInput] = useState('');
  
  // Custom App Form State
  const [newAppName, setNewAppName] = useState('');
  const [newAppPkg, setNewAppPkg] = useState('');
  const [newAppIcon, setNewAppIcon] = useState('📱');
  const [newAppCategory, setNewAppCategory] = useState('Utilities');
  const [appAddedSuccess, setAppAddedSuccess] = useState(false);

  const copyCode = (code: string, fileName: string) => {
    navigator.clipboard.writeText(code);
    setCopiedFile(fileName);
    sounds.playClick();
    setTimeout(() => setCopiedFile(null), 2000);
  };

  const handleCreateApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAppName.trim() || !newAppPkg.trim()) return;

    const newApp: AppItem = {
      id: `custom-${Date.now()}`,
      name: newAppName.trim(),
      packageName: newAppPkg.trim(),
      icon: newAppIcon || '📱',
      category: newAppCategory,
      isPinnedTaskbar: false,
      isSystem: false,
      color: settings.accentColor
    };

    onAddCustomApp(newApp);
    setNewAppName('');
    setNewAppPkg('');
    setAppAddedSuccess(true);
    sounds.playNotification();
    setTimeout(() => setAppAddedSuccess(false), 3000);
  };

  return (
    <div className="flex h-full bg-[#1f1f1f] text-white select-none text-xs">
      {/* Left Sidebar Navigation */}
      <div className="w-52 bg-[#181818] border-r border-white/10 p-3 flex flex-col gap-1">
        <div className="px-3 py-2 text-sm font-semibold tracking-wide text-white/90 flex items-center gap-2">
          <span>Settings</span>
        </div>

        <button
          onClick={() => { setActiveTab('personalize'); sounds.playClick(); }}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors text-left ${
            activeTab === 'personalize' ? 'bg-[#0078d7] text-white font-medium' : 'hover:bg-white/10 text-white/70'
          }`}
        >
          <Palette size={16} />
          <span>Personalization</span>
        </button>

        <button
          onClick={() => { setActiveTab('launcher'); sounds.playClick(); }}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors text-left ${
            activeTab === 'launcher' ? 'bg-[#0078d7] text-white font-medium' : 'hover:bg-white/10 text-white/70'
          }`}
        >
          <Smartphone size={16} />
          <span>Android Launcher</span>
        </button>

        <button
          onClick={() => { setActiveTab('export'); sounds.playClick(); }}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors text-left ${
            activeTab === 'export' ? 'bg-[#0078d7] text-white font-medium' : 'hover:bg-white/10 text-white/70'
          }`}
        >
          <Code size={16} />
          <span>Android Studio Export</span>
        </button>

        <button
          onClick={() => { setActiveTab('about'); sounds.playClick(); }}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors text-left ${
            activeTab === 'about' ? 'bg-[#0078d7] text-white font-medium' : 'hover:bg-white/10 text-white/70'
          }`}
        >
          <Info size={16} />
          <span>About & System</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* ===================== PERSONALIZATION ===================== */}
        {activeTab === 'personalize' && (
          <div className="max-w-2xl space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-1">Personalization</h2>
              <p className="text-white/60">Customize wallpaper, Windows 10 accent color, and Fluent effects.</p>
            </div>

            {/* Theme Toggle */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
              <span className="font-semibold text-sm">Choose your color mode</span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    onUpdateSettings({ theme: 'dark' });
                    document.documentElement.classList.remove('light');
                    document.documentElement.classList.add('dark');
                    sounds.playClick();
                  }}
                  className={`flex items-center justify-center gap-2 p-3 rounded border transition-all ${
                    settings.theme === 'dark' ? 'border-[#0078d7] bg-[#0078d7]/20 font-semibold' : 'border-white/10 hover:bg-white/5'
                  }`}
                >
                  <Moon size={16} />
                  <span>Dark (Default)</span>
                </button>

                <button
                  onClick={() => {
                    onUpdateSettings({ theme: 'light' });
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                    sounds.playClick();
                  }}
                  className={`flex items-center justify-center gap-2 p-3 rounded border transition-all ${
                    settings.theme === 'light' ? 'border-[#0078d7] bg-[#0078d7]/20 font-semibold' : 'border-white/10 hover:bg-white/5'
                  }`}
                >
                  <Sun size={16} />
                  <span>Light Mode</span>
                </button>
              </div>
            </div>

            {/* Accent Colors */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
              <span className="font-semibold text-sm">Windows Accent Color</span>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {ACCENT_COLORS.map((color) => {
                  const isSelected = settings.accentColor.toLowerCase() === color.hex.toLowerCase();
                  return (
                    <button
                      key={color.name}
                      onClick={() => {
                        onUpdateSettings({ accentColor: color.hex, accentName: color.name });
                        document.documentElement.style.setProperty('--accent', color.hex);
                        sounds.playClick();
                      }}
                      title={color.name}
                      style={{ backgroundColor: color.hex }}
                      className={`h-10 rounded flex items-center justify-center transition-transform hover:scale-105 relative ${
                        isSelected ? 'ring-2 ring-white shadow-lg scale-105' : ''
                      }`}
                    >
                      {isSelected && <Check size={16} className="text-white drop-shadow" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Wallpapers */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
              <span className="font-semibold text-sm">Background Wallpaper</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {WALLPAPERS.map((wall) => {
                  const isCur = settings.wallpaper === wall.url;
                  return (
                    <div
                      key={wall.id}
                      onClick={() => {
                        onUpdateSettings({ wallpaper: wall.url });
                        sounds.playClick();
                      }}
                      className={`cursor-pointer rounded border overflow-hidden transition-all ${
                        isCur ? 'border-[#0078d7] ring-2 ring-[#0078d7]' : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div
                        className="h-20 bg-cover bg-center"
                        style={{ backgroundImage: `url(${wall.url})` }}
                      />
                      <div className="p-2 bg-[#252525] text-[11px] truncate">{wall.name}</div>
                    </div>
                  );
                })}
              </div>

              {/* Custom Image URL */}
              <div className="pt-2 flex gap-2">
                <input
                  type="url"
                  placeholder="Paste custom wallpaper image URL..."
                  value={customWallInput}
                  onChange={(e) => setCustomWallInput(e.target.value)}
                  className="flex-1 bg-[#181818] border border-white/15 rounded px-3 py-1.5 text-xs text-white outline-none focus:border-[#0078d7]"
                />
                <button
                  onClick={() => {
                    if (customWallInput.trim()) {
                      onUpdateSettings({ wallpaper: customWallInput.trim() });
                      sounds.playNotification();
                    }
                  }}
                  className="px-3 py-1.5 bg-[#0078d7] hover:bg-[#0063b1] rounded text-white font-medium"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Sound Toggle */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center justify-between">
              <div>
                <div className="font-semibold text-sm">Windows Sound Effects</div>
                <div className="text-white/60">Synthesized audio cues for menus, toasts, and snaps</div>
              </div>
              <button
                onClick={() => {
                  const next = !settings.soundEnabled;
                  onUpdateSettings({ soundEnabled: next });
                  sounds.enabled = next;
                  if (next) sounds.playNotification();
                }}
                className={`p-2 rounded-full border transition-colors ${
                  settings.soundEnabled ? 'bg-[#0078d7] border-[#0078d7] text-white' : 'bg-white/10 border-white/10 text-white/50'
                }`}
              >
                {settings.soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
            </div>
          </div>
        )}

        {/* ===================== ANDROID LAUNCHER ===================== */}
        {activeTab === 'launcher' && (
          <div className="max-w-2xl space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-1">Android Launcher Integration</h2>
              <p className="text-white/60">Check Android Native Bridge connectivity, test hardware controls, and manage installed packages.</p>
            </div>

            {/* Native Bridge Status */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-lg ${androidBridge.isNativeAndroid() ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div className="font-semibold text-sm">
                    {androidBridge.isNativeAndroid() ? 'Native Android Bridge Connected' : 'Android Bridge Emulation Active'}
                  </div>
                  <div className="text-white/60 text-[11px]">
                    {androidBridge.isNativeAndroid()
                      ? 'Communicating with native Android OS PackageManager & System Services.'
                      : 'Running in high-performance browser preview. All bridge APIs return simulated system responses.'}
                  </div>
                </div>
              </div>
            </div>

            {/* Hardware Quick Action Testers */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
              <span className="font-semibold text-sm">Hardware Bridge Controls</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={async () => {
                    const state = await androidBridge.toggleTorch();
                    onUpdateSettings({ torchEnabled: state });
                    sounds.playClick();
                  }}
                  className={`p-3 rounded border flex flex-col items-center gap-1.5 transition-colors ${
                    settings.torchEnabled ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                  }`}
                >
                  <Flashlight size={18} />
                  <span>{settings.torchEnabled ? 'Torch On' : 'Test Torch'}</span>
                </button>

                <button
                  onClick={async () => {
                    const batt = await androidBridge.getBatteryLevel();
                    alert(`Battery Status: ${batt.level}% (${batt.isCharging ? 'Charging ⚡' : 'Discharging'})`);
                    sounds.playClick();
                  }}
                  className="p-3 rounded border border-white/10 bg-white/5 hover:bg-white/10 flex flex-col items-center gap-1.5 text-white/80"
                >
                  <Battery size={18} />
                  <span>Check Battery</span>
                </button>

                <button
                  onClick={() => {
                    androidBridge.vibrate(100);
                    sounds.playNotification();
                  }}
                  className="p-3 rounded border border-white/10 bg-white/5 hover:bg-white/10 flex flex-col items-center gap-1.5 text-white/80"
                >
                  <Smartphone size={18} />
                  <span>Vibrate Test</span>
                </button>
              </div>
            </div>

            {/* Add Custom Application to Launcher */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
              <span className="font-semibold text-sm">Add Custom Android App (APK Simulation)</span>
              <p className="text-white/60 text-[11px]">Register any package name to test launcher search and drawer indexing.</p>

              {appAddedSuccess && (
                <div className="p-2.5 rounded bg-emerald-500/20 border border-emerald-500 text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  <span>App added successfully to Start Menu & Search!</span>
                </div>
              )}

              <form onSubmit={handleCreateApp} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-white/60 block mb-1">App Name</label>
                    <input
                      type="text"
                      placeholder="e.g. TikTok, Netflix, Slack"
                      value={newAppName}
                      onChange={(e) => setNewAppName(e.target.value)}
                      required
                      className="w-full bg-[#181818] border border-white/15 rounded px-3 py-1.5 text-xs text-white outline-none focus:border-[#0078d7]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-white/60 block mb-1">Package Name</label>
                    <input
                      type="text"
                      placeholder="e.g. com.zhiliaoapp.musically"
                      value={newAppPkg}
                      onChange={(e) => setNewAppPkg(e.target.value)}
                      required
                      className="w-full bg-[#181818] border border-white/15 rounded px-3 py-1.5 text-xs text-white outline-none focus:border-[#0078d7]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-white/60 block mb-1">Icon (Emoji or URL)</label>
                    <input
                      type="text"
                      placeholder="e.g. 🎬, 🚀, or icon URL"
                      value={newAppIcon}
                      onChange={(e) => setNewAppIcon(e.target.value)}
                      className="w-full bg-[#181818] border border-white/15 rounded px-3 py-1.5 text-xs text-white outline-none focus:border-[#0078d7]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-white/60 block mb-1">Category</label>
                    <select
                      value={newAppCategory}
                      onChange={(e) => setNewAppCategory(e.target.value)}
                      className="w-full bg-[#181818] border border-white/15 rounded px-3 py-1.5 text-xs text-white outline-none focus:border-[#0078d7]"
                    >
                      <option value="Productivity">Productivity</option>
                      <option value="Media">Media & Video</option>
                      <option value="Communication">Communication</option>
                      <option value="Games">Games</option>
                      <option value="Utilities">Utilities</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#0078d7] hover:bg-[#0063b1] rounded text-white font-medium transition-colors"
                >
                  <Plus size={14} />
                  <span>Register Application</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ===================== ANDROID STUDIO EXPORT ===================== */}
        {activeTab === 'export' && (
          <div className="max-w-2xl space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-1">Android Studio & APK Export Files</h2>
              <p className="text-white/60">
                Full production source code to compile this launcher into a native Android APK using Android Studio, Cordova, or Capacitor.
              </p>
            </div>

            <div className="bg-[#181818] border border-white/10 rounded-lg p-3 space-y-2">
              <span className="font-semibold text-xs text-white/90">How to build your APK:</span>
              <ol className="list-decimal list-inside space-y-1 text-white/70 text-[11px] leading-relaxed">
                <li>Create a new empty project in Android Studio (Minimum SDK 26, Java or Kotlin).</li>
                <li>Copy the <code className="text-[#429ce3]">AndroidManifest.xml</code> below into <code className="text-white/90">app/src/main/AndroidManifest.xml</code>.</li>
                <li>Copy <code className="text-[#429ce3]">MainActivity.java</code> and <code className="text-[#429ce3]">LauncherNotificationService.java</code> into your package directory.</li>
                <li>Run <code className="text-emerald-400">npm run build</code> and copy the output <code className="text-white/90">dist/</code> folder into <code className="text-white/90">app/src/main/assets/dist/</code>.</li>
                <li>Build and install the APK on your Android phone, then set Windows 10 Launcher as default home!</li>
              </ol>
            </div>

            {/* AndroidManifest.xml */}
            <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 bg-[#252525] border-b border-white/10">
                <span className="font-mono text-[11px] text-[#429ce3]">AndroidManifest.xml (Default HOME Category)</span>
                <button
                  onClick={() => copyCode(ANDROID_MANIFEST_XML, 'manifest')}
                  className="flex items-center gap-1 px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-white text-[11px]"
                >
                  {copiedFile === 'manifest' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copiedFile === 'manifest' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-3 text-[10px] font-mono text-white/80 overflow-x-auto max-h-48 leading-relaxed">
                {ANDROID_MANIFEST_XML}
              </pre>
            </div>

            {/* MainActivity.java */}
            <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 bg-[#252525] border-b border-white/10">
                <span className="font-mono text-[11px] text-[#429ce3]">MainActivity.java (Native AndroidBridge & Back Key)</span>
                <button
                  onClick={() => copyCode(MAIN_ACTIVITY_JAVA, 'main_activity')}
                  className="flex items-center gap-1 px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-white text-[11px]"
                >
                  {copiedFile === 'main_activity' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copiedFile === 'main_activity' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-3 text-[10px] font-mono text-white/80 overflow-x-auto max-h-48 leading-relaxed">
                {MAIN_ACTIVITY_JAVA}
              </pre>
            </div>

            {/* LauncherNotificationService.java */}
            <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 bg-[#252525] border-b border-white/10">
                <span className="font-mono text-[11px] text-[#429ce3]">LauncherNotificationService.java (Live Notification Listener)</span>
                <button
                  onClick={() => copyCode(NOTIFICATION_SERVICE_JAVA, 'notif_service')}
                  className="flex items-center gap-1 px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-white text-[11px]"
                >
                  {copiedFile === 'notif_service' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copiedFile === 'notif_service' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-3 text-[10px] font-mono text-white/80 overflow-x-auto max-h-48 leading-relaxed">
                {NOTIFICATION_SERVICE_JAVA}
              </pre>
            </div>

            {/* build.gradle */}
            <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 bg-[#252525] border-b border-white/10">
                <span className="font-mono text-[11px] text-[#429ce3]">app/build.gradle</span>
                <button
                  onClick={() => copyCode(BUILD_GRADLE, 'gradle')}
                  className="flex items-center gap-1 px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-white text-[11px]"
                >
                  {copiedFile === 'gradle' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copiedFile === 'gradle' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-3 text-[10px] font-mono text-white/80 overflow-x-auto max-h-36 leading-relaxed">
                {BUILD_GRADLE}
              </pre>
            </div>
          </div>
        )}

        {/* ===================== ABOUT ===================== */}
        {activeTab === 'about' && (
          <div className="max-w-2xl space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-1">About Windows 10 Launcher</h2>
              <p className="text-white/60">Android Home Replacement with Microsoft Fluent Design System.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded bg-[#0078d7] flex items-center justify-center font-bold text-white text-xl">
                  ⊞
                </div>
                <div>
                  <div className="text-base font-semibold">Windows 10 Android Edition</div>
                  <div className="text-white/60">Version 22H2 (OS Build 19045.3803)</div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-3 space-y-1.5 text-white/80">
                <div className="flex justify-between">
                  <span className="text-white/50">Installed Apps</span>
                  <span className="font-mono">{installedApps.length} packages indexed</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Runtime Environment</span>
                  <span>React 19 + Vite 8 + Tailwind CSS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Design System</span>
                  <span>Microsoft Fluent System (Acrylic & Reveal Lighting)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Platform Target</span>
                  <span>Android (API 26+) / PWA Standalone</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
