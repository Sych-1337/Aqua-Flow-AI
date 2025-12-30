
import React, { useState } from 'react';
import { Trophy, Medal, Star, Users, Flame } from 'lucide-react';
import { WaterLog } from '../types';

const CommunityScreen: React.FC<{ logs: WaterLog[], goal: number }> = ({ logs, goal }) => {
  const [tab, setTab] = useState<'leaderboard' | 'achievements'>('leaderboard');

  const achievements = [
    { title: "Ocean King", desc: "Reach your goal 5 days in a row", icon: "🌊", progress: 3, target: 5 },
    { title: "Early Bird", desc: "Drink water before 8:00 AM", icon: "🌅", progress: 1, target: 1 },
    { title: "Hydra Master", desc: "Total water: 10,000 ml", icon: "💎", progress: 4500, target: 10000 },
  ];

  const leaders = [
    { name: "Alex Hydro", score: "24.5k ml", level: 12, rank: 1, img: "https://i.pravatar.cc/150?u=1" },
    { name: "Sarah Water", score: "22.1k ml", level: 10, rank: 2, img: "https://i.pravatar.cc/150?u=2" },
    { name: "You", score: "18.2k ml", level: 8, rank: 3, img: "https://i.pravatar.cc/150?u=3" },
    { name: "Mike Dash", score: "15.0k ml", level: 7, rank: 4, img: "https://i.pravatar.cc/150?u=4" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
        <button 
          onClick={() => setTab('leaderboard')}
          className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${tab === 'leaderboard' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500'}`}
        >
          Leaderboard
        </button>
        <button 
          onClick={() => setTab('achievements')}
          className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${tab === 'achievements' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500'}`}
        >
          Achievements
        </button>
      </div>

      {tab === 'leaderboard' ? (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white text-center relative overflow-hidden">
            <Trophy className="absolute -right-4 -top-4 w-24 h-24 opacity-10" />
            <p className="text-xs font-bold uppercase tracking-widest mb-2">Weekly Rank</p>
            <h3 className="text-3xl font-bold">#3 Global</h3>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-xs">
                <Flame size={14} /> 12 Day Streak
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {leaders.map((leader) => (
              <div key={leader.rank} className="flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                <span className={`w-6 text-center font-bold ${leader.rank <= 3 ? 'text-blue-500' : 'text-slate-400'}`}>#{leader.rank}</span>
                <img src={leader.img} className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <p className="font-bold text-sm">{leader.name}</p>
                  <p className="text-[10px] text-slate-400 uppercase">Level {leader.level}</p>
                </div>
                <p className="font-bold text-blue-600 dark:text-blue-400">{leader.score}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {achievements.map((ach) => (
            <div key={ach.title} className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-100 dark:border-slate-700 flex gap-4">
              <div className="text-3xl">{ach.icon}</div>
              <div className="flex-1 space-y-2">
                <div>
                  <h4 className="font-bold text-sm">{ach.title}</h4>
                  <p className="text-xs text-slate-500">{ach.desc}</p>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all" 
                    style={{ width: `${(ach.progress/ach.target)*100}%` }}
                  />
                </div>
                <p className="text-[10px] text-right text-slate-400 font-bold">{ach.progress} / {ach.target}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default CommunityScreen;
