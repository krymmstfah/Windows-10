import React from 'react';

// Windows 10 Flag Logo (4 angled quadrilaterals)
export const Win10Logo: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 16 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    className={`fill-current ${className}`}
  >
    <path d="M0 2.22 6.55 1.3v6.37H0V2.22zm0 6.13h6.55v6.37L0 13.8V8.35zm7.25-7.14L16 0v7.67H7.25V1.21zm8.75 7.14V16l-8.75-1.21V8.35H16z" />
  </svg>
);

// This PC Desktop Icon
export const ThisPcIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect x="6" y="8" width="36" height="24" rx="0" fill="#0078D7" stroke="#004E8C" strokeWidth="1.5" />
    <rect x="9" y="11" width="30" height="18" fill="#50E6FF" />
    <path d="M18 32h12v4H18z" fill="#7F7F7F" />
    <path d="M12 36h24v3H12z" fill="#999999" />
    <rect x="10" y="38" width="28" height="2" fill="#555555" />
  </svg>
);

// Windows 10 Folder Icon
export const WinFolderIcon: React.FC<{ size?: number; label?: string }> = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M4 12v26h40V16H22l-4-4H4z" fill="#FFC83B" />
    <path d="M4 18h40v20H4z" fill="#FFE082" />
    <path d="M4 18l3-3h34l3 3H4z" fill="#FFA000" opacity="0.4" />
  </svg>
);

// Python Script File Icon
export const PythonFileIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M10 6h20l10 10v26H10V6z" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="1" />
    <path d="M30 6v10h10" fill="#E0E0E0" />
    {/* Python Snake Logo */}
    <g transform="translate(14, 18) scale(0.65)">
      <path d="M14.8 0C7.2 0 7.6 3.1 7.6 3.1l.01 3.2h7.3v1H4.6S0 6.8 0 14.4c0 7.7 4 7.4 4 7.4h2.4v-3.5s-.1-4.2 4.1-4.2h7.1s3.9.1 3.9-3.8V3.8S22.4 0 14.8 0zm-4.2 2.3c.7 0 1.2.6 1.2 1.2s-.6 1.2-1.2 1.2-1.2-.5-1.2-1.2.5-1.2 1.2-1.2z" fill="#387EB8" />
      <path d="M15.2 30c7.6 0 7.2-3.1 7.2-3.1l-.01-3.2h-7.3v-1h10.3s4.6.5 4.6-7.1c0-7.7-4-7.4-4-7.4h-2.4v3.5s.1 4.2-4.1 4.2h-7.1s-3.9-.1-3.9 3.8v6.5s-.9 3.8 6.7 3.8zm4.2-2.3c-.7 0-1.2-.6-1.2-1.2s.6-1.2 1.2-1.2 1.2.5 1.2 1.2-.5 1.2-1.2 1.2z" fill="#FFE052" />
    </g>
  </svg>
);

// Chrome File / App Icon
export const ChromeIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <circle cx="24" cy="24" r="22" fill="#FFFFFF" />
    <path d="M24 10a14 14 0 0 1 12.1 7H24z" fill="#EA4335" />
    <path d="M24 10l12.1 7A14 14 0 0 1 24 38l7-12z" fill="#4285F4" opacity="0" />
    {/* Clean standard Chrome 3-color fan */}
    <g transform="translate(4,4) scale(0.833)">
      <circle cx="24" cy="24" r="23" fill="#EA4335" />
      <path d="M24 24L35.5 4H12.5A23 23 0 0 0 2.5 16.5L14 36.5L24 24z" fill="#34A853" />
      <path d="M24 24L14 36.5A23 23 0 0 0 35.5 44L45.5 24H24z" fill="#FBBC05" />
      <path d="M24 24H45.5A23 23 0 0 0 35.5 4L24 24z" fill="#EA4335" />
      <circle cx="24" cy="24" r="10.5" fill="#FFFFFF" />
      <circle cx="24" cy="24" r="8" fill="#4285F4" />
    </g>
  </svg>
);

