import React, { useState, useRef } from 'react';
import { 
  Wifi, 
  Volume2, 
  VolumeX, 
  Battery, 
  BatteryCharging, 
  ChevronUp 
} from 'lucide-react';
import { AppItem, WindowItem } from '../types';
import { sounds } from '../services/soundEffects';

interface TaskbarProps {
  isStartOpen: boolean;
  onToggleStart: () => void;
  isActionCenterOpen: boolean;
  onToggleActionCenter: () => void;
  isSearchOpen: boolean;
  onToggleSearch: () => void;
  isTaskViewOpen: boolean;
  onToggleTaskView: () => void;
  pinnedApps: AppItem[];
  windows: WindowItem[];
  activeWindowId: string | null;
  onFocusWindow: (id: string) => void;
  onLaunchApp: (app: AppItem) => void;
  onToggleFlyout: (type: 'calendar' | 'network' | 'volume' | 'battery') => void;
  activeFlyout: string | null;
  unreadCount: number;
  batteryLevel: number;
  isCharging: boolean;
  volume: number;
  wifiEnabled: boolean;
  timeString: string;
  dateString: string;
  onShowDesktop: () => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  isStartOpen,
  onToggleStart,
  isActionCenterOpen,
  onToggleActionCenter,
  isSearchOpen,
  onToggleSearch,
  isTaskViewOpen,
  onToggleTaskView,
  pinnedApps,
  windows,
  activeWindowId,
  onFocusWindow,
  onLaunchApp,
  onToggleFlyout,
  activeFlyout,
  unreadCount,
  batteryLevel,
  isCharging,
  volume,
  wifiEnabled,
  timeString,
  dateString,
  onShowDesktop
}) => {
  const [hoveredAppId, setHoveredAppId] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<any>(null);

  const handleAppMouseEnter = (id: string) => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredAppId(id);
    }, 200);
  };

  const handleAppMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setHoveredAppId(null);
  };

  // Group of open windows for taskbar
  const taskbarApps = windows.filter((w) => w.isOpen);

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-[var(--taskbar-height)] bg-[#0c0c0ce6] backdrop-blur-[24px] saturate-[125%] border-t border-white/10 flex items-center justify-between z-[1000] text-white select-none">
      {/* ===================== LEFT ZONE ===================== */}
      <div className="flex items-center h-full">
        {/* Authentic Windows 10 Start Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            sounds.playStartMenu();
            onToggleStart();
          }}
          className={`h-full w-12 flex items-center justify-center transition-colors group relative rounded-none ${
            isStartOpen ? 'bg-white/20' : 'hover:bg-white/10 active:bg-white/15'
          }`}
          title="Start"
        >
          {/* Windows 10 4-Quad Flag Logo */}
          <svg 
            className="w-4 h-4 fill-white group-hover:fill-[#00bcf2] transition-colors" 
            viewBox="0 0 16 16"
          >
            <path d="M0 2.22 6.55 1.3v6.37H0V2.22zm0 6.13h6.55v6.37L0 13.8V8.35zm7.25-7.14L16 0v7.67H7.25V1.21zm8.75 7.14V16l-8.75-1.21V8.35H16z" />
          </svg>
        </button>

        {/* Windows 10 Search Bar (Type here to search) */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            sounds.playClick();
            onToggleSearch();
          }}
          className={`hidden sm:flex items-center h-[34px] w-64 bg-[#1e1e1e] hover:bg-[#252525] border px-3 gap-2.5 cursor-text transition-colors mx-1 rounded-none ${
            isSearchOpen ? 'border-[#0078d7]' : 'border-white/15 hover:border-white/30'
          }`}
        >
          {/* Magnifying Glass */}
          <svg className="w-3.5 h-3.5 text-white/70 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="square" strokeWidth="2.5" d="M21 21l-5.2-5.2m2.2-5A7 7 0 1111 4a7 7 0 017 7z" />
          </svg>
          <span className="text-xs text-white/60 truncate flex-1 font-normal">Type here to search</span>

          {/* Cortana Circle Ring Icon */}
          <div className="w-3.5 h-3.5 rounded-full border border-white/40 shrink-0" title="Cortana" />
        </div>

        {/* Windows 10 Task View Icon (Two overlapping rectangles) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            sounds.playClick();
            onToggleTaskView();
          }}
          className={`h-full w-11 flex items-center justify-center transition-colors rounded-none ${
            isTaskViewOpen ? 'bg-white/20' : 'hover:bg-white/10'
          }`}
          title="Task View"
        >
          <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 16 16">
            <rect x="1.5" y="2.5" width="8" height="10" strokeWidth="1.3" />
            <rect x="6.5" y="5.5" width="8" height="8" strokeWidth="1.3" />
          </svg>
        </button>
      </div>

      {/* ===================== CENTER: OPEN WINDOWS ===================== */}
      <div className="flex-1 flex items-center h-full px-1 overflow-x-auto overflow-y-hidden">
        {taskbarApps.map((win) => {
          const isActive = activeWindowId === win.id && !win.isMinimized;

          return (
            <div
              key={win.id}
              className="relative h-full"
              onMouseEnter={() => handleAppMouseEnter(win.id)}
              onMouseLeave={handleAppMouseLeave}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  sounds.playClick();
                  if (isActive) {
                    onFocusWindow(win.id);
                  } else {
                    onFocusWindow(win.id);
                  }
                }}
                className={`h-full px-3 min-w-[46px] flex items-center justify-center transition-all relative rounded-none ${
                  isActive
                    ? 'bg-white/15'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
                title={win.title}
              >
                <span className="text-xl drop-shadow">{win.icon}</span>

                {/* Underline Indicator */}
                <div
                  className={`absolute bottom-0 rounded-none transition-all duration-150 ${
                    isActive
                      ? 'h-[2.5px] w-6 bg-[#0078d7]'
                      : 'h-[2px] w-3 bg-white/40'
                  }`}
                />
              </button>

              {/* Hover Preview Tooltip */}
              {hoveredAppId === win.id && (
                <div className="absolute bottom-[calc(var(--taskbar-height)+4px)] left-1/2 -translate-x-1/2 w-48 bg-[#1f1f1f] border border-white/20 shadow-2xl p-2 text-xs pointer-events-none z-50 rounded-none animate-in fade-in duration-100">
                  <div className="flex items-center gap-1.5 font-medium mb-1.5 text-white/90 truncate">
                    <span>{win.icon}</span>
                    <span className="truncate">{win.title}</span>
                  </div>
                  <div className="h-20 bg-black/50 border border-white/5 flex items-center justify-center text-white/40 text-[10px]">
                    Active
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ===================== RIGHT: SYSTEM TRAY ===================== */}
      <div className="flex items-center h-full text-xs">
        {/* Tray Up Chevron */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFlyout('network');
          }}
          className="h-full px-2 flex items-center justify-center hover:bg-white/10 text-white/70"
          title="Show hidden icons"
        >
          <ChevronUp size={14} />
        </button>

        {/* Battery Status */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            sounds.playClick();
            onToggleFlyout('battery');
          }}
          className={`h-full px-2 flex items-center gap-1 transition-colors rounded-none ${
            activeFlyout === 'battery' ? 'bg-white/20' : 'hover:bg-white/10'
          }`}
          title={`Battery: ${batteryLevel}%`}
        >
          {isCharging ? (
            <BatteryCharging size={16} className="text-emerald-400" />
          ) : (
            <Battery size={16} className="text-white" />
          )}
          <span className="text-[11px] font-mono hidden md:inline">{batteryLevel}%</span>
        </button>

        {/* Network / Wi-Fi */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            sounds.playClick();
            onToggleFlyout('network');
          }}
          className={`h-full px-2 flex items-center justify-center transition-colors rounded-none ${
            activeFlyout === 'network' ? 'bg-white/20' : 'hover:bg-white/10'
          }`}
          title="Network"
        >
          <Wifi size={15} className={wifiEnabled ? 'text-white' : 'text-white/40'} />
        </button>

        {/* Volume */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            sounds.playClick();
            onToggleFlyout('volume');
          }}
          className={`h-full px-2 flex items-center justify-center transition-colors rounded-none ${
            activeFlyout === 'volume' ? 'bg-white/20' : 'hover:bg-white/10'
          }`}
          title={`Volume: ${volume}%`}
        >
          {volume === 0 ? <VolumeX size={15} className="text-red-400" /> : <Volume2 size={15} />}
        </button>

        {/* Windows 10 Clock & Date */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            sounds.playClick();
            onToggleFlyout('calendar');
          }}
          className={`h-full px-2.5 flex flex-col justify-center text-right leading-tight transition-colors rounded-none ${
            activeFlyout === 'calendar' ? 'bg-white/20' : 'hover:bg-white/10'
          }`}
        >
          <span className="text-[11px] font-normal">{timeString}</span>
          <span className="text-[10px] text-white/70">{dateString}</span>
        </button>

        {/* Authentic Windows 10 Action Center Speech-Bubble Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            sounds.playClick();
            onToggleActionCenter();
          }}
          className={`h-full px-3 flex items-center justify-center relative transition-colors rounded-none ${
            isActionCenterOpen ? 'bg-white/20' : 'hover:bg-white/10'
          }`}
          title="Action center"
        >
          <svg className="w-4 h-4 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 16 16">
            <path strokeLinecap="square" strokeWidth="1.2" d="M1 2.5h14v9H4.5L1 14.5V2.5z" />
            <line x1="4" y1="5.5" x2="12" y2="5.5" strokeWidth="1.2" strokeLinecap="square" />
            <line x1="4" y1="8.5" x2="10" y2="8.5" strokeWidth="1.2" strokeLinecap="square" />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-[#0078d7] text-white text-[9px] font-bold rounded-none flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Windows 10 "Show Desktop" Far-Right Sliver Button */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            sounds.playWindowSnap();
            onShowDesktop();
          }}
          className="h-full w-[6px] border-l border-white/20 hover:bg-white/30 cursor-pointer transition-colors"
          title="Show desktop"
        />
      </div>
    </footer>
  );
};
