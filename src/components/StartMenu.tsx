import React, { useState } from 'react';
import { 
  Menu, 
  User, 
  FileText, 
  Image as ImageIcon, 
  Settings as SettingsIcon, 
  Power, 
  ChevronDown, 
  ChevronRight,
  Calculator as CalcIcon,
  Camera as CameraIcon,
  Play,
  Volume2
} from 'lucide-react';
import { AppItem, WindowAppType } from '../types';
import { sounds } from '../services/soundEffects';
import {
  WinFolderIcon,
  ChromeIcon,
  SpotifyIcon,
  YouTubeIcon,
  GeminiIcon,
  WhatsAppIcon,
  FacebookIcon,
  MicrosoftStoreIcon,
  AndroidStudioIcon,
  VirtualBoxIcon,
  RetroArchIcon,
  GoogleDriveIcon,
  AutoCadIcon,
  RevitIcon,
  TelegramIcon,
  RedditIcon,
  XIcon,
  InstagramIcon,
  PinterestIcon
} from './Win10Icons';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  apps?: AppItem[];
  onLaunchApp: (pkgOrId: string) => void;
  onOpenWindow: (appType: WindowAppType, title: string, icon: string) => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({
  isOpen,
  onClose,
  onLaunchApp,
  onOpenWindow
}) => {
  const [isRailExpanded, setIsRailExpanded] = useState(false);
  const [showPowerMenu, setShowPowerMenu] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    recent: true,
    androidStudio: false,
    autoCad: false,
    chromeApps: false,
    etabs: false,
    googleChrome: false
  });

  if (!isOpen) return null;

  const toggleSection = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
    sounds.playClick();
  };

  return (
    <div
      onClick={() => {
        if (showPowerMenu) setShowPowerMenu(false);
      }}
      className="fixed bottom-[var(--taskbar-height)] left-0 w-[840px] max-w-[100vw] h-[580px] max-h-[calc(100vh-var(--taskbar-height))] bg-[#141414f0] backdrop-blur-[28px] saturate-[140%] border border-white/10 border-b-0 shadow-[0_24px_60px_rgba(0,0,0,0.85)] flex z-[999] text-white select-none animate-win10-menu"
      style={{ borderRadius: 0 }}
    >
      {/* ===================== 1. LEFT RAIL ===================== */}
      <div
        className={`bg-black/50 border-r border-white/10 flex flex-col justify-between py-1 transition-all duration-200 z-30 shrink-0 ${
          isRailExpanded ? 'w-48 shadow-2xl' : 'w-12'
        }`}
      >
        {/* Top: Hamburger / START */}
        <div>
          <button
            onClick={() => {
              setIsRailExpanded(!isRailExpanded);
              sounds.playClick();
            }}
            className="w-full h-11 flex items-center px-3.5 hover:bg-white/10 transition-colors text-white/90 gap-3"
            title="START"
          >
            <Menu size={16} className="shrink-0" />
            {isRailExpanded && <span className="text-[11px] font-semibold tracking-wider uppercase">START</span>}
          </button>
        </div>

        {/* Bottom Rail: User, Docs, Pictures, Settings, Power */}
        <div className="space-y-0.5 relative">
          {/* User Profile */}
          <button
            className="w-full h-11 flex items-center px-3.5 hover:bg-white/10 transition-colors text-white/90 gap-3"
            title="User"
          >
            <div className="w-5 h-5 rounded-full border border-white/80 flex items-center justify-center shrink-0">
              <User size={12} className="text-white/90" />
            </div>
            {isRailExpanded && <span className="text-xs truncate">User</span>}
          </button>

          {/* Documents */}
          <button
            onClick={() => {
              onOpenWindow('explorer', 'Documents', '📁');
              onClose();
            }}
            className="w-full h-11 flex items-center px-3.5 hover:bg-white/10 transition-colors text-white/90 gap-3"
            title="Documents"
          >
            <FileText size={16} className="shrink-0 text-white/80" />
            {isRailExpanded && <span className="text-xs truncate">Documents</span>}
          </button>

          {/* Pictures */}
          <button
            onClick={() => {
              onOpenWindow('photos', 'Pictures', '🖼️');
              onClose();
            }}
            className="w-full h-11 flex items-center px-3.5 hover:bg-white/10 transition-colors text-white/90 gap-3"
            title="Pictures"
          >
            <ImageIcon size={16} className="shrink-0 text-white/80" />
            {isRailExpanded && <span className="text-xs truncate">Pictures</span>}
          </button>

          {/* Settings */}
          <button
            onClick={() => {
              onOpenWindow('settings', 'Settings', '⚙️');
              onClose();
            }}
            className="w-full h-11 flex items-center px-3.5 hover:bg-white/10 transition-colors text-white/90 gap-3"
            title="Settings"
          >
            <SettingsIcon size={16} className="shrink-0 text-white/80" />
            {isRailExpanded && <span className="text-xs truncate">Settings</span>}
          </button>

          {/* Power Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              sounds.playClick();
              setShowPowerMenu(!showPowerMenu);
            }}
            className={`w-full h-11 flex items-center px-3.5 hover:bg-white/10 transition-colors gap-3 ${
              showPowerMenu ? 'bg-white/15 text-white' : 'text-white/90'
            }`}
            title="Power"
          >
            <Power size={16} className="shrink-0 text-white/80" />
            {isRailExpanded && <span className="text-xs truncate">Power</span>}
          </button>

          {/* Power Flyout */}
          {showPowerMenu && (
            <div
              className={`absolute bottom-11 ${
                isRailExpanded ? 'left-48' : 'left-12'
              } w-44 bg-[#202020] border border-white/15 shadow-2xl p-1 space-y-0.5 text-xs z-50 animate-in fade-in`}
              style={{ borderRadius: 0 }}
            >
              <button
                onClick={() => {
                  setShowPowerMenu(false);
                  onClose();
                }}
                className="w-full text-left px-3 py-2 hover:bg-white/10 flex items-center gap-2.5"
              >
                <span>🌙</span>
                <span>Sleep</span>
              </button>
              <button
                onClick={() => {
                  window.location.reload();
                }}
                className="w-full text-left px-3 py-2 hover:bg-white/10 flex items-center gap-2.5"
              >
                <span>🔄</span>
                <span>Restart</span>
              </button>
              <button
                onClick={() => {
                  setShowPowerMenu(false);
                  onClose();
                }}
                className="w-full text-left px-3 py-2 hover:bg-white/10 flex items-center gap-2.5"
              >
                <span>⏹️</span>
                <span>Shut down</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ===================== 2. ALL APPS LIST (MIDDLE COLUMN) ===================== */}
      <div className="w-[260px] shrink-0 border-r border-white/10 flex flex-col overflow-y-auto px-2 py-3 space-y-2 text-xs animate-win10-apps">
        {/* Recently Added Section */}
        <div>
          <div className="text-[11px] text-white/50 px-2 py-1 font-normal">Recently added</div>
          
          <div 
            onClick={() => onLaunchApp('com.google.android.studio')}
            className="flex items-center gap-2.5 px-2 py-1.5 hover:bg-white/10 cursor-pointer transition-colors"
          >
            <AndroidStudioIcon size={20} />
            <span className="truncate">Android Studio</span>
          </div>

          <div 
            onClick={() => onLaunchApp('org.virtualbox.app')}
            className="flex items-center gap-2.5 px-2 py-1.5 hover:bg-white/10 cursor-pointer transition-colors"
          >
            <VirtualBoxIcon size={20} />
            <span className="truncate">Oracle VirtualBox</span>
          </div>

          <div 
            onClick={() => onLaunchApp('cadcraft')}
            className="flex items-center gap-2.5 px-2 py-1.5 hover:bg-white/10 cursor-pointer transition-colors"
          >
            <div className="w-5 h-5 bg-[#0078d7] flex items-center justify-center text-[10px] font-bold">CAD</div>
            <span className="truncate">CADCraft</span>
          </div>

          <div 
            onClick={(e) => toggleSection('recent', e)}
            className="flex items-center gap-1 px-2 py-1 text-[11px] text-white/50 hover:text-white cursor-pointer"
          >
            <span>Expand</span>
            <ChevronDown size={12} />
          </div>
        </div>

        {/* Section # */}
        <div>
          <div className="text-white/40 text-[11px] font-semibold px-2 py-0.5">#</div>
          <div 
            onClick={() => onOpenWindow('photos', '3D Viewer', '🧊')}
            className="flex items-center gap-2.5 px-2 py-1.5 hover:bg-white/10 cursor-pointer transition-colors"
          >
            <div className="w-5 h-5 border border-white/40 flex items-center justify-center text-[10px]">⬡</div>
            <span className="truncate">3D Viewer</span>
          </div>
        </div>

        {/* Section A */}
        <div>
          <div className="text-white/40 text-[11px] font-semibold px-2 py-0.5">A</div>
          
          <div 
            onClick={() => onLaunchApp('ms-access')}
            className="flex items-center gap-2.5 px-2 py-1.5 hover:bg-white/10 cursor-pointer transition-colors"
          >
            <div className="w-5 h-5 bg-[#A4373A] flex items-center justify-center text-[10px] font-bold">A</div>
            <span className="truncate">Access</span>
          </div>

          <div 
            onClick={() => onLaunchApp('com.google.android.studio')}
            className="flex items-center justify-between px-2 py-1.5 hover:bg-white/10 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5 truncate">
              <AndroidStudioIcon size={20} />
              <div className="flex items-center gap-1.5 truncate">
                <span className="truncate">Android Studio</span>
                <span className="text-[9px] text-[#429ce3] uppercase font-bold">New</span>
              </div>
            </div>
            <ChevronDown size={12} className="text-white/40" />
          </div>

          <div 
            onClick={() => onLaunchApp('artcraft')}
            className="flex items-center gap-2.5 px-2 py-1.5 hover:bg-white/10 cursor-pointer transition-colors"
          >
            <div className="w-5 h-5 bg-[#0078d7] flex items-center justify-center text-[10px]">▲</div>
            <span className="truncate">ArtCraft Launcher</span>
          </div>

          <div 
            onClick={() => onLaunchApp('autocad')}
            className="flex items-center justify-between px-2 py-1.5 hover:bg-white/10 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5 truncate">
              <AutoCadIcon size={20} />
              <span className="truncate">AutoCAD</span>
            </div>
            <ChevronDown size={12} className="text-white/40" />
          </div>
        </div>

        {/* Section C */}
        <div>
          <div className="text-white/40 text-[11px] font-semibold px-2 py-0.5">C</div>
          
          <div 
            onClick={() => onLaunchApp('cadcraft')}
            className="flex items-center gap-2.5 px-2 py-1.5 hover:bg-white/10 cursor-pointer transition-colors"
          >
            <div className="w-5 h-5 bg-[#0078d7] flex items-center justify-center text-[10px] font-bold">CAD</div>
            <span className="truncate">CADCraft</span>
          </div>

          {/* Calculator - Functional */}
          <div 
            onClick={() => {
              onOpenWindow('calculator', 'Calculator', '🔢');
              onClose();
            }}
            className="flex items-center gap-2.5 px-2 py-1.5 hover:bg-white/10 cursor-pointer transition-colors"
          >
            <div className="w-5 h-5 bg-[#5c6bc0] flex items-center justify-center text-white">
              <CalcIcon size={13} />
            </div>
            <span className="truncate">Calculator</span>
          </div>

          <div 
            onClick={() => onLaunchApp('camera')}
            className="flex items-center gap-2.5 px-2 py-1.5 hover:bg-white/10 cursor-pointer transition-colors"
          >
            <div className="w-5 h-5 bg-white/15 flex items-center justify-center text-white">
              <CameraIcon size={13} />
            </div>
            <span className="truncate">Camera</span>
          </div>

          <div 
            onClick={() => onLaunchApp('chrome-apps')}
            className="flex items-center justify-between px-2 py-1.5 hover:bg-white/10 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5 truncate">
              <WinFolderIcon size={20} />
              <span className="truncate">Chrome Apps</span>
            </div>
            <ChevronDown size={12} className="text-white/40" />
          </div>
        </div>

        {/* Section E */}
        <div>
          <div className="text-white/40 text-[11px] font-semibold px-2 py-0.5">E</div>
          
          <div 
            onClick={() => onLaunchApp('etabs')}
            className="flex items-center justify-between px-2 py-1.5 hover:bg-white/10 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5 truncate">
              <WinFolderIcon size={20} />
              <span className="truncate">ETABS</span>
            </div>
            <ChevronDown size={12} className="text-white/40" />
          </div>

          <div 
            onClick={() => onLaunchApp('excel')}
            className="flex items-center gap-2.5 px-2 py-1.5 hover:bg-white/10 cursor-pointer transition-colors"
          >
            <div className="w-5 h-5 bg-[#107C41] flex items-center justify-center text-[10px] font-bold">X</div>
            <span className="truncate">Excel</span>
          </div>
        </div>

        {/* Section G */}
        <div>
          <div className="text-white/40 text-[11px] font-semibold px-2 py-0.5">G</div>
          
          <div 
            onClick={() => onLaunchApp('gamebar')}
            className="flex items-center gap-2.5 px-2 py-1.5 hover:bg-white/10 cursor-pointer transition-colors"
          >
            <div className="w-5 h-5 bg-[#107C10] flex items-center justify-center text-[10px]">🎮</div>
            <div className="truncate">
              <div className="truncate">Game Bar</div>
              <div className="text-[9px] text-white/40">System</div>
            </div>
          </div>

          <div 
            onClick={() => onOpenWindow('browser', 'Gemini AI', '✨')}
            className="flex items-center gap-2.5 px-2 py-1.5 hover:bg-white/10 cursor-pointer transition-colors"
          >
            <GeminiIcon size={20} />
            <span className="truncate">Gemini</span>
          </div>

          <div 
            onClick={() => onLaunchApp('get-help')}
            className="flex items-center gap-2.5 px-2 py-1.5 hover:bg-white/10 cursor-pointer transition-colors"
          >
            <div className="w-5 h-5 bg-[#0078d7] flex items-center justify-center text-[10px] font-bold">?</div>
            <div className="truncate">
              <div className="truncate">Get Help</div>
              <div className="text-[9px] text-white/40">System</div>
            </div>
          </div>

          <div 
            onClick={() => {
              onOpenWindow('browser', 'Google Chrome', '🌐');
              onClose();
            }}
            className="flex items-center justify-between px-2 py-1.5 hover:bg-white/10 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5 truncate">
              <WinFolderIcon size={20} />
              <span className="truncate">Google Chrome</span>
            </div>
            <ChevronDown size={12} className="text-white/40" />
          </div>
        </div>
      </div>

      {/* ===================== 3. LIVE TILES & GROUPS (RIGHT SECTION) ===================== */}
      <div className="flex-1 overflow-y-auto p-4 flex gap-6 text-xs">
        {/* Group Column 1 */}
        <div className="w-[280px] shrink-0 space-y-1.5">
          {/* Row 1: Chrome (Square) & Spotify (Wide) */}
          <div className="flex gap-1.5">
            {/* Google Chrome Tile */}
            <div
              onClick={() => {
                onOpenWindow('browser', 'Google Chrome', '🌐');
                onClose();
              }}
              style={{ animationDelay: '30ms' }}
              className="w-[90px] h-[90px] bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 flex flex-col justify-between p-2 cursor-pointer transition-all hover:scale-[1.02] animate-win10-tile relative group"
            >
              <div className="flex items-center justify-center flex-1">
                <ChromeIcon size={32} />
              </div>
              <span className="text-[10px] text-white/90 truncate">Google Chrome</span>
            </div>

            {/* Spotify Wide Tile */}
            <div
              onClick={() => onLaunchApp('spotify')}
              style={{ animationDelay: '60ms' }}
              className="flex-1 h-[90px] bg-[#1DB954] hover:bg-[#1ed760] border border-white/10 flex items-center justify-center p-3 cursor-pointer transition-all hover:scale-[1.02] animate-win10-tile gap-2"
            >
              <SpotifyIcon size={36} color="#FFFFFF" />
              <span className="text-lg font-bold tracking-tight text-white">Spotify</span>
            </div>
          </div>

          {/* Row 2: Camera, YouTube, Gemini (3 Small Squares) */}
          <div className="grid grid-cols-3 gap-1.5">
            <div
              onClick={() => onLaunchApp('camera')}
              style={{ animationDelay: '90ms' }}
              className="h-[76px] bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 flex flex-col justify-between p-2 cursor-pointer transition-all hover:scale-[1.02] animate-win10-tile"
            >
              <div className="flex items-center justify-center flex-1">
                <CameraIcon size={24} className="text-white/80" />
              </div>
              <span className="text-[10px] text-white/90 truncate">Camera</span>
            </div>

            <div
              onClick={() => {
                onOpenWindow('browser', 'YouTube', '▶️');
                onClose();
              }}
              style={{ animationDelay: '120ms' }}
              className="h-[76px] bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 flex flex-col justify-between p-2 cursor-pointer transition-all hover:scale-[1.02] animate-win10-tile"
            >
              <div className="flex items-center justify-center flex-1">
                <YouTubeIcon size={24} />
              </div>
              <span className="text-[10px] text-white/90 truncate">YouTube</span>
            </div>

            <div
              onClick={() => {
                onOpenWindow('browser', 'Gemini AI', '✨');
                onClose();
              }}
              style={{ animationDelay: '150ms' }}
              className="h-[76px] bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 flex flex-col justify-between p-2 cursor-pointer transition-all hover:scale-[1.02] animate-win10-tile"
            >
              <div className="flex items-center justify-center flex-1">
                <GeminiIcon size={24} />
              </div>
              <span className="text-[10px] text-white/90 truncate">Gemini</span>
            </div>
          </div>

          {/* Row 3: AutoCAD, Micro-grid, Revit */}
          <div className="grid grid-cols-3 gap-1.5">
            <div
              onClick={() => onLaunchApp('autocad')}
              style={{ animationDelay: '180ms' }}
              className="h-[76px] bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 flex flex-col justify-between p-2 cursor-pointer transition-all hover:scale-[1.02] animate-win10-tile"
            >
              <div className="flex items-center justify-center flex-1">
                <AutoCadIcon size={24} />
              </div>
              <span className="text-[10px] text-white/90 truncate">AutoCAD</span>
            </div>

            {/* 4-mini tile 2x2 grid */}
            <div 
              style={{ animationDelay: '210ms' }}
              className="h-[76px] grid grid-cols-2 grid-rows-2 gap-1 animate-win10-tile"
            >
              <div className="bg-[#0078d7] flex items-center justify-center text-[10px] font-bold">S</div>
              <div className="bg-[#0078d7] flex items-center justify-center text-[10px] font-bold">S</div>
              <div className="bg-[#0097A7] flex items-center justify-center text-[10px] font-bold">CAD</div>
              <div className="bg-[#005A9E] flex items-center justify-center text-[10px] font-bold">E</div>
            </div>

            <div
              onClick={() => onLaunchApp('revit')}
              style={{ animationDelay: '240ms' }}
              className="h-[76px] bg-[#0078d7] hover:bg-[#0063b1] border border-white/10 flex flex-col justify-between p-2 cursor-pointer transition-all hover:scale-[1.02] animate-win10-tile"
            >
              <div className="flex items-center justify-center flex-1">
                <RevitIcon size={24} />
              </div>
              <span className="text-[10px] text-white/90 truncate">Revit</span>
            </div>
          </div>

          {/* Row 4: Office 4-pack & Microsoft Store */}
          <div className="flex gap-1.5">
            {/* 4-mini Office tiles */}
            <div 
              style={{ animationDelay: '270ms' }}
              className="w-[90px] h-[76px] grid grid-cols-2 grid-rows-2 gap-1 animate-win10-tile"
            >
              <div className="bg-[#185ABD] flex items-center justify-center text-[10px] font-bold">W</div>
              <div className="bg-[#107C41] flex items-center justify-center text-[10px] font-bold">X</div>
              <div className="bg-[#D83B01] flex items-center justify-center text-[10px] font-bold">P</div>
              <div className="bg-[#0078D4] flex items-center justify-center text-[10px] font-bold">O</div>
            </div>

            {/* Microsoft Store Tile */}
            <div
              onClick={() => onLaunchApp('com.android.vending')}
              style={{ animationDelay: '300ms' }}
              className="flex-1 h-[76px] bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 flex flex-col justify-between p-2 cursor-pointer transition-all hover:scale-[1.02] animate-win10-tile"
            >
              <div className="flex items-center justify-center flex-1">
                <MicrosoftStoreIcon size={26} />
              </div>
              <span className="text-[10px] text-white/90 truncate">Microsoft Store</span>
            </div>
          </div>

          {/* Row 5: WhatsApp & فيسبوك */}
          <div className="grid grid-cols-2 gap-1.5">
            <div
              onClick={() => onLaunchApp('whatsapp')}
              style={{ animationDelay: '330ms' }}
              className="h-[80px] bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 flex flex-col justify-between p-2 cursor-pointer transition-all hover:scale-[1.02] animate-win10-tile"
            >
              <div className="flex items-center justify-center flex-1">
                <WhatsAppIcon size={28} />
              </div>
              <span className="text-[10px] text-white/90 truncate">WhatsApp</span>
            </div>

            <div
              onClick={() => onLaunchApp('facebook')}
              style={{ animationDelay: '360ms' }}
              className="h-[80px] bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 flex flex-col justify-between p-2 cursor-pointer transition-all hover:scale-[1.02] animate-win10-tile"
            >
              <div className="flex items-center justify-center flex-1">
                <FacebookIcon size={28} />
              </div>
              <span className="text-[10px] text-white/90 truncate font-arabic">فيسبوك</span>
            </div>
          </div>

          {/* Row 6: Photos (Large Live Tile) + Mini Social Grid */}
          <div className="flex gap-1.5">
            {/* Photos Live Tile */}
            <div
              onClick={() => {
                onOpenWindow('photos', 'Photos', '🖼️');
                onClose();
              }}
              style={{
                animationDelay: '390ms',
                backgroundImage: 'url(/assets/aistudio/image_7623b29c.png)',
                backgroundPosition: '15% 75%',
                backgroundSize: '350%'
              }}
            >
              <div className="flex justify-end">
                <div className="w-3 h-3 bg-[#0078d7] flex items-center justify-center text-[8px]">⊞</div>
              </div>
              <span className="text-[10px] text-white font-medium drop-shadow bg-black/40 px-1 py-0.5 w-max">
                Photos
              </span>
            </div>

            {/* Vertical column of 5 mini social icons */}
            <div 
              style={{ animationDelay: '420ms' }}
              className="flex-1 grid grid-cols-2 grid-rows-3 gap-1 animate-win10-tile"
            >
              <div className="bg-[#1a1a1a] hover:bg-[#252525] flex items-center justify-center cursor-pointer p-1">
                <InstagramIcon size={16} />
              </div>
              <div className="bg-[#1a1a1a] hover:bg-[#252525] flex items-center justify-center cursor-pointer p-1">
                <PinterestIcon size={16} />
              </div>
              <div className="bg-[#1a1a1a] hover:bg-[#252525] flex items-center justify-center cursor-pointer p-1">
                <XIcon size={14} />
              </div>
              <div className="bg-[#1a1a1a] hover:bg-[#252525] flex items-center justify-center cursor-pointer p-1">
                <RedditIcon size={16} />
              </div>
              <div className="bg-[#1a1a1a] hover:bg-[#252525] flex items-center justify-center cursor-pointer p-1 col-span-2">
                <TelegramIcon size={16} />
              </div>
            </div>
          </div>

          {/* Row 7: Media player, PhotoCraft, Sound */}
          <div className="grid grid-cols-3 gap-1.5">
            <div className="h-[60px] bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 flex items-center justify-center cursor-pointer">
              <div className="w-7 h-7 rounded-full border border-white/60 flex items-center justify-center">
                <Play size={12} className="text-white fill-white ml-0.5" />
              </div>
            </div>

            <div className="h-[60px] bg-[#0078d7] hover:bg-[#0063b1] border border-white/10 flex flex-col items-center justify-center cursor-pointer p-1">
              <span className="text-[12px]">🦊</span>
              <span className="text-[9px] truncate">PhotoCraft</span>
            </div>

            <div className="h-[60px] bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 flex items-center justify-center cursor-pointer">
              <Volume2 size={18} className="text-[#00bcf2]" />
            </div>
          </div>
        </div>

        {/* Group Column 2 (Folders & Tools) */}
        <div className="w-[280px] shrink-0 space-y-2">
          {/* 3 Folder Tiles across top: FACULTY DOCS, CIVIL COURSES, LECTURE VIDEOS */}
          <div className="grid grid-cols-3 gap-1.5">
            <div
              onClick={() => {
                onOpenWindow('explorer', 'Faculty Docs', '📁');
                onClose();
              }}
              style={{ animationDelay: '150ms' }}
              className="h-[80px] bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 flex flex-col justify-between p-2 cursor-pointer transition-all hover:scale-[1.02] animate-win10-tile"
            >
              <div className="flex items-center justify-center flex-1">
                <WinFolderIcon size={24} />
              </div>
              <span className="text-[9px] text-white/90 text-center font-semibold leading-tight line-clamp-2 uppercase">
                FACULTY DOCS
              </span>
            </div>

            <div
              onClick={() => {
                onOpenWindow('explorer', 'Civil Courses', '📁');
                onClose();
              }}
              style={{ animationDelay: '180ms' }}
              className="h-[80px] bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 flex flex-col justify-between p-2 cursor-pointer transition-all hover:scale-[1.02] animate-win10-tile"
            >
              <div className="flex items-center justify-center flex-1">
                <WinFolderIcon size={24} />
              </div>
              <span className="text-[9px] text-white/90 text-center font-semibold leading-tight line-clamp-2 uppercase">
                CIVIL COURSES
              </span>
            </div>

            <div
              onClick={() => {
                onOpenWindow('explorer', 'Lecture Videos', '📁');
                onClose();
              }}
              style={{ animationDelay: '210ms' }}
              className="h-[80px] bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 flex flex-col justify-between p-2 cursor-pointer transition-all hover:scale-[1.02] animate-win10-tile"
            >
              <div className="flex items-center justify-center flex-1">
                <WinFolderIcon size={24} />
              </div>
              <span className="text-[9px] text-white/90 text-center font-semibold leading-tight line-clamp-2 uppercase">
                LECTURE VIDEOS
              </span>
            </div>
          </div>

          {/* Google Drive (G) */}
          <div
            onClick={() => onLaunchApp('google-drive')}
            style={{ animationDelay: '240ms' }}
            className="w-[90px] h-[80px] bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 flex flex-col justify-between p-2 cursor-pointer transition-all hover:scale-[1.02] animate-win10-tile"
          >
            <div className="flex items-center justify-center flex-1">
              <GoogleDriveIcon size={24} />
            </div>
            <span className="text-[9px] text-white/90 truncate leading-tight">
              Google Drive (G)
            </span>
          </div>

          {/* RetroArch & Saved Games */}
          <div className="grid grid-cols-2 gap-1.5 pt-2">
            <div
              onClick={() => onLaunchApp('retroarch')}
              style={{ animationDelay: '270ms' }}
              className="h-[80px] bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 flex flex-col justify-between p-2 cursor-pointer transition-all hover:scale-[1.02] animate-win10-tile"
            >
              <div className="flex items-center justify-center flex-1">
                <RetroArchIcon size={28} />
              </div>
              <span className="text-[10px] text-white/90 truncate">RetroArch</span>
            </div>

            <div
              onClick={() => {
                onOpenWindow('explorer', 'Saved Games', '🎮');
                onClose();
              }}
              style={{ animationDelay: '300ms' }}
              className="h-[80px] bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 flex flex-col justify-between p-2 cursor-pointer transition-all hover:scale-[1.02] animate-win10-tile"
            >
              <div className="flex items-center justify-center flex-1 relative">
                <WinFolderIcon size={26} />
                <span className="absolute bottom-0 right-1 text-xs">🎮</span>
              </div>
              <span className="text-[10px] text-white/90 truncate">Saved Games</span>
            </div>
          </div>

          {/* Android Studio & Oracle VirtualBox Large Tiles */}
          <div className="grid grid-cols-2 gap-1.5">
            <div
              onClick={() => onLaunchApp('com.google.android.studio')}
              style={{ animationDelay: '330ms' }}
              className="h-[80px] bg-[#3DDC84] hover:bg-[#43e68c] border border-white/10 flex flex-col justify-between p-2 cursor-pointer transition-all hover:scale-[1.02] animate-win10-tile"
            >
              <div className="flex items-center justify-center flex-1">
                <AndroidStudioIcon size={32} />
              </div>
              <span className="text-[10px] text-black font-semibold truncate">Android Studio</span>
            </div>

            <div
              onClick={() => onLaunchApp('org.virtualbox.app')}
              style={{ animationDelay: '360ms' }}
              className="h-[80px] bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 flex flex-col justify-between p-2 cursor-pointer transition-all hover:scale-[1.02] animate-win10-tile"
            >
              <div className="flex items-center justify-center flex-1">
                <VirtualBoxIcon size={28} />
              </div>
              <span className="text-[10px] text-white/90 truncate">Oracle VirtualBox</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
