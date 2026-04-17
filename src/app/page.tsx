"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORD_SETS = {
  society: ["社畜", "虚無", "積読", "定時退社", "給料日", "猫になりたい", "会議中", "有給消化"],
  oshi: ["尊い", "供給", "現場", "全通", "概念", "祭壇", "遠征", "神席", "ファンサ", "爆死"],
  chaos: ["ストロングゼロ", "徳", "前世の記憶", "微熱", "インターネット", "終末", "猫", "宇宙"]
};

const MODE_LABELS = {
  society: "🏢 現代社会",
  oshi: "💖 推し活",
  chaos: "🌀 カオス"
};

export default function Brain2026() {
  const [name, setName] = useState("");
  const [mode, setMode] = useState<keyof typeof WORD_SETS>("society");
  const [result, setResult] = useState<string[] | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const generateResult = () => {
    if (!name) return;
    setIsScanning(true);
    
    // AIスキャンっぽさを出すためにわざと1.5秒待たせる
    setTimeout(() => {
      let hash = 0;
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
      }
      const absHash = Math.abs(hash);
      const set = WORD_SETS[mode];
      const selected = [...set]
        .sort((a, b) => (absHash % (set.indexOf(a) + 1)) - (absHash % (set.indexOf(b) + 1)))
        .slice(0, 5);
      
      setResult(selected);
      setIsScanning(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-[#020617]">
      {/* 背景のネオン装飾（これで画面を華やかにする） */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />

      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div 
            key="input"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="z-10 w-full max-w-md bg-white/5 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl text-center"
          >
            <h1 className="text-5xl font-black mb-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent italic tracking-tighter">
              脳内 2026
            </h1>
            <p className="text-white/40 text-[10px] mb-8 tracking-[0.3em] uppercase font-bold">Brain-Scanner Protocol v1.0.4</p>

            <div className="space-y-6">
              <div className="text-left">
                <label className="text-[10px] font-bold text-purple-300 mb-2 ml-1 uppercase tracking-widest">User Identity</label>
                <input
                  type="text"
                  placeholder="スキャンする名前..."
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:ring-2 ring-cyan-500/50 transition-all text-white placeholder:text-white/20 text-lg"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="text-left">
                <label className="text-[10px] font-bold text-purple-300 mb-2 ml-1 uppercase tracking-widest">Select Memory Sector</label>
                <div className="grid grid-cols-1 gap-3">
                  {(Object.keys(WORD_SETS) as Array<keyof typeof WORD_SETS>).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`py-4 px-6 rounded-2xl text-sm font-bold transition-all flex justify-between items-center border ${
                        mode === m 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-white/40 shadow-[0_0_20px_rgba(147,51,234,0.4)] scale-[1.02] text-white' 
                        : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      <span>{MODE_LABELS[m]}</span>
                      {mode === m && <motion.div layoutId="active" className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff]" />}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={generateResult}
                disabled={!name || isScanning}
                className="w-full py-5 bg-cyan-400 text-black rounded-2xl font-black text-lg hover:bg-white transition-all disabled:opacity-20 shadow-[0_0_30px_rgba(34,211,238,0.3)] active:scale-95"
              >
                {isScanning ? "SCANNING..." : "SCAN START"}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="result"
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="z-10 text-center w-full max-w-sm"
          >
            <div className="bg-white/10 backdrop-blur-3xl p-10 rounded-[3.5rem] border border-white/20 shadow-2xl relative">
              {/* スキャン演出用のサークル */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-cyan-500/10 rounded-full animate-ping" />
              
              <p className="text-[10px] text-cyan-400 font-bold tracking-[0.4em] mb-4 uppercase">Analysis Complete</p>
              <h2 className="text-2xl font-bold text-white mb-10 tracking-tight underline decoration-cyan-500 decoration-2 underline-offset-8">
                {name} の脳内
              </h2>
              
              <div className="flex flex-col gap-6 relative py-4">
                {result.map((word, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    className={`text-4xl font-black italic tracking-tighter ${
                      i === 0 ? 'text-white scale-110' : 'text-white/60'
                    }`}
                  >
                    {word}
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-12 pt-6 border-t border-white/10">
                <p className="text-[8px] text-white/30 tracking-[0.5em] uppercase font-mono italic">#Brain_2026 #NEO_SCANNER</p>
              </div>
            </div>

            <button 
              onClick={() => setResult(null)} 
              className="mt-10 px-10 py-3 bg-white/5 hover:bg-white/10 rounded-full text-[10px] font-bold tracking-widest text-white/40 hover:text-white transition-all border border-white/5"
            >
              TRY AGAIN
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}