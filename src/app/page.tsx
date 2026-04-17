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
    
    // 演出のために1.5秒待機
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
    <main className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-slate-950">
      {/* 背景の装飾 */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/30 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/30 blur-[120px] rounded-full animate-pulse" />

      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div 
            key="input"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="z-10 w-full max-w-md bg-white/10 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/20 shadow-2xl text-center"
          >
            <h1 className="text-5xl font-black mb-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent italic tracking-tighter">
              脳内 2026
            </h1>
            <p className="text-white/50 text-sm mb-8 tracking-widest uppercase">Brain Scan System v1.0</p>

            <div className="space-y-6">
              <div>
                <label className="block text-left text-xs font-bold text-purple-300 mb-2 ml-1 uppercase">User Name</label>
                <input
                  type="text"
                  placeholder="名前を入力してください"
                  value={name}
                  className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl outline-none focus:ring-2 ring-cyan-500/50 transition-all text-white placeholder:text-white/20 text-lg"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-left text-xs font-bold text-purple-300 mb-2 ml-1 uppercase">Select Mode</label>
                <div className="grid grid-cols-1 gap-3">
                  {(Object.keys(WORD_SETS) as Array<keyof typeof WORD_SETS>).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`py-4 px-6 rounded-2xl text-sm font-bold transition-all flex justify-between items-center border ${
                        mode === m 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-white/40 shadow-[0_0_20px_rgba(147,51,234,0.5)] scale-[1.02]' 
                        : 'bg-white/5 border-white/5 hover:bg-white/10'
                      }`}
                    >
                      <span>{MODE_LABELS[m]}</span>
                      {mode === m && <motion.span layoutId="dot" className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff]" />}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={generateResult}
                disabled={!name || isScanning}
                className="w-full py-5 bg-white text-black rounded-2xl font-black text-lg hover:bg-cyan-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_10px_30px_rgba(255,255,255,0.2)]"
              >
                {isScanning ? "スキャン中..." : "スキャン開始"}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="result"
            initial={{ scale: 0.5, opacity: 0, rotate: -5 }} 
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            className="z-10 text-center w-full max-w-sm"
          >
            <div className="bg-white/10 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/30 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
              {/* 装飾用のリング */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/5 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/10 rounded-full animate-ping" />
              
              <p className="text-xs text-cyan-400 font-bold tracking-[0.3em] mb-2 uppercase italic">Result Analyzed</p>
              <h2 className="text-2xl font-bold text-white mb-8">{name} の脳内</h2>
              
              <div className="flex flex-col gap-4 relative">
                {result.map((word, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    className={`text-3xl font-black italic tracking-tighter ${
                      i === 0 ? 'text-4xl text-white underline decoration-cyan-400 underline-offset-8' : 'text-white/70'
                    }`}
                  >
                    {word}
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-12 pt-6 border-t border-white/10">
                <p className="text-[10px] text-white/30 tracking-widest uppercase">#脳内2026 #NEO_BRAIN_SCANNER</p>
              </div>
            </div>

            <button 
              onClick={() => setResult(null)} 
              className="mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 rounded-full text-xs font-bold tracking-widest transition-all border border-white/10"
            >
              RE-SCAN
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}