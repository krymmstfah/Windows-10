import React, { useState } from 'react';
import { 
  Wifi, 
  Volume2, 
  VolumeX, 
  Battery, 
  BatteryCharging, 
  Settings as SettingsIcon, 
  ChevronRight, 
  Check, 
  Calendar as CalendarIcon,
  ChevronLeft,
  Smartphone,
  Download
} from 'lucide-react';
import { SystemSettings } from '../types';
import { sounds } from '../services/soundEffects';
import { androidBridge } from '../services/androidBridge';

interface CalendarFlyoutProps {
  isOpen: boolean;
  onClose: () => void;
  timeString: string;
  dateString: string;
}

export const CalendarFlyout: React.FC<CalendarFlyoutProps> = ({
  isOpen,
  onClose,
  timeString,
  dateString
}) => {
  if (!isOpen) return null;

  const today = new Date();
  const currentMonth = today.toLocaleString('default', { month: 'long', year: 'numeric' });
  const currentDay = today.getDate();

  // Days in month calculation
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed bottom-[var(--taskbar-height)] right-2 w-[340px] bg-[#1a1a1ae0] backdrop-blur-[24px] saturate-[130%] border border-white/10 rounded-none shadow-2xl p-4 text-white z-[1000] select-none animate-in fade-in zoom-in-95 duration-150"
    >
      {/* Clock Top */}
      <div className="pb-3 border-b border-white/10">
        <div className="text-3xl font-light tracking-tight">{timeString}</div>
        <div className="text-xs text-[#0078d7] font-medium mt-0.5">{dateString}</div>
      </div>

      {/* Month Header */}
      <div className="flex items-center justify-between py-3">
        <span className="font-semibold text-xs">{currentMonth}</span>
        <div className="flex items-center gap-1">
          <button className="p-1 rounded hover:bg-white/10 text-white/60">
            <ChevronLeft size={14} />
          </button>
          <button className="p-1 rounded hover:bg-white/10 text-white/60">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-white/50 mb-1">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
          <div key={d} className="py-1">{d}</div>
        ))}
      </div>

      {/* Calendar Days Matrix */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {days.map((d, idx) => {
          if (!d) return <div key={idx} />;
          const isToday = d === currentDay;
          return (
            <div
              key={idx}
              className={`py-1.5 rounded transition-colors cursor-pointer ${
                isToday
                  ? 'bg-[#0078d7] text-white font-bold'
                  : 'hover:bg-white/10 text-white/90'
              }`}
            >
              {d}
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface NetworkFlyoutProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SystemSettings;
  onUpdateSettings: (updates: Partial<SystemSettings>) => void;
  onOpenSettings: () => void;
}

export const NetworkFlyout: React.FC<NetworkFlyoutProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onOpenSettings
}) => {
  if (!isOpen) return null;

  const networks = [
    { name: 'Android_Hotspot_5G', connected: true, strength: 'Strong', secured: true },
    { name: 'Home_WiFi_2.4G', connected: false, strength: 'Good', secured: true },
    { name: 'Public_WiFi_Airport', connected: false, strength: 'Weak', secured: false }
  ];

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed bottom-[var(--taskbar-height)] right-16 w-72 bg-[#1a1a1ae0] backdrop-blur-[24px] saturate-[130%] border border-white/10 rounded-none shadow-2xl p-3 text-white z-[1000] select-none animate-in fade-in zoom-in-95 duration-150 space-y-3"
    >
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <span className="font-semibold text-xs">Network & Wi-Fi</span>
        <button
          onClick={() => {
            sounds.playClick();
            onUpdateSettings({ wifiEnabled: !settings.wifiEnabled });
            androidBridge.openSettings('wifi');
          }}
          className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
            settings.wifiEnabled ? 'bg-[#0078d7] text-white' : 'bg-white/10 text-white/60'
          }`}
        >
          {settings.wifiEnabled ? 'Wi-Fi On' : 'Wi-Fi Off'}
        </button>
      </div>

      {/* Networks List */}
      <div className="space-y-1 text-xs">
        {settings.wifiEnabled ? (
          networks.map((net, i) => (
            <div
              key={i}
              onClick={() => sounds.playClick()}
              className="flex items-center justify-between p-2 rounded hover:bg-white/10 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Wifi size={14} className={net.connected ? 'text-[#0078d7]' : 'text-white/60'} />
                <div>
                  <div className="font-medium">{net.name}</div>
                  <div className="text-[10px] text-white/50">{net.connected ? 'Connected, secured' : net.strength}</div>
                </div>
              </div>
              {net.connected && <Check size={14} className="text-[#0078d7]" />}
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-white/40 text-xs">Wi-Fi is turned off</div>
        )}
      </div>

      <button
        onClick={() => {
          onOpenSettings();
          onClose();
        }}
        className="w-full text-left text-[11px] text-[#429ce3] hover:underline pt-1 flex items-center justify-between"
      >
        <span>Network & Internet settings</span>
        <ChevronRight size={12} />
      </button>
    </div>
  );
};

interface VolumeFlyoutProps {
  isOpen: boolean;
  onClose: () => void;
  volume: number;
  onChangeVolume: (v: number) => void;
}

export const VolumeFlyout: React.FC<VolumeFlyoutProps> = ({
  isOpen,
  onClose,
  volume,
  onChangeVolume
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed bottom-[var(--taskbar-height)] right-24 w-64 bg-[#1a1a1ae0] backdrop-blur-[24px] saturate-[130%] border border-white/10 rounded-none shadow-2xl p-3 text-white z-[1000] select-none animate-in fade-in zoom-in-95 duration-150 space-y-2"
    >
      <div className="text-xs text-white/70">Speakers (Realtek Audio / Android)</div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            sounds.playClick();
            onChangeVolume(volume > 0 ? 0 : 75);
          }}
          className="p-1 hover:bg-white/10 rounded"
        >
          {volume === 0 ? <VolumeX size={16} className="text-red-400" /> : <Volume2 size={16} />}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => onChangeVolume(parseInt(e.target.value))}
          className="flex-1 accent-[#0078d7] cursor-pointer"
        />
        <span className="w-8 text-right font-mono text-xs">{volume}</span>
      </div>
    </div>
  );
};

interface BatteryFlyoutProps {
  isOpen: boolean;
  onClose: () => void;
  batteryLevel: number;
  isCharging: boolean;
}

export const BatteryFlyout: React.FC<BatteryFlyoutProps> = ({
  isOpen,
  onClose,
  batteryLevel,
  isCharging
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed bottom-[var(--taskbar-height)] right-28 w-64 bg-[#1a1a1ae0] backdrop-blur-[24px] saturate-[130%] border border-white/10 rounded-none shadow-2xl p-4 text-white z-[1000] select-none animate-in fade-in zoom-in-95 duration-150 space-y-3"
    >
      <div className="flex items-center gap-3">
        {isCharging ? (
          <BatteryCharging size={26} className="text-emerald-400" />
        ) : (
          <Battery size={26} className="text-[#0078d7]" />
        )}
        <div>
          <div className="text-xl font-light">{batteryLevel}% remaining</div>
          <div className="text-[11px] text-white/60">{isCharging ? 'Plugged in, charging' : 'On battery power'}</div>
        </div>
      </div>

      <div className="pt-2 border-t border-white/10 space-y-1.5">
        <div className="flex justify-between text-[11px] text-white/60">
          <span>Battery Saver</span>
          <span>Best Performance</span>
        </div>
        <input type="range" min="1" max="4" defaultValue="3" className="w-full accent-[#0078d7]" />
      </div>
    </div>
  );
};
