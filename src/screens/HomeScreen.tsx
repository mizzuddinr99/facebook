import { useState, useEffect } from 'react';
import { Camera, Image, MapPin } from 'lucide-react';
import StoryRing from '@/components/StoryRing';
import PostCard from '@/components/PostCard';
import SkeletonPost from '@/components/SkeletonPost';
import TopHeader from '@/components/TopHeader';
import { useStore } from '@/store/useStore';

export default function HomeScreen() {
  const posts = useStore((s) => s.posts);
  const stories = useStore((s) => s.stories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <TopHeader />

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Stories Row */}
        <div
          className="flex gap-3 px-3 py-3 overflow-x-auto no-scrollbar"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {stories.map((story) => (
            <div key={story.id} style={{ scrollSnapAlign: 'start' }}>
              <StoryRing
                storyId={story.id}
                avatar={story.userAvatar}
                name={story.userName}
                size="lg"
                isUser={story.isUser}
              />
            </div>
          ))}
        </div>

        {/* Composer Bar */}
        <div
          className="flex items-center gap-3 px-4 py-3 mb-2"
          style={{ background: 'var(--fb-bg-secondary)' }}
        >
          <img
            src="/assets/avatar-alex.jpg"
            alt="Your avatar"
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
          <button
            className="flex-1 h-10 px-4 rounded-full text-left text-[15px] transition-colors active:scale-[0.98]"
            style={{
              background: 'var(--fb-bg-tertiary)',
              color: 'var(--fb-text-secondary)',
            }}
          >
            What's on your mind?
          </button>
          <button className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full active:bg-[#3A3B3C] transition-colors">
            <Image size={22} className="text-[#45BD62]" />
          </button>
        </div>

        {/* Quick Actions */}
        <div
          className="flex items-center justify-around px-4 pb-3 mb-2"
          style={{ background: 'var(--fb-bg-secondary)', borderBottom: '1px solid var(--fb-border)' }}
        >
          <button className="flex items-center gap-2 py-1.5 px-3 rounded-lg active:bg-[#3A3B3C] transition-colors">
            <Camera size={20} className="text-[#F02849]" />
            <span className="text-[13px] text-[#B0B3B8]">Live</span>
          </button>
          <button className="flex items-center gap-2 py-1.5 px-3 rounded-lg active:bg-[#3A3B3C] transition-colors">
            <Image size={20} className="text-[#45BD62]" />
            <span className="text-[13px] text-[#B0B3B8]">Photo</span>
          </button>
          <button className="flex items-center gap-2 py-1.5 px-3 rounded-lg active:bg-[#3A3B3C] transition-colors">
            <MapPin size={20} className="text-[#1877F2]" />
            <span className="text-[13px] text-[#B0B3B8]">Check in</span>
          </button>
        </div>

        {/* Posts Feed */}
        <div className="pb-2">
          {loading ? (
            <>
              <SkeletonPost />
              <SkeletonPost />
              <SkeletonPost />
            </>
          ) : (
            posts.map((post) => <PostCard key={post.id} postId={post.id} />)
          )}
        </div>
      </div>
    </div>
  );
}
