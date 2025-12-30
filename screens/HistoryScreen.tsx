
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { WaterLog } from '../types';

interface HistoryScreenProps {
  logs: WaterLog[];
  goal: number;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ logs, goal }) => {
  const chartData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    }).reverse();

    return last7Days.map(date => {
      const dayTotal = logs
        .filter(l => new Date(l.timestamp).toISOString().split('T')[0] === date)
        .reduce((sum, l) => sum + l.amount, 0);
      
      return {
        name: new Date(date).toLocaleDateString([], { weekday: 'short' }),
        total: dayTotal,
        fullDate: date
      };
    });
  }, [logs]);

  const averageIntake = Math.round(chartData.reduce((acc, curr) => acc + curr.total, 0) / 7);

  return (
    <div className="p-6 space-y-6 animate-in slide-in-from-right duration-500">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-slate-800">Your Activity</h2>
        <p className="text-sm text-slate-400">Weekly hydration summary</p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 500 }} 
                dy={10}
              />
              <YAxis hide />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="total" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.total >= goal ? '#3b82f6' : '#cbd5e1'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-between items-center pt-2">
          <div className="text-center">
            <p className="text-xs text-slate-400 font-medium uppercase">Average</p>
            <p className="text-lg font-bold text-slate-700">{averageIntake}ml</p>
          </div>
          <div className="h-8 w-px bg-slate-100"></div>
          <div className="text-center">
            <p className="text-xs text-slate-400 font-medium uppercase">Best Day</p>
            <p className="text-lg font-bold text-green-600">{Math.max(...chartData.map(d => d.total))}ml</p>
          </div>
          <div className="h-8 w-px bg-slate-100"></div>
          <div className="text-center">
            <p className="text-xs text-slate-400 font-medium uppercase">Target</p>
            <p className="text-lg font-bold text-blue-600">{goal}ml</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-6 rounded-3xl text-white shadow-lg shadow-blue-200">
        <h4 className="font-bold mb-1">Consistency is Key!</h4>
        <p className="text-sm text-blue-100 leading-relaxed">
          You've reached your goal {chartData.filter(d => d.total >= goal).length} times this week. 
          Keeping a steady intake improves concentration and skin health!
        </p>
      </div>
    </div>
  );
};

export default HistoryScreen;
