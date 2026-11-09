import React, { useState } from 'react';
import { 
  Folder, 
  FileText, 
  Image as ImageIcon, 
  Music, 
  HardDrive, 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight, 
  ArrowUp, 
  Search, 
  Plus, 
  Download,
  Trash2
} from 'lucide-react';

interface FileNode {
  id: string;
  name: string;
  type: 'folder' | 'file' | 'image' | 'audio';
  size?: string;
  modified: string;
  children?: FileNode[];
}

const INITIAL_FS: FileNode[] = [
  {
    id: 'internal',
    name: 'Internal Storage',
    type: 'folder',
    modified: 'Today',
    children: [
      {
        id: 'dcim',
        name: 'DCIM',
        type: 'folder',
        modified: 'Today, 2:15 PM',
        children: [
          { id: 'img1', name: 'IMG_20261108_01.jpg', type: 'image', size: '3.4 MB', modified: 'Today, 2:14 PM' },
          { id: 'img2', name: 'IMG_20261108_02.jpg', type: 'image', size: '4.1 MB', modified: 'Today, 2:15 PM' },
          { id: 'cam_folder', name: 'Camera', type: 'folder', modified: 'Yesterday', children: [] }
        ]
      },
      {
        id: 'downloads',
        name: 'Downloads',
        type: 'folder',
        modified: 'Yesterday',
        children: [
          { id: 'apk1', name: 'Win10Launcher_v1.0.apk', type: 'file', size: '18.2 MB', modified: 'Yesterday, 8:40 PM' },
          { id: 'doc1', name: 'Fluent_Design_Spec.pdf', type: 'file', size: '1.2 MB', modified: '3 days ago' }
        ]
      },
      {
        id: 'documents',
        name: 'Documents',
        type: 'folder',
        modified: 'Nov 5, 2026',
        children: [
          { id: 'notes', name: 'Launcher_Notes.txt', type: 'file', size: '14 KB', modified: 'Nov 5, 2026' },
          { id: 'todo', name: 'Android_Roadmap.md', type: 'file', size: '28 KB', modified: 'Nov 4, 2026' }
        ]
      },
      {
        id: 'pictures',
        name: 'Pictures',
        type: 'folder',
        modified: 'Nov 2, 2026',
        children: [
          { id: 'wall1', name: 'Windows10_Hero_4K.png', type: 'image', size: '6.8 MB', modified: 'Nov 2, 2026' }
        ]
      },
      {
        id: 'music',
        name: 'Music',
        type: 'folder',
        modified: 'Oct 28, 2026',
        children: [
          { id: 'audio1', name: 'Windows_Startup_Remix.mp3', type: 'audio', size: '5.6 MB', modified: 'Oct 28, 2026' }
        ]
      }
    ]
  }
];

