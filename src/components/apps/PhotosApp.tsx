import React, { useState } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  Trash2, 
  Share2, 
  Image as ImageIcon 
} from 'lucide-react';

const SAMPLE_PHOTOS = [
  {
    id: 'p1',
    title: 'Windows 10 Hero Lighting',
    url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80',
    date: 'Nov 8, 2026',
    dimensions: '3840 x 2160'
  },
  {
    id: 'p2',
    title: 'Aurora Borealis Minimal',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    date: 'Nov 7, 2026',
    dimensions: '2560 x 1440'
  },
  {
    id: 'p3',
    title: 'Fluent Flow Architecture',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    date: 'Nov 5, 2026',
    dimensions: '4096 x 2304'
  },
  {
    id: 'p4',
    title: 'Neon Cyber Skyline',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    date: 'Nov 1, 2026',
    dimensions: '3000 x 2000'
  }
];

export const PhotosApp: React.FC = () => {
  const [photos, setPhotos] = useState(SAMPLE_PHOTOS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentPhoto = photos[currentIndex] || photos[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
    setZoom(1);
    setRotation(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    setZoom(1);
    setRotation(0);
  };

  const deleteCurrent = () => {
    if (photos.length <= 1) return;
    const next = photos.filter((_, idx) => idx !== currentIndex);
    setPhotos(next);
    setCurrentIndex(0);
  };

  return (
    <div className="flex flex-col h-full bg-[#181818] text-white select-none text-xs">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between p-2 bg-[#202020] border-b border-white/10">
        <div className="flex items-center gap-2">
          <ImageIcon size={15} className="text-[#0078d7]" />
          <span className="font-semibold text-white/90 truncate">{currentPhoto.title}</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoom((z) => Math.min(z + 0.25, 3))}
            className="p-1.5 rounded hover:bg-white/10 text-white/80"
            title="Zoom In"
          >
            <ZoomIn size={15} />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(z - 0.25, 0.5))}
            className="p-1.5 rounded hover:bg-white/10 text-white/80"
            title="Zoom Out"
          >
            <ZoomOut size={15} />
          </button>
          <button
            onClick={() => setRotation((r) => (r + 90) % 360)}
            className="p-1.5 rounded hover:bg-white/10 text-white/80"
            title="Rotate"
          >
            <RotateCw size={15} />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-1.5 rounded text-white/80 ${isPlaying ? 'bg-[#0078d7] text-white' : 'hover:bg-white/10'}`}
            title="Slideshow"
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} />}
          </button>
          <button
            onClick={deleteCurrent}
            className="p-1.5 rounded hover:bg-red-500/20 text-red-400"
            title="Delete Photo"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {/* Main Image Viewport */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-black/40">
        <img
          src={currentPhoto.url}
          alt={currentPhoto.title}
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
            transition: 'transform 0.2s ease-out'
          }}
          className="max-h-[85%] max-w-[85%] object-contain rounded shadow-2xl"
        />

        {/* Previous / Next Overlays */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur transition-all"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Bottom Filmstrip Thumbnails */}
      <div className="flex items-center gap-2 p-2 bg-[#202020] border-t border-white/10 overflow-x-auto justify-center">
        {photos.map((p, idx) => (
          <div
            key={p.id}
            onClick={() => {
              setCurrentIndex(idx);
              setZoom(1);
              setRotation(0);
            }}
            className={`cursor-pointer rounded overflow-hidden border-2 transition-all shrink-0 ${
              currentIndex === idx ? 'border-[#0078d7] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img src={p.url} alt={p.title} className="w-14 h-10 object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};
