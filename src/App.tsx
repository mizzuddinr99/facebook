import { Routes, Route } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import LoginScreen from '@/screens/LoginScreen';
import HomeScreen from '@/screens/HomeScreen';
import WatchScreen from '@/screens/WatchScreen';
import MarketplaceScreen from '@/screens/MarketplaceScreen';
import NotificationsScreen from '@/screens/NotificationsScreen';
import MenuScreen from '@/screens/MenuScreen';
import BottomNav from '@/components/BottomNav';

function AppLayout() {
  return (
    <div className="h-full flex flex-col" style={{ background: 'var(--fb-bg-primary)' }}>
      <div className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/watch" element={<WatchScreen />} />
          <Route path="/marketplace" element={<MarketplaceScreen />} />
          <Route path="/notifications" element={<NotificationsScreen />} />
          <Route path="/menu" element={<MenuScreen />} />
        </Routes>
      </div>
      <BottomNav />
    </div>
  );
}

export default function App() {
  const isLoggedIn = useStore((s) => s.isLoggedIn);

  return (
    <div className="w-screen h-screen flex items-center justify-center p-0 lg:p-4" style={{ background: '#0A0A0A' }}>
      {/* Phone Frame - desktop only */}
      <div
        className="w-full h-full lg:w-[430px] lg:h-[850px] lg:rounded-[40px] overflow-hidden shadow-2xl relative"
        style={{
          background: 'var(--fb-bg-primary)',
          border: 'none',
          maxHeight: '100vh',
        }}
      >
        {/* Notch - desktop only */}
        <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-[60]" />

        {/* Content */}
        <div className="w-full h-full animate-fade-in">
          {isLoggedIn ? (
            <AppLayout />
          ) : (
            <Routes>
              <Route path="*" element={<LoginScreen />} />
            </Routes>
          )}
        </div>
      </div>
    </div>
  );
}
