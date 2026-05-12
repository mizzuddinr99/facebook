import { Plus } from 'lucide-react';
import { useStore } from '@/store/useStore';

interface StoryRingProps {
  storyId: string;
  avatar: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  isUser?: boolean;
}

export default function StoryRing({ storyId, avatar, name, size = 'md', showName = true, isUser = false }: StoryRingProps) {
  const markStoryViewed = useStore((s) => s.markStoryViewed);
  const story = useStore((s) => s.stories.find((st) => st.id === storyId));
  const viewed = story?.viewed ?? true;

  const sizeMap = {
    sm: { total: 48, avatar: 40, ring: 3 },
    md: { total: 64, avatar: 56, ring: 3 },
    lg: { total: 72, avatar: 64, ring: 3 },
  };

  const s = sizeMap[size];

  const handleClick = () => {
    if (!isUser && !viewed) {
      markStoryViewed(storyId);
    }
  };

  if (isUser) {
    return (
      <button onClick={handleClick} className="flex flex-col items-center gap-1 flex-shrink-0 select-none" style={{ width: s.total }}>
        <div className="relative" style={{ width: s.total, height: s.total }}>
          <div
            className="rounded-full overflow-hidden"
            style={{
              width: s.total,
              height: s.total,
              background: 'var(--fb-bg-tertiary)',
            }}
          >
            <img src={avatar} alt={name} className="w-full h-full object-cover" />
          </div>
          <div
            className="absolute bottom-0 right-0 rounded-full flex items-center justify-center border-2"
            style={{
              width: 20,
              height: 20,
              background: '#1877F2',
              borderColor: 'var(--fb-bg-secondary)',
            }}
          >
            <Plus size={12} className="text-white" strokeWidth={3} />
          </div>
        </div>
        {showName && (
          <span className="text-[11px] text-[#B0B3B8] truncate w-full text-center">{name}</span>
        )}
      </button>
    );
  }

  return (
    <button onClick={handleClick} className="flex flex-col items-center gap-1 flex-shrink-0 select-none" style={{ width: s.total }}>
      <div
        className="rounded-full p-[3px]"
        style={{
          width: s.total,
          height: s.total,
          background: viewed
            ? '#65676B'
            : 'linear-gradient(135deg, #1877F2 0%, #C32AA3 50%, #F46F30 100%)',
        }}
      >
        <div className="rounded-full overflow-hidden w-full h-full border-2" style={{ borderColor: 'var(--fb-bg-secondary)' }}>
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
        </div>
      </div>
      {showName && (
        <span className="text-[11px] text-[#B0B3B8] truncate w-full text-center">{name}</span>
      )}
    </button>
  );
}
