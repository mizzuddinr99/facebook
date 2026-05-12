import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Play, Store, Bell, Menu } from 'lucide-react';
import { useStore } from '@/store/useStore';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/watch', icon: Play, label: 'Watch' },
  { path: '/marketplace', icon: Store, label: 'Market' },
  { path: '/notifications', icon: Bell, label: 'Notifs' },
  { path: '/menu', icon: Menu, label: 'Menu' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const unreadNotifications = useStore((s) => s.notifications.filter((n) => !n.read).length);

  return (
    <nav
      className="shrink-0 h-[52px] flex items-center justify-around z-50"
      style={{
        background: 'var(--fb-bg-secondary)',
        borderTop: '1px solid var(--fb-border)',
      }}
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        const isMenu = item.path === '/menu';

        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="relative flex flex-col items-center justify-center w-full h-full active:scale-95 transition-transform duration-100 select-none"
          >
            {isMenu ? (
              <img
                src="/assets/avatar-alex.jpg"
                alt="Menu"
                className={`w-6 h-6 rounded-full object-cover ${isActive ? 'ring-2 ring-[#1877F2]' : ''}`}
              />
            ) : (
              <Icon
                size={24}
                strokeWidth={isActive ? 2.5 : 1.5}
                className={isActive ? 'text-[#1877F2]' : 'text-[#B0B3B8]'}
              />
            )}
            {isActive && !isMenu && (
              <span className="text-[10px] font-medium text-[#1877F2] mt-0.5">{item.label}</span>
            )}
            {item.path === '/notifications' && unreadNotifications > 0 && (
              <span className="absolute top-1 right-4 min-w-[18px] h-[18px] rounded-full bg-[#F02849] text-white text-[10px] font-bold flex items-center justify-center px-1">
                {unreadNotifications}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
