
import React from 'react';
import { Settings, Weight, Zap, LogIn, LogOut, Moon, Sun } from 'lucide-react';
import { UserProfile } from '../types';
import { loginWithGoogle, logout } from '../services/firebase';
import { User } from 'firebase/auth';

interface ProfileScreenProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  user: User | null;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ profile, setProfile, user }) => {
  const handleChange = (field: keyof UserProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const toggleTheme = () => {
    const newTheme = profile.theme === 'light' ? 'dark' : 'light';
    handleChange('theme', newTheme);
  };

  return (
    <div className="p-6 space-y-6 animate-in slide-in-from-bottom duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Account Settings</h2>
        <button 
          onClick={toggleTheme}
          className="flex items-center gap-2 p-2 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all shadow-sm"
          aria-label="Toggle Theme"
        >
          {profile.theme === 'light' ? (
            <>
              <Moon size={18} className="text-indigo-600" />
              <span className="text-xs font-bold uppercase tracking-tight">Dark Mode</span>
            </>
          ) : (
            <>
              <Sun size={18} className="text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-tight">Light Mode</span>
            </>
          )}
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 flex flex-col items-center text-center space-y-4 border border-slate-100 dark:border-slate-700 shadow-sm">
        {user ? (
          <>
            <div className="relative">
              <img src={user.photoURL || ''} className="w-20 h-20 rounded-full border-4 border-blue-500/20" alt="Avatar" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white dark:border-slate-800 rounded-full"></div>
            </div>
            <div>
              <h3 className="font-bold text-lg">{user.displayName}</h3>
              <p className="text-xs text-slate-400 font-medium">{user.email}</p>
            </div>
            <button 
              onClick={logout} 
              className="mt-2 px-6 py-2 rounded-xl border border-red-100 dark:border-red-900/30 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-2 transition-colors"
            >
              <LogOut size={14} /> Sign Out
            </button>
          </>
        ) : (
          <>
            <div className="w-20 h-20 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-300">
              <Settings size={40} />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold">Welcome, Guest</h3>
              <p className="text-xs text-slate-400">Sign in to save your water progress in the cloud.</p>
            </div>
            <button 
              onClick={loginWithGoogle} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all active:scale-95"
            >
              <LogIn size={16} /> Sign in with Google
            </button>
          </>
        )}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 space-y-6 shadow-sm">
        <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-50 dark:border-slate-700 pb-2">Physical Characteristics</h4>
        
        <div className="space-y-4">
          <label className="block space-y-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Display Name</span>
            <input 
              type="text" 
              value={profile.name} 
              onChange={e => handleChange('name', e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 px-4 py-3 rounded-xl text-sm outline-none border border-transparent focus:border-blue-500 dark:focus:border-blue-400 transition-all"
            />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="space-y-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1 uppercase tracking-wider">
                <Weight size={14} className="text-blue-500" /> Weight (kg)
              </span>
              <input 
                type="number" 
                value={profile.weight} 
                onChange={e => handleChange('weight', Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-900 px-4 py-3 rounded-xl text-sm outline-none border border-transparent focus:border-blue-500 dark:focus:border-blue-400 transition-all"
              />
            </label>
            <label className="space-y-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1 uppercase tracking-wider">
                <Zap size={14} className="text-amber-500" /> Activity
              </span>
              <select 
                value={profile.activityLevel} 
                onChange={e => handleChange('activityLevel', e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 px-4 py-3 rounded-xl text-sm outline-none border border-transparent focus:border-blue-500 dark:focus:border-blue-400 transition-all appearance-none"
              >
                <option value="low">Low (Sedentary)</option>
                <option value="moderate">Medium (Regular)</option>
                <option value="high">High (Athlete)</option>
              </select>
            </label>
          </div>
        </div>
      </div>
      
      <div className="text-center pt-4 opacity-30">
        <p className="text-[10px] font-bold uppercase tracking-widest">Hydration Intelligence v1.2</p>
      </div>
    </div>
  );
};

export default ProfileScreen;
