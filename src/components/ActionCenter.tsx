import React from 'react';
import { 
  Wifi, 
  Bluetooth, 
  Flashlight, 
  BatteryCharging, 
  Plane, 
  Moon, 
  Signal, 
  Settings as SettingsIcon, 
  Sun, 
  X, 
  Radio, 
  MapPin, 
  Share2, 
  Cast 
} from 'lucide-react';
import { NotificationItem, SystemSettings } from '../types';
import { sounds } from '../services/soundEffects';
import { androidBridge } from '../services/androidBridge';

interface ActionCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  settings: SystemSettings;
  onUpdateSettings: (updates: Partial<SystemSettings>) => void;
  onClearNotifications: () => void;
  onDismissNotification: (id: string) => void;
  onLaunchApp: (pkg: string) => void;
  onOpenSettingsWindow: () => void;
  onSimulateNotification: () => void;
}

export const ActionCenter: React.FC<ActionCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  settings,
  onUpdateSettings,
  onClearNotifications,
  onDismissNotification,
  onLaunchApp,
  onOpenSettingsWindow,
  onSimulateNotification
}) => {
  return (
    <div
      className={`fixed top-0 right-0 bottom-[var(--taskbar-height)] w-[380px] max-w-[92vw] bg-[#121212f2] backdrop-blur-[24px] saturate-[125%] border-l border-white/10 flex flex-col z-[999] text-white select-none transition-transform duration-200 ease-[cubic-bezier(0.1,0.9,0.2,1)] rounded-none ${
        isOpen ? 'translate-x-0 shadow-[-15px_0_40px_rgba(0,0,0,0.7)]' : 'translate-x-full'
      }`}
    >
      {/* Action Center Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <span className="font-semibold text-xs tracking-wide text-white/90">Action center</span>

        {notifications.length > 0 && (
          <button
            onClick={() => {
              sounds.playDismiss();
              onClearNotifications();
            }}
            className="text-[11px] text-[#429ce3] hover:underline"
          >
            Clear all notifications
          </button>
        )}
      </div>

      {/* Notifications Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {notifications.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-white/40 text-center py-16">
            <span className="text-xs font-normal">No new notifications</span>
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => {
                sounds.playClick();
                onLaunchApp(notif.packageName);
                onDismissNotification(notif.id);
                onClose();
              }}
              className="bg-[#1f1f1f] hover:bg-[#282828] border border-white/10 p-3 transition-all cursor-pointer relative group rounded-none"
            >
              {/* App Title Header */}
              <div className="flex items-center justify-between mb-1 text-[11px] text-white/60">
                <div className="flex items-center gap-1.5 font-medium">
                  <span className="text-xs">{notif.icon}</span>
                  <span>{notif.appName}</span>
                </div>
                <span>{notif.timestamp}</span>
              </div>

              {/* Notification Content */}
              <div className="font-semibold text-xs text-white/95">{notif.title}</div>
              <div className="text-[11px] text-white/70 line-clamp-2 mt-0.5">{notif.text}</div>

              {/* Dismiss X button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  sounds.playDismiss();
                  onDismissNotification(notif.id);
                }}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 text-white/60 hover:text-white transition-opacity rounded-none"
              >
                <X size={12} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Screen Brightness Slider */}
      <div className="px-4 py-2.5 bg-black/20 border-t border-white/10 space-y-1">
        <div className="flex items-center justify-between text-[11px] text-white/70">
          <div className="flex items-center gap-1.5">
            <Sun size={13} className="text-amber-400" />
            <span>Brightness</span>
          </div>
          <span className="font-mono text-xs">{settings.brightness}%</span>
        </div>
        <input
          type="range"
          min="20"
          max="100"
          value={settings.brightness}
          onChange={(e) => onUpdateSettings({ brightness: parseInt(e.target.value) })}
          className="w-full accent-[#0078d7] cursor-pointer rounded-none"
        />
      </div>

      {/* Windows 10 Quick Actions Grid (4 Columns, Square Tiles) */}
      <div className="p-3 bg-black/35 border-t border-white/10 grid grid-cols-4 gap-1">
        {/* Network / Wi-Fi */}
        <button
          onClick={() => {
            sounds.playClick();
            onUpdateSettings({ wifiEnabled: !settings.wifiEnabled });
            androidBridge.openSettings('wifi');
          }}
          className={`h-16 border flex flex-col items-center justify-center gap-1 text-[10px] transition-colors rounded-none ${
            settings.wifiEnabled
              ? 'bg-[#0078d7] border-[#0078d7] text-white'
              : 'bg-[#1e1e1e] border-white/5 text-white/60 hover:bg-[#252525]'
          }`}
        >
          <Wifi size={16} />
          <span>Network</span>
        </button>

        {/* Bluetooth */}
        <button
          onClick={() => {
            sounds.playClick();
            onUpdateSettings({ bluetoothEnabled: !settings.bluetoothEnabled });
            androidBridge.openSettings('bluetooth');
          }}
          className={`h-16 border flex flex-col items-center justify-center gap-1 text-[10px] transition-colors rounded-none ${
            settings.bluetoothEnabled
              ? 'bg-[#0078d7] border-[#0078d7] text-white'
              : 'bg-[#1e1e1e] border-white/5 text-white/60 hover:bg-[#252525]'
          }`}
        >
          <Bluetooth size={16} />
          <span>Bluetooth</span>
        </button>

        {/* Night Light */}
        <button
          onClick={() => {
            sounds.playClick();
            onUpdateSettings({ nightLight: !settings.nightLight });
          }}
          className={`h-16 border flex flex-col items-center justify-center gap-1 text-[10px] transition-colors rounded-none ${
            settings.nightLight
              ? 'bg-[#0078d7] border-[#0078d7] text-white'
              : 'bg-[#1e1e1e] border-white/5 text-white/60 hover:bg-[#252525]'
          }`}
        >
          <Moon size={16} />
          <span>Night light</span>
        </button>

        {/* Battery Saver */}
        <button
          onClick={() => {
            sounds.playClick();
            onUpdateSettings({ batterySaver: !settings.batterySaver });
          }}
          className={`h-16 border flex flex-col items-center justify-center gap-1 text-[10px] transition-colors rounded-none ${
            settings.batterySaver
              ? 'bg-[#0078d7] border-[#0078d7] text-white'
              : 'bg-[#1e1e1e] border-white/5 text-white/60 hover:bg-[#252525]'
          }`}
        >
          <BatteryCharging size={16} />
          <span>Battery saver</span>
        </button>

        {/* Airplane Mode */}
        <button
          onClick={() => {
            sounds.playClick();
            onUpdateSettings({ airplaneMode: !settings.airplaneMode });
          }}
          className={`h-16 border flex flex-col items-center justify-center gap-1 text-[10px] transition-colors rounded-none ${
            settings.airplaneMode
              ? 'bg-[#0078d7] border-[#0078d7] text-white'
              : 'bg-[#1e1e1e] border-white/5 text-white/60 hover:bg-[#252525]'
          }`}
        >
          <Plane size={16} />
          <span>Airplane mode</span>
        </button>

        {/* Flashlight / Torch */}
        <button
          onClick={async () => {
            sounds.playClick();
            const state = await androidBridge.toggleTorch();
            onUpdateSettings({ torchEnabled: state });
          }}
          className={`h-16 border flex flex-col items-center justify-center gap-1 text-[10px] transition-colors rounded-none ${
            settings.torchEnabled
              ? 'bg-[#0078d7] border-[#0078d7] text-white font-medium'
              : 'bg-[#1e1e1e] border-white/5 text-white/60 hover:bg-[#252525]'
          }`}
        >
          <Flashlight size={16} />
          <span>Flashlight</span>
        </button>

        {/* Location */}
        <button
          onClick={() => {
            sounds.playClick();
            androidBridge.openSettings('location');
          }}
          className="h-16 border border-white/5 bg-[#1e1e1e] hover:bg-[#252525] text-white/60 flex flex-col items-center justify-center gap-1 text-[10px] rounded-none"
        >
          <MapPin size={16} />
          <span>Location</span>
        </button>

        {/* All Settings */}
        <button
          onClick={() => {
            sounds.playClick();
            onOpenSettingsWindow();
            onClose();
          }}
          className="h-16 border border-white/5 bg-[#1e1e1e] hover:bg-[#252525] text-white/60 flex flex-col items-center justify-center gap-1 text-[10px] rounded-none"
        >
          <SettingsIcon size={16} />
          <span>All settings</span>
        </button>
      </div>
    </div>
  );
};