// Spotify Icon
export const SpotifyIcon: React.FC<{ size?: number; color?: string }> = ({ size = 32, color = '#FFFFFF' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <circle cx="24" cy="24" r="22" fill="#1DB954" />
    <path 
      d="M33.2 31.6c-.4.6-1.2.8-1.8.4-5-3-11.2-3.7-18.6-2-0.7.2-1.3-.3-1.5-1-.2-.7.3-1.3 1-1.5 8.1-1.8 15-1 20.5 2.3.6.4.8 1.2.4 1.8zm2.4-5.3c-.5.8-1.5 1-2.2.5-6.2-3.8-15.6-4.9-22.9-2.7-.9.3-1.8-.2-2-1.1-.3-.9.2-1.8 1.1-2 8.4-2.5 18.8-1.3 25.8 3 .7.5 1 1.5.5 2.3zm.2-5.5c-7.4-4.4-19.6-4.8-26.7-2.7-1.1.3-2.3-.3-2.6-1.4-.3-1.1.3-2.3 1.4-2.6 8.2-2.5 21.6-2 30.1 3.1 1 .6 1.3 1.9.7 2.9-.6 1-1.9 1.3-2.9.7z" 
      fill={color} 
    />
  </svg>
);

// YouTube Icon
export const YouTubeIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <rect x="4" y="10" width="40" height="28" rx="6" fill="#FF0000" />
    <path d="M20 18l12 6-12 6V18z" fill="#FFFFFF" />
  </svg>
);

// Gemini Icon (4-point sparkle)
export const GeminiIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path 
      d="M24 4C24 15 15 24 4 24C15 24 24 33 24 44C24 33 33 24 44 24C33 24 24 15 24 4Z" 
      fill="url(#gemini-grad)" 
    />
    <defs>
      <linearGradient id="gemini-grad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4E82EE" />
        <stop offset="0.4" stopColor="#9B72CF" />
        <stop offset="0.8" stopColor="#E26D5C" />
        <stop offset="1" stopColor="#F4B400" />
      </linearGradient>
    </defs>
  </svg>
);

// WhatsApp Icon
export const WhatsAppIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <circle cx="24" cy="24" r="22" fill="#25D366" />
    <path 
      d="M34.8 28.6c-.5-.2-2.8-1.4-3.2-1.5-.4-.2-.8-.3-1.1.3-.3.5-1.2 1.5-1.5 1.8-.3.3-.6.4-1.1.1-.5-.2-2.1-.8-4-2.5-1.5-1.3-2.5-3-2.8-3.5-.3-.5 0-.8.2-1 .2-.2.5-.6.7-.9.2-.3.3-.5.5-.8.1-.3.1-.7 0-.9-.1-.3-1.1-2.7-1.5-3.6-.4-.9-.8-.8-1.1-.8h-1c-.3 0-.9.1-1.4.7-.5.5-1.8 1.8-1.8 4.3s1.9 5 2.1 5.4c.3.3 3.7 5.7 9 7.9 1.3.5 2.2.8 3 .6.8-.2 2.4-1 2.8-2 .3-.9.3-1.8.2-2-.1-.2-.5-.3-.9-.6z" 
      fill="#FFFFFF" 
    />
  </svg>
);

// Facebook Icon
export const FacebookIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <circle cx="24" cy="24" r="22" fill="#1877F2" />
    <path 
      d="M26.5 38V24h4.7l.7-5.5h-5.4v-3.5c0-1.6.4-2.7 2.7-2.7H32V7.4c-.6-.1-2.4-.2-4.5-.2-4.5 0-7.5 2.7-7.5 7.7v4.1h-4.8V24H20v14h6.5z" 
      fill="#FFFFFF" 
    />
  </svg>
);

// Microsoft Store Icon
export const MicrosoftStoreIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    {/* Bag handle */}
    <path d="M18 16V11a6 6 0 0 1 12 0v5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="square" />
    {/* Bag body */}
    <rect x="8" y="16" width="32" height="26" fill="#0078D7" />
    {/* 4 Windows squares on bag */}
    <rect x="18" y="22" width="5" height="5" fill="#F25022" />
    <rect x="25" y="22" width="5" height="5" fill="#7FBA00" />
    <rect x="18" y="29" width="5" height="5" fill="#00A4EF" />
    <rect x="25" y="29" width="5" height="5" fill="#FFB900" />
  </svg>
);

// Android Studio Icon
export const AndroidStudioIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="22" fill="#3DDC84" />
    {/* Compass / A silhouette */}
    <path d="M24 10l9 24h-4l-2.2-6.5h-5.6L19 34h-4l9-24zm0 8.5L22.2 24h3.6L24 18.5z" fill="#FFFFFF" />
    <circle cx="17" cy="18" r="1.5" fill="#FFFFFF" />
    <circle cx="31" cy="18" r="1.5" fill="#FFFFFF" />
  </svg>
);

