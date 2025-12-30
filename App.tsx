
import React, { useState, useEffect, useCallback } from 'react';
import { UserProfile, WaterLog, Screen } from './types';
import Dashboard from './screens/Dashboard';
import HistoryScreen from './screens/HistoryScreen';
import BlogScreen from './screens/BlogScreen';
import CommunityScreen from './screens/CommunityScreen';
import ProfileScreen from './screens/ProfileScreen';
import BottomNav from './components/BottomNav';
import { auth, db } from './services/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const DEFAULT_PROFILE: UserProfile = {
  name: 'Guest',
  weight: 70,
  activityLevel: 'moderate',
  gender: 'other',
  wakeUpTime: '08:00',
  bedTime: '23:00',
  theme: 'light'
};

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>('dashboard');
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [logs, setLogs] = useState<WaterLog[]>([]);

  // Sync with HTML class for Tailwind dark mode
  useEffect(() => {
    if (profile.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [profile.theme]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u) {
        const saved = localStorage.getItem('aqua_profile');
        if (saved) {
          const parsed = JSON.parse(saved);
          setProfile(prev => ({ ...prev, ...parsed }));
        }
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
        if (doc.exists() && doc.data().profile) {
          setProfile(doc.data().profile);
        }
      });
      const logsQuery = query(collection(db, "users", user.uid, "logs"), orderBy("timestamp", "asc"));
      const unsubLogs = onSnapshot(logsQuery, (snap) => {
        const l: WaterLog[] = [];
        snap.forEach(d => l.push(d.data() as WaterLog));
        setLogs(l);
      });
      return () => { unsub(); unsubLogs(); };
    }
  }, [user]);

  // Persistent save
  useEffect(() => {
    if (user) {
      setDoc(doc(db, "users", user.uid), { profile }, { merge: true });
    } else {
      localStorage.setItem('aqua_profile', JSON.stringify(profile));
    }
  }, [profile, user]);

  const currentGoal = profile.weight * 35 + (profile.activityLevel === 'high' ? 1000 : profile.activityLevel === 'moderate' ? 500 : 0);
  const todayTotal = logs.filter(l => l.timestamp >= new Date().setHours(0,0,0,0)).reduce((a,b) => a + b.amount, 0);

  const addWater = async (amt: number) => {
    const log = { id: Math.random().toString(36).substr(2,9), amount: amt, timestamp: Date.now() };
    if (user) {
      await setDoc(doc(db, "users", user.uid, "logs", log.id), log);
    } else {
      const newLogs = [...logs, log];
      setLogs(newLogs);
      localStorage.setItem('aqua_logs', JSON.stringify(newLogs));
    }
  };

  const renderScreen = () => {
    const commonProps = { profile, logs, goal: currentGoal, total: todayTotal };
    switch(activeScreen) {
      case 'dashboard': return <Dashboard {...commonProps} onAdd={addWater} onRemove={() => {}} />;
      case 'history': return <HistoryScreen logs={logs} goal={currentGoal} />;
      case 'community': return <CommunityScreen logs={logs} goal={currentGoal} />;
      case 'blog': return <BlogScreen />;
      case 'profile': return <ProfileScreen profile={profile} setProfile={setProfile} user={user} />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300 pb-20">
      <header className="p-6 pb-2 pt-8 flex justify-between items-center bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 sticky top-0 z-50">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">AquaFlow AI</h1>
          <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Personal Hydration Guide</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-slate-700 flex items-center justify-center border-2 border-white dark:border-slate-600 shadow-sm overflow-hidden">
          {user?.photoURL ? (
            <img src={user.photoURL} className="w-full h-full object-cover" />
          ) : (
            <span className="font-bold text-blue-600 dark:text-blue-400">{profile.name[0]?.toUpperCase()}</span>
          )}
        </div>
      </header>
      <main className="flex-1">{renderScreen()}</main>
      <BottomNav activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
    </div>
  );
};

export default App;
