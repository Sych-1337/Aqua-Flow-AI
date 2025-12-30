
import React from 'react';
import { Plus, Trash2, Droplets } from 'lucide-react';
import WaterWave from '../components/WaterWave';
import { WaterLog, UserProfile } from '../types';

interface DashboardProps {
  total: number;
  goal: number;
  onAdd: (amount: number) => void;
  logs: WaterLog[];
  onRemove: (id: string) => void;
  profile: UserProfile;
}

const Dashboard: React.FC<DashboardProps> = ({ total, goal, onAdd, logs, onRemove, profile }) => {
  const quickActions = [
    { amount: 150, label: 'Cup' },
    { amount: 250, label: 'Glass' },
    { amount: 500, label: 'Bottle' },
  ];

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col items-center justify-center space-y-4 pt-4">
        <WaterWave progress={total / goal} />
        <div className="text-center">
          <p className="text-3xl font-bold text-slate-800">{total} <span className="text-lg font-normal text-slate-400">/ {goal} ml</span></p>
          <p className="text-sm text-slate-500 mt-1">
            {total >= goal ? "Great job! Target reached 🎉" : `Remaining: ${Math.max(goal - total, 0)} ml`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {quickActions.map((action) => (
          <button
            key={action.amount}
            onClick={() => onAdd(action.amount)}
            className="flex flex-col items-center justify-center bg-white border border-slate-100 p-4 rounded-2xl shadow-sm active:scale-95 transition-transform group"
          >
            <Droplets className="text-blue-500 mb-1 group-hover:scale-110 transition-transform" size={24} />
            <span className="text-sm font-bold text-slate-800">{action.amount}ml</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-tighter">{action.label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Recent Logs</h3>
        {logs.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-dashed border-slate-200 text-center">
            <p className="text-slate-400 text-sm italic">No water logs for today yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {[...logs].reverse().slice(0, 5).map((log) => (
              <div key={log.id} className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <Droplets size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{log.amount} ml</p>
                    <p className="text-xs text-slate-400">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => onRemove(log.id)}
                  className="p-2 text-slate-300 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
