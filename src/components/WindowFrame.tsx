import React, { useState, useRef, useEffect } from 'react';
import { Minus, Square, Copy, X } from 'lucide-react';
import { WindowItem } from '../types';
import { sounds } from '../services/soundEffects';

interface WindowFrameProps {
  window: WindowItem;
  isActive: boolean;
  onFocus: () => void;
  onMinimize: () => void;
  onMaximizeToggle: () => void;
  onClose: () => void;
  onUpdatePosition: (pos: { x: number; y: number }) => void;
  onUpdateSize: (size: { width: number; height: number }) => void;
  children: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  window: win,
  isActive,
  onFocus,
  onMinimize,
  onMaximizeToggle,
  onClose,
  onUpdatePosition,
  onUpdateSize,
  children
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; startX: number; startY: number }>({
    mouseX: 0,
    mouseY: 0,
    startX: 0,
    startY: 0
  });

  const [isResizing, setIsResizing] = useState(false);
  const resizeStartRef = useRef<{ mouseX: number; mouseY: number; startW: number; startH: number }>({
    mouseX: 0,
    mouseY: 0,
    startW: 0,
    startH: 0
  });

  // Handle Dragging
  const handleTitlePointerDown = (e: React.PointerEvent) => {
    if (win.isMaximized) return;
    onFocus();
    setIsDragging(true);
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startX: win.position.x,
      startY: win.position.y
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStartRef.current.mouseX;
      const deltaY = e.clientY - dragStartRef.current.mouseY;
      const newX = Math.max(0, Math.min(window.innerWidth - 100, dragStartRef.current.startX + deltaX));
      const newY = Math.max(0, Math.min(window.innerHeight - 100, dragStartRef.current.startY + deltaY));
      onUpdatePosition({ x: newX, y: newY });
    } else if (isResizing) {
      const deltaW = e.clientX - resizeStartRef.current.mouseX;
      const deltaH = e.clientY - resizeStartRef.current.mouseY;
      const newW = Math.max(320, resizeStartRef.current.startW + deltaW);
      const newH = Math.max(240, resizeStartRef.current.startH + deltaH);
      onUpdateSize({ width: newW, height: newH });
    }
  };

  const handlePointerUp = () => {
    if (isDragging) setIsDragging(false);
    if (isResizing) setIsResizing(false);
  };

  // Handle Resize Corner
  const handleResizePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    onFocus();
    setIsResizing(true);
    resizeStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startW: win.size.width,
      startH: win.size.height
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  if (!win.isOpen || win.isMinimized) {
    return null;
  }

  const style: React.CSSProperties = win.isMaximized
    ? {
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: 'calc(100vh - var(--taskbar-height))',
        zIndex: win.zIndex
      }
    : {
        position: 'fixed',
        left: `${win.position.x}px`,
        top: `${win.position.y}px`,
        width: `${win.size.width}px`,
        height: `${win.size.height}px`,
        zIndex: win.zIndex
      };

  return (
    <div
      style={style}
      onPointerDown={onFocus}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className={`flex flex-col bg-[#1e1e1e] rounded-none shadow-2xl overflow-hidden border transition-shadow duration-150 ${
        isActive
          ? 'border-[#0078d7] shadow-[0_12px_40px_rgba(0,0,0,0.65)]'
          : 'border-white/10 shadow-[0_6px_20px_rgba(0,0,0,0.45)]'
      }`}
    >
      {/* Titlebar */}
      <div
        onPointerDown={handleTitlePointerDown}
        onDoubleClick={onMaximizeToggle}
        className={`h-8 flex items-center justify-between px-2.5 select-none cursor-move transition-colors ${
          isActive ? 'bg-[#181818] text-white' : 'bg-[#222222] text-white/60'
        }`}
      >
        {/* App Title & Icon */}
        <div className="flex items-center gap-2 overflow-hidden pointer-events-none">
          <span className="text-sm shrink-0">{win.icon}</span>
          <span className="text-xs font-normal truncate">{win.title}</span>
        </div>

        {/* Windows Control Box Buttons */}
        <div className="flex items-center h-full -mr-2.5">
          {/* Minimize Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              sounds.playWindowSnap();
              onMinimize();
            }}
            className="w-11 h-full flex items-center justify-center hover:bg-white/10 active:bg-white/20 transition-colors text-white/80"
            title="Minimize"
          >
            <Minus size={13} />
          </button>

          {/* Maximize / Restore Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              sounds.playWindowSnap();
              onMaximizeToggle();
            }}
            className="w-11 h-full flex items-center justify-center hover:bg-white/10 active:bg-white/20 transition-colors text-white/80"
            title={win.isMaximized ? 'Restore Down' : 'Maximize'}
          >
            {win.isMaximized ? <Copy size={11} className="rotate-180" /> : <Square size={11} />}
          </button>

          {/* Close Button (Iconic Windows red hover) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              sounds.playDismiss();
              onClose();
            }}
            className="w-11 h-full flex items-center justify-center hover:bg-[#e81123] hover:text-white active:bg-[#f1707a] transition-colors text-white/80"
            title="Close"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* App Body Content */}
      <div className="flex-1 overflow-hidden relative">
        {children}
      </div>

      {/* Resize Handle (bottom-right) */}
      {!win.isMaximized && (
        <div
          onPointerDown={handleResizePointerDown}
          className="absolute bottom-0 right-0 w-3.5 h-3.5 cursor-nwse-resize z-20 flex items-center justify-center text-white/30 hover:text-white/80"
        >
          <div className="w-1.5 h-1.5 border-r border-b border-current" />
        </div>
      )}
    </div>
  );
};
