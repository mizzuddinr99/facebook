import { Search, Settings, ThumbsUp, Gift, UserPlus, Radio, Clock } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '@/store/useStore';

const filters = ['All', 'Unread', 'My Posts', 'Mentions'];

function getActionIcon(type: string) {
  switch (type) {
    case 'like':
      return (
        <div className="w-7 h-7 rounded-full bg-[#1877F2] flex items-center justify-center flex-shrink-0">
          <ThumbsUp size={14} className="text-white" fill="white" />
        </div>
      );
    case 'gift':
      return (
        <div className="w-7 h-7 rounded-full bg-[#F02849] flex items-center justify-center flex-shrink-0">
          <Gift size={14} className="text-white" />
        </div>
      );
    case 'userPlus':
      return (
        <div className="w-7 h-7 rounded-full bg-[#45BD62] flex items-center justify-center flex-shrink-0">
          <UserPlus size={14} className="text-white" />
        </div>
      );
    case 'live':
      return (
        <div className="w-7 h-7 rounded-full bg-[#F02849] flex items-center justify-center flex-shrink-0">
          <Radio size={14} className="text-white" />
        </div>
      );
    default:
      return null;
  }
}

export default function NotificationsScreen() {
  const notifications = useStore((s) => s.notifications);
  const markNotificationRead = useStore((s) => s.markNotificationRead);
  const [activeFilter, setActiveFilter] = useState('All');

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
          <h1 className="text-2xl font-bold text-[#E4E6EB]">Notifications</h1>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full flex items-center justify-center active:bg-[#3A3B3C] transition-colors" style={{ background: 'var(--fb-bg-tertiary)' }}>
              <Search size={20} className="text-[#E4E6EB]" />
            </button>
            <button className="w-9 h-9 rounded-full flex items-center justify-center active:bg-[#3A3B3C] transition-colors" style={{ background: 'var(--fb-bg-tertiary)' }}>
              <Settings size={20} className="text-[#E4E6EB]" />
            </button>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                activeFilter === filter
                  ? 'text-white'
                  : 'text-[#B0B3B8] active:bg-[#3A3B3C]'
              }`}
              style={{
                background: activeFilter === filter ? '#1877F2' : 'var(--fb-bg-tertiary)',
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </header>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <h2 className="text-[17px] font-semibold text-[#E4E6EB] px-4 pt-3 pb-1">New</h2>
        {notifications.map((notif) => (
          <button
            key={notif.id}
            onClick={() => markNotificationRead(notif.id)}
            className="w-full flex items-start gap-3 px-4 py-3 text-left active:bg-[#3A3B3C] transition-colors relative"
            style={{
              background: notif.read ? 'transparent' : 'rgba(58,59,60,0.3)',
            }}
          >
            {/* Unread indicator */}
            {!notif.read && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-[#1877F2]" />
            )}

            {/* Avatar */}
            <div className="relative flex-shrink-0 self-start">
              {notif.userAvatar ? (
                <img src={notif.userAvatar} alt="" className="w-14 h-14 rounded-full object-cover" />
              ) : (
                <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'var(--fb-bg-tertiary)' }}>
                  <Clock size={24} className="text-[#B0B3B8]" />
                </div>
              )}
              {/* Action icon badge */}
              {notif.actionIcon && (
                <div className="absolute -bottom-1 -right-1">
                  {getActionIcon(notif.actionIcon)}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-[15px] leading-snug">
                {notif.userName && (
                  <span className="font-semibold text-[#E4E6EB]">{notif.userName} </span>
                )}
                <span className="text-[#B0B3B8]">{notif.message}</span>
              </p>
              <p className="text-[13px] text-[#1877F2] mt-0.5">{notif.time}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
