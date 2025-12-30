
import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, Info, Activity, Sun } from 'lucide-react';
import { getHydrationAdvice } from '../services/geminiService';
import { UserProfile } from '../types';

interface DiscoveryScreenProps {
  profile: UserProfile;
  intake: number;
  goal: number;
}

interface Tip {
  title: string;
  description: string;
}

const DiscoveryScreen: React.FC<DiscoveryScreenProps> = ({ profile, intake, goal }) => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTips() {
      setLoading(true);
      const data = await getHydrationAdvice(profile, intake, goal);
      setTips(data);
      setLoading(false);
    }
    fetchTips();
  }, [profile, intake, goal]);

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          AI Insights <Sparkles size={18} className="text-amber-400" />
        </h2>
        <p className="text-sm text-slate-400">Personalized recommendations just for you</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="animate-spin text-blue-500" size={40} />
          <p className="text-slate-400 text-sm">Thinking of some great advice...</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {tips.map((tip, idx) => (
            <div key={idx} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                {idx === 0 ? <Activity size={24} /> : idx === 1 ? <Sun size={24} /> : <Info size={24} />}
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800">{tip.title}</h4>
                <p className="text-sm text-slate-500 leading-snug">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Wellness Activities</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-cyan-50 p-5 rounded-3xl border border-cyan-100 group hover:bg-cyan-100 transition-colors cursor-pointer">
            <span className="text-2xl mb-2 block">🧘‍♂️</span>
            <h5 className="font-bold text-cyan-800">Yoga Session</h5>
            <p className="text-xs text-cyan-600">Drink 250ml before</p>
          </div>
          <div className="bg-emerald-50 p-5 rounded-3xl border border-emerald-100 group hover:bg-emerald-100 transition-colors cursor-pointer">
            <span className="text-2xl mb-2 block">🏃‍♀️</span>
            <h5 className="font-bold text-emerald-800">Quick Jog</h5>
            <p className="text-xs text-emerald-600">Drink 500ml after</p>
          </div>
          <div className="bg-orange-50 p-5 rounded-3xl border border-orange-100 group hover:bg-orange-100 transition-colors cursor-pointer">
            <span className="text-2xl mb-2 block">🍎</span>
            <h5 className="font-bold text-orange-800">Healthy Snack</h5>
            <p className="text-xs text-orange-600">Water-rich fruits</p>
          </div>
          <div className="bg-purple-50 p-5 rounded-3xl border border-purple-100 group hover:bg-purple-100 transition-colors cursor-pointer">
            <span className="text-2xl mb-2 block">💤</span>
            <h5 className="font-bold text-purple-800">Deep Rest</h5>
            <p className="text-xs text-purple-600">Limit water before bed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoveryScreen;
