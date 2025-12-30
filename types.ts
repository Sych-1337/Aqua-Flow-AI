
export interface UserProfile {
  name: string;
  weight: number;
  activityLevel: 'low' | 'moderate' | 'high';
  gender: 'male' | 'female' | 'other';
  wakeUpTime: string;
  bedTime: string;
  theme: 'light' | 'dark';
}

export interface WaterLog {
  id: string;
  amount: number;
  timestamp: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  goal: number;
}

export type Screen = 'dashboard' | 'history' | 'community' | 'blog' | 'profile';
