
import React from 'react';

interface WaterWaveProps {
  progress: number; // 0 to 1
}

const WaterWave: React.FC<WaterWaveProps> = ({ progress }) => {
  const height = Math.min(Math.max(progress * 100, 0), 100);

  return (
    <div className="relative w-64 h-64 rounded-full border-8 border-white shadow-2xl overflow-hidden bg-slate-50">
      {/* Wave Container */}
      <div 
        className="absolute bottom-0 left-0 w-full bg-blue-500 transition-all duration-1000 ease-out"
        style={{ height: `${height}%` }}
      >
        <svg 
          className="absolute -top-6 left-0 w-[200%] h-8 fill-blue-500 wave" 
          viewBox="0 0 1000 100" 
          preserveAspectRatio="none"
        >
          <path d="M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 L1000,100 L0,100 Z" />
        </svg>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <span className={`text-4xl font-bold transition-colors ${height > 55 ? 'text-white' : 'text-blue-600'}`}>
          {Math.round(height)}%
        </span>
        <span className={`text-xs font-medium uppercase tracking-widest mt-1 ${height > 55 ? 'text-blue-100' : 'text-slate-400'}`}>
          Goal progress
        </span>
      </div>
    </div>
  );
};

export default WaterWave;
