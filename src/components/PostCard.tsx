import { Globe, MoreHorizontal, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';
import { useStore } from '@/store/useStore';

interface PostCardProps {
  postId: string;
}

function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return n.toString();
}

export default function PostCard({ postId }: PostCardProps) {
  const post = useStore((s) => s.posts.find((p) => p.id === postId));
  const toggleLike = useStore((s) => s.toggleLike);

  if (!post) return null;

  return (
    <div
      className="mb-2"
      style={{ background: 'var(--fb-bg-secondary)', borderRadius: 8 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between px-4 pt-3 pb-2">
        <div className="flex items-center gap-3">
          <img src={post.userAvatar} alt={post.userName} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <p className="text-[15px] font-semibold text-[#E4E6EB] leading-tight">{post.userName}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-xs text-[#B0B3B8]">{post.time}</span>
              {post.privacy === 'public' && <Globe size={12} className="text-[#B0B3B8]" />}
            </div>
          </div>
        </div>
        <button className="w-8 h-8 flex items-center justify-center rounded-full active:bg-[#3A3B3C] transition-colors">
          <MoreHorizontal size={20} className="text-[#B0B3B8]" />
        </button>
      </div>

      {/* Text Content */}
      {post.text && (
        <p className="px-4 pb-3 text-[15px] text-[#E4E6EB] leading-relaxed">{post.text}</p>
      )}

      {/* Media */}
      {post.media && post.media.length > 0 && (
        <div className="w-full">
          {post.mediaType === 'grid' && post.media.length === 4 ? (
            <div className="grid grid-cols-2 gap-0.5">
              {post.media.map((src, i) => (
                <img key={i} src={src} alt="" className="w-full aspect-square object-cover" />
              ))}
            </div>
          ) : (
            <img src={post.media[0]} alt="" className="w-full object-cover max-h-[400px]" />
          )}
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-1">
          <div className="flex -space-x-1">
            <span className="w-5 h-5 rounded-full bg-[#1877F2] flex items-center justify-center text-[10px]">👍</span>
            <span className="w-5 h-5 rounded-full bg-[#F02849] flex items-center justify-center text-[10px]">❤️</span>
          </div>
          <span className="text-[13px] text-[#B0B3B8] ml-1">{formatNumber(post.reactions)}</span>
        </div>
        <div className="flex items-center gap-3">
          {post.comments > 0 && (
            <span className="text-[13px] text-[#B0B3B8]">{post.comments} comments</span>
          )}
          {post.shares > 0 && (
            <span className="text-[13px] text-[#B0B3B8]">{post.shares} shares</span>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 h-px bg-[#3E4042]" />

      {/* Action Bar */}
      <div className="flex items-center px-2 py-1">
        <button
          onClick={() => toggleLike(post.id)}
          className={`flex-1 flex items-center justify-center gap-2 h-9 rounded-lg active:bg-[#3A3B3C] transition-colors ${
            post.liked ? 'text-[#1877F2]' : 'text-[#B0B3B8]'
          }`}
        >
          <ThumbsUp size={18} strokeWidth={post.liked ? 2.5 : 1.5} />
          <span className="text-[13px] font-medium">Like</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 h-9 rounded-lg text-[#B0B3B8] active:bg-[#3A3B3C] transition-colors">
          <MessageCircle size={18} strokeWidth={1.5} />
          <span className="text-[13px] font-medium">Comment</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 h-9 rounded-lg text-[#B0B3B8] active:bg-[#3A3B3C] transition-colors">
          <Share2 size={18} strokeWidth={1.5} />
          <span className="text-[13px] font-medium">Share</span>
        </button>
      </div>
    </div>
  );
}