export const FileExplorerApp: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string[]>(['Internal Storage']);
  const [history, setHistory] = useState<string[][]>([['Internal Storage']]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [fs, setFs] = useState<FileNode[]>(INITIAL_FS);
  const [newFolderName, setNewFolderName] = useState('');
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);

  // Helper to find folder by path
  const getCurrentFolder = (path: string[], nodes: FileNode[]): FileNode | null => {
    if (path.length === 0) return null;
    let current: FileNode | undefined = nodes.find(n => n.name === path[0]);
    for (let i = 1; i < path.length; i++) {
      if (!current || !current.children) return null;
      current = current.children.find(n => n.name === path[i]);
    }
    return current || null;
  };

  const currentFolder = getCurrentFolder(currentPath, fs);
  const items = currentFolder?.children || [];

  const filteredItems = searchQuery
    ? items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : items;

  const navigateTo = (folderName: string) => {
    const nextPath = [...currentPath, folderName];
    const newHist = history.slice(0, historyIndex + 1);
    newHist.push(nextPath);
    setHistory(newHist);
    setHistoryIndex(newHist.length - 1);
    setCurrentPath(nextPath);
    setSelectedFile(null);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setCurrentPath(prev);
      setSelectedFile(null);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setCurrentPath(next);
      setSelectedFile(null);
    }
  };

  const goUp = () => {
    if (currentPath.length > 1) {
      const upPath = currentPath.slice(0, -1);
      const newHist = history.slice(0, historyIndex + 1);
      newHist.push(upPath);
      setHistory(newHist);
      setHistoryIndex(newHist.length - 1);
      setCurrentPath(upPath);
      setSelectedFile(null);
    }
  };

  const createFolder = () => {
    if (!newFolderName.trim()) return;
    const newFolder: FileNode = {
      id: `folder-${Date.now()}`,
      name: newFolderName.trim(),
      type: 'folder',
      modified: 'Just now',
      children: []
    };

    const updateNodes = (nodes: FileNode[], path: string[]): FileNode[] => {
      return nodes.map(node => {
        if (node.name === path[0]) {
          if (path.length === 1) {
            return {
              ...node,
              children: [...(node.children || []), newFolder]
            };
          }
          return {
            ...node,
            children: updateNodes(node.children || [], path.slice(1))
          };
        }
        return node;
      });
    };

    setFs(updateNodes(fs, currentPath));
    setNewFolderName('');
    setShowNewFolderModal(false);
  };

  const deleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const removeNode = (nodes: FileNode[]): FileNode[] => {
      return nodes
        .filter(n => n.id !== id)
        .map(n => ({
          ...n,
          children: n.children ? removeNode(n.children) : undefined
        }));
    };
    setFs(removeNode(fs));
    if (selectedFile?.id === id) setSelectedFile(null);
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-white text-xs select-none">
      {/* Ribbon Bar */}
      <div className="flex items-center gap-1 p-2 bg-[#252525] border-b border-white/10">
        <button
          onClick={goBack}
          disabled={historyIndex === 0}
          className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ArrowLeft size={14} />
        </button>
        <button
          onClick={goForward}
          disabled={historyIndex === history.length - 1}
          className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ArrowRight size={14} />
        </button>
        <button
          onClick={goUp}
          disabled={currentPath.length <= 1}
          className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ArrowUp size={14} />
        </button>

        {/* Address Bar */}
        <div className="flex-1 flex items-center bg-[#181818] border border-white/10 rounded px-2.5 py-1 text-xs gap-1 text-white/80">
          <HardDrive size={13} className="text-[#0078d7]" />
          {currentPath.map((segment, idx) => (
            <React.Fragment key={idx}>
              <span className="hover:text-white cursor-pointer">{segment}</span>
              {idx < currentPath.length - 1 && <ChevronRight size={12} className="text-white/40" />}
            </React.Fragment>
          ))}
        </div>

        {/* Search Bar */}
        <div className="w-48 flex items-center bg-[#181818] border border-white/10 rounded px-2 py-1 gap-1.5">
          <Search size={13} className="text-white/50" />
          <input
            type="text"
            placeholder={`Search ${currentFolder?.name || 'Storage'}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-white text-xs w-full"
          />
        </div>

        <button
          onClick={() => setShowNewFolderModal(true)}
          className="flex items-center gap-1 px-2.5 py-1 bg-white/10 hover:bg-white/15 rounded text-white"
        >
          <Plus size={13} />
          <span>New folder</span>
        </button>
      </div>

      {/* Main Split Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Tree / Quick Access */}
        <div className="w-44 bg-[#1b1b1b] border-r border-white/10 p-2 overflow-y-auto space-y-1">
          <div className="text-[11px] font-semibold text-white/50 uppercase tracking-wider px-2 py-1">Quick access</div>
          {[
            { name: 'DCIM', path: ['Internal Storage', 'DCIM'], icon: ImageIcon },
            { name: 'Downloads', path: ['Internal Storage', 'Downloads'], icon: Download },
            { name: 'Documents', path: ['Internal Storage', 'Documents'], icon: FileText },
            { name: 'Music', path: ['Internal Storage', 'Music'], icon: Music },
            { name: 'Pictures', path: ['Internal Storage', 'Pictures'], icon: ImageIcon },
          ].map((fav, i) => {
            const Icon = fav.icon;
            const isCur = currentPath.join('/') === fav.path.join('/');
            return (
              <button
                key={i}
                onClick={() => {
                  setCurrentPath(fav.path);
                  setHistory([...history, fav.path]);
                  setHistoryIndex(history.length);
                }}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-left transition-colors ${
                  isCur ? 'bg-[#0078d7] text-white' : 'hover:bg-white/10 text-white/80'
                }`}
              >
                <Icon size={14} className={isCur ? 'text-white' : 'text-[#0078d7]'} />
                <span className="truncate">{fav.name}</span>
              </button>
            );
          })}
        </div>

        {/* Right Content Grid */}
        <div className="flex-1 p-3 overflow-y-auto">
          {filteredItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-white/40">
              <Folder size={40} className="mb-2 opacity-50" />
              <span>This folder is empty</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {filteredItems.map((item) => {
                const isSelected = selectedFile?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedFile(item)}
                    onDoubleClick={() => {
                      if (item.type === 'folder') navigateTo(item.name);
                    }}
                    className={`flex flex-col items-center p-3 rounded border text-center transition-all cursor-pointer relative group ${
                      isSelected
                        ? 'bg-[#0078d7]/20 border-[#0078d7]'
                        : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10'
                    }`}
                  >
                    {item.type === 'folder' ? (
                      <Folder size={36} className="text-amber-400 mb-2 fill-amber-400/20" />
                    ) : item.type === 'image' ? (
                      <ImageIcon size={36} className="text-cyan-400 mb-2" />
                    ) : item.type === 'audio' ? (
                      <Music size={36} className="text-purple-400 mb-2" />
                    ) : (
                      <FileText size={36} className="text-blue-400 mb-2" />
                    )}

                    <span className="text-xs text-white/90 font-medium truncate w-full">{item.name}</span>
                    <span className="text-[10px] text-white/50 mt-1">
                      {item.size || (item.children ? `${item.children.length} items` : '0 items')}
                    </span>

                    {/* Delete button on hover */}
                    <button
                      onClick={(e) => deleteItem(item.id, e)}
                      title="Delete"
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/20 text-red-400"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-[#252525] border-t border-white/10 text-[11px] text-white/60">
        <div>{items.length} items</div>
        <div>{selectedFile ? `${selectedFile.name} (${selectedFile.size || 'Folder'})` : 'No selection'}</div>
      </div>

      {/* New Folder Modal */}
      {showNewFolderModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="w-80 bg-[#252525] border border-white/15 rounded-lg p-4 shadow-2xl">
            <h3 className="font-semibold text-sm mb-3">Create New Folder</h3>
            <input
              type="text"
              placeholder="Folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              autoFocus
              className="w-full bg-[#181818] border border-white/20 rounded px-3 py-1.5 text-white text-xs mb-3 focus:border-[#0078d7] outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowNewFolderModal(false)}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/15 rounded text-white"
              >
                Cancel
              </button>
              <button
                onClick={createFolder}
                className="px-3 py-1.5 bg-[#0078d7] hover:bg-[#0063b1] rounded text-white font-medium"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
