import React, { useState, useEffect, useRef } from 'react';
import { Search, Globe, Folder, Settings as SettingsIcon, ArrowRight, ExternalLink } from 'lucide-react';
import { AppItem } from '../types';
import { sounds } from '../services/soundEffects';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  apps: AppItem[];
  onLaunchApp: (pkgOrId: string) => void;
  onOpenWindow: (type: any, title: string, icon: string) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  apps,
  onLaunchApp,
  onOpenWindow
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredApps = query.trim()
    ? apps.filter(
        (a) =>
          a.name.toLowerCase().includes(query.toLowerCase()) ||
          a.packageName.toLowerCase().includes(query.toLowerCase()) ||
          a.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelectApp = (app: AppItem) => {
    sounds.playClick();
    if (app.id === 'files') {
      onOpenWindow('explorer', 'File Explorer', '📁');
    } else if (app.id === 'settings') {
      onOpenWindow('settings', 'Settings', '⚙️');
    } else if (app.id === 'calculator') {
      onOpenWindow('calculator', 'Calculator', '🔢');
    } else if (app.id === 'weather') {
      onOpenWindow('weather', 'Weather', '☀️');
    } else if (app.id === 'photos') {
      onOpenWindow('photos', 'Photos', '🖼️');
    } else if (app.id === 'edge') {
      onOpenWindow('browser', 'Microsoft Edge', '🌊');
    } else {
      onLaunchApp(app.packageName);
    }
    onClose();
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed bottom-[var(--taskbar-height)] left-0 sm:left-12 w-[600px] max-w-[100vw] h-[480px] max-h-[calc(100vh-var(--taskbar-height))] bg-[#1a1a1ae0] backdrop-blur-[24px] saturate-[130%] border border-white/10 border-b-0 shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col z-[998] text-white select-none animate-in fade-in zoom-in-95 duration-150"
    >
      {/* Search Input Bar */}
      <div className="p-3 border-b border-white/10">
        <div className="flex items-center bg-black/40 border border-white/15 rounded-none px-3 py-2 gap-2.5 focus-within:border-[#0078d7]">
          <Search size={16} className="text-[#0078d7] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type here to search apps, files, and web..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-white text-sm"
          />
        </div>
      </div>

      {/* Main Search Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {query.trim() ? (
          <div>
            <div className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-2">
              Best match ({filteredApps.length})
            </div>

            {filteredApps.length === 0 ? (
              <div className="p-6 text-center text-white/50 text-xs">
                No local applications found for "{query}".
                <button
                  onClick={() => {
                    onOpenWindow('browser', 'Microsoft Edge', '🌊');
                    onClose();
                  }}
                  className="mt-3 mx-auto flex items-center gap-1.5 px-3 py-1.5 bg-[#0078d7] text-white rounded-none text-xs"
                >
                  <Globe size={13} />
                  <span>Search web with Bing</span>
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredApps.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => handleSelectApp(app)}
                    className="flex items-center justify-between p-2.5 rounded-none bg-white/5 hover:bg-white/10 border border-white/5 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{app.icon}</span>
                      <div>
                        <div className="font-medium text-xs text-white/95">{app.name}</div>
                        <div className="text-[10px] text-white/50">{app.packageName}</div>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-white/40" />
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Top Apps Quick Access */}
            <div>
              <div className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-2">Top apps</div>
              <div className="grid grid-cols-5 gap-2">
                {apps.slice(0, 5).map((app) => (
                  <button
                    key={app.id}
                    onClick={() => handleSelectApp(app)}
                    className="flex flex-col items-center justify-center p-3 rounded-none bg-white/5 hover:bg-white/10 border border-white/5 transition-colors gap-2"
                  >
                    <span className="text-2xl">{app.icon}</span>
                    <span className="text-[11px] font-medium text-white/90 truncate w-full text-center">
                      {app.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Web & System Shortcuts */}
            <div>
              <div className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-2">Quick Searches</div>
              <div className="space-y-1 text-xs">
                {[
                  { title: 'Android System Settings', icon: SettingsIcon, action: () => onOpenWindow('settings', 'Settings', '⚙️') },
                  { title: 'Explore Internal Storage Files', icon: Folder, action: () => onOpenWindow('explorer', 'File Explorer', '📁') },
                  { title: 'Web Search in Microsoft Edge', icon: Globe, action: () => onOpenWindow('browser', 'Microsoft Edge', '🌊') }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        sounds.playClick();
                        item.action();
                        onClose();
                      }}
                      className="flex items-center justify-between px-3 py-2 rounded-none hover:bg-white/10 cursor-pointer text-white/80 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={14} className="text-[#0078d7]" />
                        <span>{item.title}</span>
                      </div>
                      <ExternalLink size={12} className="text-white/40" />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
