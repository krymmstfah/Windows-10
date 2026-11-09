import React, { useState } from 'react';
import { 
  RefreshCw, 
  Palette, 
  Monitor, 
  Eye, 
  ArrowUpDown, 
  Sparkles 
} from 'lucide-react';
import { WindowAppType } from '../types';
import { sounds } from '../services/soundEffects';
import { 
  ThisPcIcon, 
  VirtualBoxIcon, 
  ChromeIcon, 
  PythonFileIcon, 
  WinFolderIcon 
} from './Win10Icons';

interface DesktopProps {
  wallpaper: string;
  brightness: number;
  nightLight: boolean;
  onOpenWindow: (type: WindowAppType, title: string, icon: string) => void;
  onLaunchApp: (pkgOrId: string) => void;
  onOpenSettings: (tab?: string) => void;
  onCycleWallpaper?: () => void;
  children?: React.ReactNode;
}

export const Desktop: React.FC<DesktopProps> = ({
  wallpaper,
  brightness,
  nightLight,
  onOpenWindow,
  onLaunchApp,
  onOpenSettings,
  onCycleWallpaper,
  children
}) => {
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  const [desktopContextMenu, setDesktopContextMenu] = useState<{ x: number; y: number } | null>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setDesktopContextMenu({ x: e.clientX, y: e.clientY });
    sounds.playClick();
  };

  const handleIconClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedIconId(id);
    sounds.playClick();
  };

  const handleIconDoubleClick = (action: () => void) => {
    sounds.playWindowSnap();
    action();
  };

  return (
    <main
      onContextMenu={handleContextMenu}
      onClick={() => {
        setSelectedIconId(null);
        if (desktopContextMenu) setDesktopContextMenu(null);
      }}
      style={{
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      className="relative w-screen h-screen overflow-hidden select-none pb-[var(--taskbar-height)]"
    >
      {/* Brightness & Night Light Overlays */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-200"
        style={{
          backgroundColor: '#000000',
          opacity: (100 - brightness) / 100 * 0.75
        }}
      />
      {nightLight && (
        <div className="pointer-events-none absolute inset-0 z-10 bg-amber-500/15 mix-blend-color-burn" />
      )}

      {/* ===================== DESKTOP ICONS (TOP-LEFT) ===================== */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-3">
        {/* This PC */}
        <div
          onClick={(e) => handleIconClick(e, 'this-pc')}
          onDoubleClick={() => handleIconDoubleClick(() => onOpenWindow('explorer', 'This PC', '💻'))}
          className={`w-20 p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
            selectedIconId === 'this-pc'
              ? 'bg-[#0078d7]/35 border border-[#0078d7]'
              : 'hover:bg-white/10 border border-transparent'
          }`}
          style={{ borderRadius: 0 }}
        >
          <ThisPcIcon size={38} />
          <span className="text-[11px] text-white font-medium mt-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] truncate w-full">
            This PC
          </span>
        </div>

        {/* Oracle VirtualBox */}
        <div
          onClick={(e) => handleIconClick(e, 'virtualbox')}
          onDoubleClick={() => handleIconDoubleClick(() => onLaunchApp('org.virtualbox.app'))}
          className={`w-20 p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-colors relative ${
            selectedIconId === 'virtualbox'
              ? 'bg-[#0078d7]/35 border border-[#0078d7]'
              : 'hover:bg-white/10 border border-transparent'
          }`}
          style={{ borderRadius: 0 }}
        >
          <div className="relative">
            <VirtualBoxIcon size={38} />
            {/* Shortcut overlay arrow */}
            <div className="absolute bottom-0 left-0 bg-white/90 text-black text-[8px] font-bold px-0.5 leading-none">
              ↗
            </div>
          </div>
          <span className="text-[11px] text-white font-medium mt-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] text-center line-clamp-2 leading-tight">
            Oracle VirtualBox
          </span>
        </div>
      </div>

      {/* ===================== DESKTOP ICONS (TOP-RIGHT) ===================== */}
      <div className="absolute top-4 right-12 z-20 flex flex-row gap-3">
        {/* 00 (Chrome Doc) */}
        <div
          onClick={(e) => handleIconClick(e, 'doc-00')}
          onDoubleClick={() => handleIconDoubleClick(() => onOpenWindow('browser', '00 Document', '🌐'))}
          className={`w-18 p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
            selectedIconId === 'doc-00'
              ? 'bg-[#0078d7]/35 border border-[#0078d7]'
              : 'hover:bg-white/10 border border-transparent'
          }`}
          style={{ borderRadius: 0 }}
        >
          <div className="relative">
            <div className="w-8 h-10 bg-white border border-gray-300 shadow-sm flex items-center justify-center">
              <ChromeIcon size={20} />
            </div>
          </div>
          <span className="text-[11px] text-white font-medium mt-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
            00
          </span>
        </div>

        {/* v0.4 (Python Script) */}
        <div
          onClick={(e) => handleIconClick(e, 'script-v04')}
          onDoubleClick={() => handleIconDoubleClick(() => onOpenWindow('explorer', 'v0.4.py', '📄'))}
          className={`w-18 p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
            selectedIconId === 'script-v04'
              ? 'bg-[#0078d7]/35 border border-[#0078d7]'
              : 'hover:bg-white/10 border border-transparent'
          }`}
          style={{ borderRadius: 0 }}
        >
          <PythonFileIcon size={34} />
          <span className="text-[11px] text-white font-medium mt-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
            v0.4
          </span>
        </div>

        {/* v0.8 (Python Script) */}
        <div
          onClick={(e) => handleIconClick(e, 'script-v08')}
          onDoubleClick={() => handleIconDoubleClick(() => onOpenWindow('explorer', 'v0.8.py', '📄'))}
          className={`w-18 p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
            selectedIconId === 'script-v08'
              ? 'bg-[#0078d7]/35 border border-[#0078d7]'
              : 'hover:bg-white/10 border border-transparent'
          }`}
          style={{ borderRadius: 0 }}
        >
          <PythonFileIcon size={34} />
          <span className="text-[11px] text-white font-medium mt-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
            v0.8
          </span>
        </div>

        {/* postre (Folder) */}
        <div
          onClick={(e) => handleIconClick(e, 'folder-postre')}
          onDoubleClick={() => handleIconDoubleClick(() => onOpenWindow('explorer', 'postre', '📁'))}
          className={`w-18 p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
            selectedIconId === 'folder-postre'
              ? 'bg-[#0078d7]/35 border border-[#0078d7]'
              : 'hover:bg-white/10 border border-transparent'
          }`}
          style={{ borderRadius: 0 }}
        >
          <WinFolderIcon size={36} />
          <span className="text-[11px] text-white font-medium mt-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] truncate w-full text-center">
            postre
          </span>
        </div>
      </div>

      {/* Windows Layer */}
      <div className="absolute inset-0 pointer-events-none z-30">
        <div className="relative w-full h-full pointer-events-auto">
          {children}
        </div>
      </div>

      {/* Desktop Context Menu (100% Square Windows 10 style) */}
      {desktopContextMenu && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'fixed',
            left: `${Math.min(window.innerWidth - 220, desktopContextMenu.x)}px`,
            top: `${Math.min(window.innerHeight - 260, desktopContextMenu.y)}px`,
            zIndex: 10000,
            borderRadius: 0
          }}
          className="w-56 bg-[#202020] border border-white/20 shadow-[0_12px_36px_rgba(0,0,0,0.9)] p-1 text-xs space-y-0.5 text-white animate-in fade-in duration-100"
        >
          <div className="px-3 py-1.5 text-white/50 text-[11px] flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Eye size={13} />
              <span>View</span>
            </span>
            <span className="text-[10px]">▶</span>
          </div>

          <div className="px-3 py-1.5 text-white/50 text-[11px] flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ArrowUpDown size={13} />
              <span>Sort by</span>
            </span>
            <span className="text-[10px]">▶</span>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              window.location.reload();
            }}
            className="w-full text-left px-3 py-1.5 hover:bg-white/15 flex items-center gap-2.5 transition-colors"
          >
            <RefreshCw size={13} className="text-[#0078d7]" />
            <span>Refresh</span>
          </button>

          {onCycleWallpaper && (
            <button
              onClick={() => {
                sounds.playClick();
                onCycleWallpaper();
                setDesktopContextMenu(null);
              }}
              className="w-full text-left px-3 py-1.5 hover:bg-white/15 flex items-center gap-2.5 transition-colors"
            >
              <Sparkles size={13} className="text-amber-400" />
              <span>Next desktop background</span>
            </button>
          )}

          <div className="border-t border-white/10 my-1" />

          <button
            onClick={() => {
              sounds.playClick();
              onOpenSettings('display');
              setDesktopContextMenu(null);
            }}
            className="w-full text-left px-3 py-1.5 hover:bg-white/15 flex items-center gap-2.5 transition-colors"
          >
            <Monitor size={13} className="text-white/80" />
            <span>Display settings</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onOpenSettings('personalize');
              setDesktopContextMenu(null);
            }}
            className="w-full text-left px-3 py-1.5 hover:bg-white/15 flex items-center gap-2.5 transition-colors"
          >
            <Palette size={13} className="text-[#00bcf2]" />
            <span>Personalize</span>
          </button>
        </div>
      )}
    </main>
  );
};
