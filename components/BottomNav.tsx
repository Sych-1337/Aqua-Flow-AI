
import React from 'react';
import { Home, History, Users, BookOpen, User } from 'lucide-react';
import { Screen } from '../types';

interface BottomNavProps {
  activeScreen: Screen;
  setActiveScreen: (s: Screen) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, setActiveScreen }) => {
  const items = [
    { id: 'dashboard', icon: Home, label: 'Today' },
    { id: 'history', icon: History, label: 'Stats' },
    { id: 'community', icon: Users, label: 'Social' },
    { id: 'blog', icon: BookOpen, label: 'Blog' },
    { id: 'profile', icon: User, label: 'Me' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-t border-slate-100 dark:border-slate-700 px-4 py-3 flex justify-between items-center z-50">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeScreen === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveScreen(item.id as Screen)}
            className={`flex flex-col items-center gap-1 flex-1 transition-all ${
              isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'
            }`}
          >
            <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-blue-50 dark:bg-blue-900/30' : ''}`}>
              <Icon size={20} />
            </div>
            <span className="text-[9px] font-bold uppercase tracking-tighter">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
export default BottomNav;
