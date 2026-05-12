import { Search, MessageCircle } from 'lucide-react';

export default function TopHeader() {
  return (
    <header
      className="shrink-0 h-14 flex items-center justify-between px-4 z-50 sticky top-0"
      style={{
        background: 'rgba(24,25,26,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {/* Facebook Logo */}
      <div className="flex items-center">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="20" fill="#1877F2" />
          <path
            d="M26.5 20H21.5V32H17V20H13.5V16H17V13.5C17 10.5 18.8 8 22.5 8H26V12H23.5C22.5 12 21.5 12.3 21.5 13.5V16H26L26.5 20Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-3">
        <button className="w-9 h-9 rounded-full flex items-center justify-center active:opacity-70 transition-opacity" style={{ background: 'var(--fb-bg-tertiary)' }}>
          <Search size={20} className="text-[#E4E6EB]" />
        </button>
        <button className="relative w-9 h-9 rounded-full flex items-center justify-center active:opacity-70 transition-opacity" style={{ background: 'var(--fb-bg-tertiary)' }}>
          <MessageCircle size={20} className="text-[#E4E6EB]" fill="#E4E6EB" />
          <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] rounded-full bg-[#F02849] text-white text-[10px] font-bold flex items-center justify-center">
            3
          </span>
        </button>
      </div>
    </header>
  );
}
