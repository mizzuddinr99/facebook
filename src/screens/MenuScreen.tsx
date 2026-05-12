import { useState } from 'react';
import {
  Search,
  Settings,
  ChevronRight,
  ChevronDown,
  BookOpen,
  Play,
  Users,
  Store,
  Calendar,
  Clock,
  HelpCircle,
  Moon,
  Globe,
  LogOut,
} from 'lucide-react';
import { useStore } from '@/store/useStore';

const shortcuts = [
  { icon: BookOpen, label: 'Feeds', color: '#1877F2' },
  { icon: Play, label: 'Reels', color: '#F02849' },
  { icon: Users, label: 'Groups', color: '#45BD62' },
  { icon: Store, label: 'Marketplace', color: '#1877F2' },
  { icon: Calendar, label: 'Events', color: '#F5533D' },
  { icon: Clock, label: 'Memories', color: '#1877F2' },
];

const alsoFromMeta = [
  { name: 'Instagram', color: '#E4405F' },
  { name: 'Messenger', color: '#1877F2' },
  { name: 'WhatsApp', color: '#25D366' },
];

export default function MenuScreen() {
  const logout = useStore((s) => s.logout);
  const [expandedHelp, setExpandedHelp] = useState(false);
  const [expandedSettings, setExpandedSettings] = useState(false);

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
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#E4E6EB]">Menu</h1>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full flex items-center justify-center active:bg-[#3A3B3C] transition-colors" style={{ background: 'var(--fb-bg-tertiary)' }}>
              <Search size={20} className="text-[#E4E6EB]" />
            </button>
            <button className="w-9 h-9 rounded-full flex items-center justify-center active:bg-[#3A3B3C] transition-colors" style={{ background: 'var(--fb-bg-tertiary)' }}>
              <Settings size={20} className="text-[#E4E6EB]" />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-3 pb-4">
        {/* Profile Card */}
        <div
          className="mt-3 p-3 rounded-lg"
          style={{ background: 'var(--fb-bg-secondary)' }}
        >
          <button className="w-full flex items-center gap-3 text-left active:opacity-80 transition-opacity">
            <img src="/assets/avatar-alex.jpg" alt="Alex Johnson" className="w-11 h-11 rounded-full object-cover" />
            <div className="flex-1">
              <p className="text-[17px] font-semibold text-[#E4E6EB]">Alex Johnson</p>
              <p className="text-[13px] text-[#B0B3B8]">See your profile</p>
            </div>
            <ChevronRight size={20} className="text-[#B0B3B8]" />
          </button>
        </div>

        {/* Create Story */}
        <button
          className="w-full mt-2 p-3 rounded-lg flex items-center gap-3 text-left active:bg-[#3A3B3C] transition-colors"
          style={{ background: 'var(--fb-bg-secondary)' }}
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--fb-bg-tertiary)' }}>
            <div className="w-6 h-6 rounded-full border-2 border-dashed border-[#1877F2] flex items-center justify-center">
              <span className="text-[#1877F2] text-sm font-bold">+</span>
            </div>
          </div>
          <span className="text-[15px] font-medium text-[#E4E6EB]">Create Story</span>
        </button>

        {/* Shortcuts Grid */}
        <div className="mt-3 rounded-lg overflow-hidden" style={{ background: 'var(--fb-bg-secondary)' }}>
          <div className="grid grid-cols-2 gap-px" style={{ background: 'var(--fb-border)' }}>
            {shortcuts.map((shortcut) => {
              const Icon = shortcut.icon;
              return (
                <button
                  key={shortcut.label}
                  className="flex flex-col items-center justify-center gap-2 p-4 active:bg-[#3A3B3C] transition-colors"
                  style={{ background: 'var(--fb-bg-secondary)' }}
                >
                  <Icon size={28} style={{ color: shortcut.color }} />
                  <span className="text-[13px] text-[#E4E6EB]">{shortcut.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* See more */}
        <button className="w-full mt-2 p-3 rounded-lg flex items-center justify-center gap-1 active:bg-[#3A3B3C] transition-colors" style={{ background: 'var(--fb-bg-secondary)' }}>
          <ChevronDown size={18} className="text-[#B0B3B8]" />
          <span className="text-[15px] text-[#B0B3B8]">See more</span>
        </button>

        {/* Help & Support */}
        <button
          onClick={() => setExpandedHelp(!expandedHelp)}
          className="w-full mt-3 p-3 rounded-lg flex items-center gap-3 active:bg-[#3A3B3C] transition-colors"
          style={{ background: 'var(--fb-bg-secondary)' }}
        >
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'var(--fb-bg-tertiary)' }}>
            <HelpCircle size={20} className="text-[#B0B3B8]" />
          </div>
          <span className="flex-1 text-left text-[15px] text-[#E4E6EB]">Help & Support</span>
          <ChevronDown
            size={20}
            className={`text-[#B0B3B8] transition-transform ${expandedHelp ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedHelp && (
          <div className="px-3 py-2">
            <button className="w-full flex items-center gap-3 py-2.5 px-3 rounded-lg active:bg-[#3A3B3C] transition-colors">
              <span className="text-[15px] text-[#B0B3B8]">Help Center</span>
            </button>
            <button className="w-full flex items-center gap-3 py-2.5 px-3 rounded-lg active:bg-[#3A3B3C] transition-colors">
              <span className="text-[15px] text-[#B0B3B8]">Report a Problem</span>
            </button>
          </div>
        )}

        {/* Settings & Privacy */}
        <button
          onClick={() => setExpandedSettings(!expandedSettings)}
          className="w-full mt-2 p-3 rounded-lg flex items-center gap-3 active:bg-[#3A3B3C] transition-colors"
          style={{ background: 'var(--fb-bg-secondary)' }}
        >
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'var(--fb-bg-tertiary)' }}>
            <Settings size={20} className="text-[#B0B3B8]" />
          </div>
          <span className="flex-1 text-left text-[15px] text-[#E4E6EB]">Settings & Privacy</span>
          <ChevronDown
            size={20}
            className={`text-[#B0B3B8] transition-transform ${expandedSettings ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSettings && (
          <div className="px-3 py-2">
            <button className="w-full flex items-center gap-3 py-2.5 px-3 rounded-lg active:bg-[#3A3B3C] transition-colors">
              <Settings size={18} className="text-[#B0B3B8]" />
              <span className="text-[15px] text-[#B0B3B8]">Settings</span>
            </button>
            <button className="w-full flex items-center gap-3 py-2.5 px-3 rounded-lg active:bg-[#3A3B3C] transition-colors">
              <Moon size={18} className="text-[#B0B3B8]" />
              <span className="text-[15px] text-[#B0B3B8]">Dark Mode</span>
            </button>
            <button className="w-full flex items-center gap-3 py-2.5 px-3 rounded-lg active:bg-[#3A3B3C] transition-colors">
              <Globe size={18} className="text-[#B0B3B8]" />
              <span className="text-[15px] text-[#B0B3B8]">Language</span>
            </button>
          </div>
        )}

        {/* Also from Meta */}
        <div className="mt-3 rounded-lg overflow-hidden" style={{ background: 'var(--fb-bg-secondary)' }}>
          <p className="px-4 pt-3 pb-2 text-[13px] font-semibold text-[#B0B3B8] uppercase tracking-wide">Also from Meta</p>
          {alsoFromMeta.map((app) => (
            <button
              key={app.name}
              className="w-full flex items-center gap-3 px-4 py-3 text-left active:bg-[#3A3B3C] transition-colors"
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: app.color }}
              >
                <span className="text-white text-xs font-bold">{app.name[0]}</span>
              </div>
              <span className="text-[15px] text-[#E4E6EB]">{app.name}</span>
            </button>
          ))}
        </div>

        {/* Log Out */}
        <button
          onClick={logout}
          className="w-full mt-3 mb-6 p-3 rounded-lg flex items-center gap-3 active:bg-[#3A3B3C] transition-colors"
          style={{
            background: 'var(--fb-bg-secondary)',
            border: '1px solid var(--fb-border)',
          }}
        >
          <LogOut size={20} className="text-[#F02849]" />
          <span className="text-[15px] font-medium text-[#F02849]">Log Out</span>
        </button>
      </div>
    </div>
  );
}
