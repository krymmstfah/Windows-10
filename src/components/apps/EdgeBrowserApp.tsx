import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCw, 
  Home, 
  Search, 
  Lock, 
  Star, 
  ExternalLink,
  Globe
} from 'lucide-react';

export const EdgeBrowserApp: React.FC = () => {
  const [urlInput, setUrlInput] = useState('https://www.bing.com');
  const [currentUrl, setCurrentUrl] = useState('https://www.bing.com');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'bing' | 'android' | 'github' | 'news'>('bing');

  const bookmarks = [
    { title: 'Google Play Store', url: 'https://play.google.com', icon: '🛍️' },
    { title: 'Android Developers', url: 'https://developer.android.com', icon: '🤖' },
    { title: 'Microsoft Fluent UI', url: 'https://fluent2.microsoft.design', icon: '🎨' },
    { title: 'Bing Search', url: 'https://www.bing.com', icon: '🔍' },
    { title: 'GitHub', url: 'https://github.com', icon: '🐙' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    let target = urlInput.trim();
    if (!target.startsWith('http://') && !target.startsWith('https://')) {
      if (target.includes('.') && !target.includes(' ')) {
        target = 'https://' + target;
      } else {
        target = `https://www.bing.com/search?q=${encodeURIComponent(target)}`;
      }
    }
    setCurrentUrl(target);
    setUrlInput(target);
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-white text-xs select-none">
      {/* Tab Header */}
      <div className="flex items-center px-2 pt-1.5 bg-[#181818] border-b border-white/10 gap-1">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#252525] rounded-t border-t-2 border-[#0078d7] text-white max-w-xs">
          <Globe size={13} className="text-[#0078d7]" />
          <span className="truncate text-xs">Microsoft Edge - Web Browser</span>
        </div>
      </div>

      {/* Navigation Toolbar */}
      <div className="flex items-center gap-1.5 p-2 bg-[#252525] border-b border-white/10">
        <button 
          onClick={() => setCurrentUrl('https://www.bing.com')} 
          className="p-1.5 rounded hover:bg-white/10 text-white/80"
          title="Back"
        >
          <ArrowLeft size={14} />
        </button>
        <button className="p-1.5 rounded hover:bg-white/10 text-white/80 opacity-50" title="Forward">
          <ArrowRight size={14} />
        </button>
        <button 
          onClick={() => { const u = currentUrl; setCurrentUrl(''); setTimeout(() => setCurrentUrl(u), 100); }} 
          className="p-1.5 rounded hover:bg-white/10 text-white/80" 
          title="Refresh"
        >
          <RotateCw size={14} />
        </button>
        <button 
          onClick={() => { setCurrentUrl('https://www.bing.com'); setUrlInput('https://www.bing.com'); }} 
          className="p-1.5 rounded hover:bg-white/10 text-white/80" 
          title="Home"
        >
          <Home size={14} />
        </button>

        {/* Omnibox URL / Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 flex items-center bg-[#181818] border border-white/15 rounded-full px-3 py-1 gap-2 focus-within:border-[#0078d7]">
          <Lock size={12} className="text-emerald-400" />
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Search or enter web address"
            className="w-full bg-transparent border-none outline-none text-white text-xs"
          />
          <button type="submit" className="text-white/60 hover:text-white">
            <Search size={13} />
          </button>
        </form>

        <button className="p-1.5 rounded hover:bg-white/10 text-white/80" title="Favorite">
          <Star size={14} />
        </button>
      </div>

      {/* Bookmarks Bar */}
      <div className="flex items-center gap-3 px-3 py-1 bg-[#202020] border-b border-white/10 text-[11px] overflow-x-auto">
        {bookmarks.map((bm, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentUrl(bm.url);
              setUrlInput(bm.url);
            }}
            className="flex items-center gap-1.5 text-white/70 hover:text-white whitespace-nowrap"
          >
            <span>{bm.icon}</span>
            <span>{bm.title}</span>
          </button>
        ))}
      </div>

      {/* Browser Viewport */}
      <div className="flex-1 bg-[#121212] flex flex-col items-center justify-center p-6 text-center overflow-y-auto">
        <div className="max-w-md w-full bg-[#1e1e1e] border border-white/10 rounded-xl p-6 shadow-2xl">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-tr from-[#0078d7] to-[#00bcf2] flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            e
          </div>
          <h3 className="text-lg font-semibold mb-1 text-white">Microsoft Edge</h3>
          <p className="text-white/60 text-xs mb-4">Fast, secure browser for Windows 10 & Android</p>

          <form onSubmit={handleSearch} className="mb-4">
            <div className="flex items-center bg-[#2b2b2b] border border-white/20 rounded-lg px-3 py-2 gap-2 shadow-inner focus-within:border-[#0078d7]">
              <Search size={15} className="text-white/50" />
              <input
                type="text"
                placeholder="Search the web with Bing..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setUrlInput(e.target.value);
                }}
                className="w-full bg-transparent border-none outline-none text-white text-xs"
              />
            </div>
          </form>

          <div className="text-left space-y-2 pt-2 border-t border-white/10">
            <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider block">Trending on Bing</span>
            <div className="flex flex-wrap gap-1.5">
              {['Android 15 Launcher', 'Microsoft Fluent Design 2', 'Web Components', 'React 19 Hooks', 'Vite 8 Build'].map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setUrlInput(`https://www.bing.com/search?q=${encodeURIComponent(tag)}`);
                    setCurrentUrl(`https://www.bing.com/search?q=${encodeURIComponent(tag)}`);
                  }}
                  className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-white/80 text-[11px] transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
