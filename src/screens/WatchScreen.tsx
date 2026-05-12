import { Play, Search } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '@/store/useStore';

const categories = ['For You', 'Live', 'Reels', 'Following', 'Saved'];

export default function WatchScreen() {
  const videos = useStore((s) => s.videos);
  const [activeCategory, setActiveCategory] = useState('For You');

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header
        className="shrink-0 px-4 pt-3 pb-2 z-50 sticky top-0"
        style={{
          background: 'rgba(24,25,26,0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-bold text-[#E4E6EB]">Watch</h1>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full flex items-center justify-center active:bg-[#3A3B3C] transition-colors" style={{ background: 'var(--fb-bg-tertiary)' }}>
              <Search size={20} className="text-[#E4E6EB]" />
            </button>
            <img src="/assets/avatar-alex.jpg" alt="Profile" className="w-9 h-9 rounded-full object-cover" />
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                activeCategory === cat
                  ? 'text-white'
                  : 'text-[#B0B3B8] active:bg-[#3A3B3C]'
              }`}
              style={{
                background: activeCategory === cat ? '#1877F2' : 'var(--fb-bg-tertiary)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Video Feed */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {videos.map((video) => (
          <div key={video.id} className="mb-1" style={{ background: 'var(--fb-bg-secondary)' }}>
            {/* Publisher info */}
            <div className="flex items-center gap-3 px-4 pt-3 pb-2">
              <img src={video.publisherAvatar} alt={video.publisher} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="text-[15px] font-semibold text-[#E4E6EB]">{video.publisher}</p>
                <p className="text-xs text-[#B0B3B8]">{video.time}</p>
              </div>
            </div>

            {/* Title */}
            <p className="px-4 pb-2 text-[15px] text-[#E4E6EB]">{video.title}</p>

            {/* Video thumbnail */}
            <div className="relative w-full">
              <img src={video.thumbnail} alt={video.title} className="w-full aspect-video object-cover" />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-black/50 flex items-center justify-center">
                  <Play size={28} className="text-white ml-1" fill="white" />
                </div>
              </div>
              {/* Duration badge */}
              <div className="absolute bottom-2 right-2 bg-black/70 px-1.5 py-0.5 rounded text-xs text-white font-medium">
                {video.duration}
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between px-4 py-2.5">
              <span className="text-[13px] text-[#B0B3B8]">{video.views}</span>
              <div className="flex items-center gap-4">
                <button className="text-[13px] text-[#B0B3B8] active:text-[#1877F2] transition-colors">Like</button>
                <button className="text-[13px] text-[#B0B3B8]">Comment</button>
                <button className="text-[13px] text-[#B0B3B8]">Share</button>
              </div>
            </div>

            {/* Divider */}
            <div className="h-2" style={{ background: 'var(--fb-bg-primary)' }} />
          </div>
        ))}
      </div>
    </div>
  );
}
