export type TileSize = 'small' | 'medium' | 'wide' | 'large';

export interface AppItem {
  id: string;
  name: string;
  packageName: string;
  icon: string; // Emoji, SVG path, or base64 / URL
  category: string;
  isPinnedTaskbar?: boolean;
  isSystem?: boolean;
  color?: string;
}

export interface LiveTile {
  id: string;
  appId: string;
  title: string;
  size: TileSize;
  group: string;
  color?: string;
  customIcon?: string;
  isLive?: boolean;
  liveType?: 'weather' | 'photos' | 'calendar' | 'news' | 'mail' | 'clock' | 'static';
}

export interface NotificationItem {
  id: string;
  packageName: string;
  appName: string;
  title: string;
  text: string;
  timestamp: string;
  icon: string;
  color?: string;
  read?: boolean;
}

export type WindowAppType = 
  | 'explorer' 
  | 'settings' 
  | 'browser' 
  | 'calculator' 
  | 'weather' 
  | 'photos' 
  | 'android-export'
  | 'custom';

export interface WindowItem {
  id: string;
  title: string;
  appType: WindowAppType;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  desktopId: number;
}

export interface SystemSettings {
  theme: 'dark' | 'light';
  accentColor: string; // hex
  accentName: string;
  wallpaper: string;
  customWallpaperUrl?: string;
  soundEnabled: boolean;
  brightness: number; // 20 to 100
  volume: number; // 0 to 100
  wifiEnabled: boolean;
  bluetoothEnabled: boolean;
  torchEnabled: boolean;
  batterySaver: boolean;
  airplaneMode: boolean;
  nightLight: boolean;
  activeDesktop: number;
}
