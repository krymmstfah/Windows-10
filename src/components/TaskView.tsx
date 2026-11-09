import React from 'react';
import { Plus, X, Monitor, Layers } from 'lucide-react';
import { WindowItem } from '../types';
import { sounds } from '../services/soundEffects';

interface TaskViewProps {
  isOpen: boolean;
  onClose: () => void;
  windows: WindowItem[];
  activeDesktop: number;
  onSelectDesktop: (id: number) => void;
  onAddDesktop: () => void;
  onFocusWindow: (id: string) => void;
  onCloseWindow: (id: string) => void;
}

export const TaskView: React.FC<TaskViewProps> = ({
  isOpen,
  onClose,
  windows,
  activeDesktop,
  onSelectDesktop,
  onAddDesktop,
  onFocusWindow,
  onCloseWindow
}) => {
  if (!isOpen) return null;

  const currentDesktopWindows = windows.filter((w) => w.desktopId === activeDesktop && w.isOpen);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bottom-[var(--taskbar-height)] bg-black/75 backdrop-blur-[20px] z-[997] flex flex-col p-6 select-none animate-in fade-in duration-150 text-white"
    >
      {/* Top Virtual Desktops Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-3 overflow-x-auto pb-4 border-b border-white/10"
      >
        <span className="text-xs font-semibold text-white/50 uppercase tracking-wider mr-2">Desktops:</span>

        {[1, 2].map((desktopNum) => (
          <button
            key={desktopNum}
            onClick={() => {
              sounds.playClick();
              onSelectDesktop(desktopNum);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-none border transition-all text-xs font-medium ${
              activeDesktop === desktopNum
                ? 'bg-[#0078d7] border-[#0078d7] text-white shadow-lg'
                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
            }`}
          >
            <Monitor size={14} />
            <span>Desktop {desktopNum}</span>
          </button>
        ))}

        <button
          onClick={() => {
            sounds.playClick();
            onAddDesktop();
          }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-none border border-dashed border-white/20 hover:border-white/40 text-white/70 hover:text-white text-xs transition-colors"
        >
          <Plus size={14} />
          <span>New desktop</span>
        </button>
      </div>

      {/* Windows Cards Grid */}
      <div className="flex-1 p-6 overflow-y-auto">
        {currentDesktopWindows.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-white/40">
            <Layers size={44} className="mb-3 opacity-30" />
            <div className="text-sm font-medium">No open windows on Desktop {activeDesktop}</div>
            <div className="text-xs mt-1">Open an app from Start or Taskbar to see it here</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {currentDesktopWindows.map((win) => (
              <div
                key={win.id}
                onClick={(e) => {
                  e.stopPropagation();
                  sounds.playClick();
                  onFocusWindow(win.id);
                  onClose();
                }}
                className="bg-[#252525] hover:bg-[#303030] border border-white/15 hover:border-[#0078d7] rounded-none overflow-hidden shadow-2xl transition-all cursor-pointer group flex flex-col h-48"
              >
                {/* Card Titlebar */}
                <div className="flex items-center justify-between px-3 py-2 bg-[#181818] border-b border-white/10">
                  <div className="flex items-center gap-2 text-xs font-medium truncate">
                    <span>{win.icon}</span>
                    <span className="truncate">{win.title}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sounds.playDismiss();
                      onCloseWindow(win.id);
                    }}
                    className="p-1 rounded hover:bg-red-500 hover:text-white text-white/60 transition-colors"
                  >
                    <X size={13} />
                  </button>
                </div>

                {/* Card Window Mock Preview */}
                <div className="flex-1 p-4 bg-gradient-to-br from-white/5 to-white/0 flex items-center justify-center text-center">
                  <div>
                    <span className="text-3xl block mb-1">{win.icon}</span>
                    <span className="text-xs text-white/70">{win.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
