"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// モード別の単語データ
const WORD_SETS = {
  society: ["社畜", "虚無", "積読", "定時退社", "給料日", "猫になりたい", "会議中", "有給消化"],
  oshi: ["尊い", "供給", "現場", "全通", "概念", "祭壇", "遠征", "神席", "ファンサ", "爆死"],
  chaos: ["ストロングゼロ", "徳", "前世の記憶", "微熱", "インターネット", "終末", "猫", "宇宙"]
};

export default function Brain2026() {
  const [name, setName] = useState("");
  const [mode, setMode] = useState<keyof typeof WORD_SETS>("society");
  const [result, setResult] = useState<string[] | null>(null);

  // 名前からハッシュを生成してワードを固定抽出
  const generateResult = () => {
    if (!name) return;
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const absHash = Math.abs(hash);
    const set = WORD_SETS[mode];
    
    // ハッシュを使って5つ選ぶ
    const selected = [...set]
      .sort((a, b) => (absHash % (set.indexOf(a) + 1)) - (absHash % (set.indexOf(b) + 1)))
      .slice(0, 5);
    
    setResult(selected);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* 背景のネオン装飾 */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />

      {!result ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="z-10 w-full max-w-md bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            脳内 2026
          </h1>
          <input
            type="text"
            placeholder="名前を入力..."
            className="w-full bg-white/10 border border-white/20 p-4 rounded-xl mb-6 outline-none focus:ring-2 ring-purple-500 transition-all"
            onChange={(e) => setName(e.target.value)}
          />
          <div className="grid grid-cols-3 gap-2 mb-8">
            {(Object.keys(WORD_SETS) as Array<keyof typeof WORD_SETS>).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`py-2 px-1 rounded-lg text-xs font-bold transition-all ${mode === m ? 'bg-purple-600 shadow-lg shadow-purple-500/50' : 'bg-white/10'}`}
              >
                {m.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            onClick={generateResult}
            disabled={!name}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold hover:scale-105 active:scale-95 transition-transform disabled:opacity-50"
          >
            スキャン開始
          </button>
        </motion.div>
      ) : (
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative z-10 text-center">
          <div id="capture-area" className="bg-white/5 backdrop-blur-2xl p-12 rounded-[40px] border border-white/20 shadow-inner min-w-[320px]">
            <p className="text-sm text-purple-300 mb-2 uppercase tracking-widest font-bold">{name} の頭の中</p>
            <div className="relative w-64 h-64 mx-auto my-8 flex items-center justify-center">
              {/* 脳の代わりの円形ネオン */}
              <div className="absolute inset-0 border-2 border-white/10 rounded-full animate-pulse" />
              <div className="grid grid-cols-1 gap-4">
                {result.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-2xl font-black bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent italic"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </div>
            <p className="text-xs text-white/40 mt-4">#脳内2026 #NEOBRAIN</p>
          </div>
          <button onClick={() => setResult(null)} className="mt-8 text-white/50 hover:text-white transition-colors">もう一度試す</button>
        </motion.div>
      )}
    </main>
  );
}