// Oracle VirtualBox Icon
export const VirtualBoxIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect x="4" y="4" width="40" height="40" fill="#1C69A8" />
    {/* 3D Cube with orange & blue */}
    <path d="M24 8l14 8v16l-14 8-14-8V16l14-8z" fill="#003566" />
    <path d="M24 8l14 8-14 8-14-8 14-8z" fill="#0088CC" />
    <path d="M10 16l14 8v16l-14-8V16z" fill="#F26522" />
    <path d="M38 16v16l-14 8V24l14-8z" fill="#0077B6" />
  </svg>
);

// RetroArch Space Invader Icon
export const RetroArchIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect x="4" y="4" width="40" height="40" fill="#202020" />
    {/* 8-bit space invader in white */}
    <path 
      d="M16 12h16v4H16zm-4 4h24v4H12zm-4 4h32v8H36v-4H12v4H8zm4 12h4v8h-4zm20 0h4v8h-4zm-12-8h8v8h-8z" 
      fill="#FFFFFF" 
    />
  </svg>
);

// Google Drive Icon
export const GoogleDriveIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <path d="M17 9l14 0 11 19-14 0z" fill="#FFC107" />
    <path d="M6 28l7-12 11 19-14 0z" fill="#2196F3" />
    <path d="M17 35l14 0 7-12-14 0z" fill="#4CAF50" />
  </svg>
);

// AutoCAD Icon (Red A)
export const AutoCadIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <rect x="4" y="4" width="40" height="40" fill="#C4151C" />
    <path d="M24 10l10 24h-5l-2-6h-6l-2 6h-5l10-24zm0 8l-2 6h4l-2-6z" fill="#FFFFFF" />
    <text x="24" y="42" fill="#FFFFFF" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">CAD</text>
  </svg>
);

// Revit Icon (Blue R)
export const RevitIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <rect x="4" y="4" width="40" height="40" fill="#0696D7" />
    <path d="M16 12h9c4 0 7 2.5 7 6s-3 6-7 6h-4v8h-5V12zm5 8h4c1.5 0 2.5-.8 2.5-2s-1-2-2.5-2h-4v4z" fill="#FFFFFF" />
    <path d="M24 24l7 8h-6l-5-8h4z" fill="#FFFFFF" />
    <text x="24" y="42" fill="#FFFFFF" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">RVT</text>
  </svg>
);

// Telegram Icon
export const TelegramIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="11" fill="#2AABEE" />
    <path d="M17.5 6.5l-12 5 3.5 1.5 1.5 4 2-2 3.5 2.5 2-11.5z" fill="#FFFFFF" />
  </svg>
);

// Reddit Icon
export const RedditIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="11" fill="#FF4500" />
    <circle cx="9" cy="12" r="1.5" fill="#FFFFFF" />
    <circle cx="15" cy="12" r="1.5" fill="#FFFFFF" />
    <path d="M9 15c1 1 5 1 6 0" stroke="#FFFFFF" strokeWidth="1.2" fill="none" strokeLinecap="round" />
  </svg>
);

// X (Twitter) Icon
export const XIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <rect width="24" height="24" fill="#000000" />
    <path d="M5 4l6 7.5L5 20h2.5l4.5-5.5L16.5 20H19l-6.5-8L18.5 4H16l-4.5 5.5L7.5 4H5z" fill="#FFFFFF" />
  </svg>
);

// Instagram Icon
export const InstagramIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <rect width="24" height="24" fill="#E1306C" />
    <rect x="4" y="4" width="16" height="16" rx="4" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
    <circle cx="12" cy="12" r="4" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
    <circle cx="16.5" cy="7.5" r="1" fill="#FFFFFF" />
  </svg>
);

// Pinterest Icon
export const PinterestIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="11" fill="#BD081C" />
    <path d="M12 5c-3.8 0-7 2.8-7 6.3 0 2.4 1.3 4.5 3.3 5.4 0-.4 0-.9-.1-1.4l.7-3c-.2-.5-.3-1.1-.3-1.7 0-1.6 1-2.8 2.2-2.8 1 0 1.5.8 1.5 1.7 0 1-.7 2.6-1.1 4-.3 1.2.6 2.2 1.8 2.2 2.2 0 3.7-2.8 3.7-6.2 0-2.6-1.8-4.5-4.7-4.5z" fill="#FFFFFF" />
  </svg>
);
