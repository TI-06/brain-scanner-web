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
    setTimeout(() => {
      let hash = 0;
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
      }
      const absHash = Math.abs(hash);
      const set = WORD_SETS[mode];
      const selected = [...set]
        .sort((a, b) => (absHash % (set.indexOf(a) + 1)) - (absHash % (set.indexOf(b) + 1)))
        .slice(0, 8); // 8個に増やして密度アップ
      
      setResult(selected);
      setIsScanning(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 bg-[#020617] text-white font-sans">
      {/* 背景の光 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-900/20 blur-[120px] rounded-full" />
      </div>

      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div key="input" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md space-y-8 bg-white/5 p-10 rounded-[2.5rem] border border-white/10 backdrop-blur-xl shadow-2xl">
            <h1 className="text-5xl font-black text-center italic tracking-tighter bg-gradient-to-br from-cyan-300 to-purple-500 bg-clip-text text-transparent">脳内 2026</h1>
            
            <div className="space-y-4">
              <input 
                className="w-full bg-white/10 border border-white/20 p-5 rounded-2xl text-xl outline-none focus:ring-2 ring-cyan-400 transition-all text-center" 
                placeholder="名前を入力..." 
                onChange={(e) => setName(e.target.value)} 
              />
              
              <div className="grid grid-cols-1 gap-3">
                {(Object.keys(WORD_SETS) as Array<keyof typeof WORD_SETS>).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`p-4 rounded-2xl border-2 font-bold transition-all flex justify-between items-center ${
                      mode === m ? 'border-cyan-400 bg-cyan-400/20 text-cyan-50' : 'border-white/5 bg-white/5 text-white/40 hover:bg-white/10'
                    }`}
                  >
                    <span>{MODE_LABELS[m]}</span>
                    {mode === m && <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" />}
                  </button>
                ))}
              </div>

              <button 
                onClick={generateResult} 
                disabled={!name || isScanning}
                className="w-full py-5 bg-white text-black rounded-2xl font-black text-xl hover:bg-cyan-400 active:scale-95 transition-all shadow-xl shadow-white/5"
              >
                {isScanning ? "SCANNING..." : "SCAN START"}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-8">
            <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px] flex items-center justify-center">
              {/* 脳内メーカー風の散乱配置 */}
              <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl" />
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="text-sm font-bold text-cyan-400 absolute top-0 uppercase tracking-[0.5em] w-full">Brain Scan Result: {name}</div>
                
                {/* 脳内単語のランダム配置（ここがミソ） */}
                {result.map((word, i) => {
                  const pos = [
                    "top-[40%] left-[40%] text-5xl font-black",
                    "top-[20%] left-[25%] text-2xl opacity-60",
                    "top-[65%] left-[30%] text-3xl opacity-80",
                    "top-[30%] right-[20%] text-2xl opacity-50",
                    "bottom-[20%] right-[30%] text-4xl opacity-90",
                    "top-[15%] right-[40%] text-xl opacity-40",
                    "bottom-[40%] left-[15%] text-2xl opacity-70",
                    "bottom-[15%] left-[45%] text-xl opacity-50"
                  ];
                  return (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className={`absolute ${pos[i]} italic pointer-events-none whitespace-nowrap`}
                    >
                      {word}
                    </motion.div>
                  );
                })}
              </div>
            </div>
            
            <button onClick={() => setResult(null)} className="px-10 py-3 rounded-full border border-white/20 text-white/40 hover:text-white transition-all text-sm font-bold tracking-widest">RE-SCAN</button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}