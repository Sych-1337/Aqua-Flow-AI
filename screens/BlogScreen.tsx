
import React, { useState, useEffect } from 'react';
import { getSportsNews } from '../services/geminiService';
import { BookOpen, Calendar, ArrowRight, Loader2 } from 'lucide-react';

const BlogScreen: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const data = await getSportsNews();
      setPosts(data);
      setLoading(false);
    }
    fetch();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-full pt-20">
      <Loader2 className="animate-spin text-blue-500 mb-2" />
      <p className="text-slate-400 text-sm">Loading fitness insights...</p>
    </div>
  );

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      <div className="space-y-1">
        <h2 className="text-xl font-bold">Wellness Hub</h2>
        <p className="text-sm text-slate-400">Fresh news from Gemini AI</p>
      </div>

      <div className="space-y-4">
        {posts.map((post, i) => (
          <div key={i} className="group bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
            <div className="h-32 bg-blue-50 dark:bg-blue-900/20 p-6 flex flex-col justify-end">
               <span className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 mb-1">{post.category}</span>
               <h3 className="font-bold text-lg leading-tight">{post.title}</h3>
            </div>
            <div className="p-5 space-y-3">
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{post.summary}</p>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                  <Calendar size={12} /> {post.date}
                </div>
                <button className="text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read More <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BlogScreen;
